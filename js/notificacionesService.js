/**
 * AXIOM • Servicio de Notificaciones y Alertas al Teléfono
 * Envío directo a Telegram Bot API (100% Gratis y Privado) + Web Notifications API
 */

export class NotificacionesService {
  constructor() {
    this.telegramToken = this.cargar('axiom_telegram_bot_token', '');
    this.telegramChatId = this.cargar('axiom_telegram_chat_id', '');
    this.alertasActivas = this.cargar('axiom_alertas_activas', 'true') === 'true';
    this.minutosAnticipacion = parseInt(this.cargar('axiom_minutos_anticipacion', '15'), 10) || 15;
    this.bloquesNotificadosHoy = new Set();
    this.intervalId = null;
  }

  cargar(clave, def) {
    try {
      if (typeof localStorage === 'undefined') return def;
      const v = localStorage.getItem(clave);
      return v !== null && v !== undefined && v !== '' ? v : def;
    } catch {
      return def;
    }
  }

  guardar(clave, v) {
    try {
      if (typeof localStorage === 'undefined') return;
      localStorage.setItem(clave, v);
    } catch (e) {
      console.warn('Error guardando en localStorage:', e);
    }
  }

  setTelegramConfig(token, chatId) {
    this.telegramToken = (token || '').trim();
    this.telegramChatId = (chatId || '').trim();
    this.guardar('axiom_telegram_bot_token', this.telegramToken);
    this.guardar('axiom_telegram_chat_id', this.telegramChatId);
  }

  setAlertasActivas(activas) {
    this.alertasActivas = Boolean(activas);
    this.guardar('axiom_alertas_activas', String(this.alertasActivas));
  }

  getTieneTelegramConfigurado() {
    return Boolean(this.telegramToken && this.telegramChatId);
  }

  /**
   * Envía un mensaje directo a Telegram
   */
  async enviarTelegram(mensajeTexto) {
    if (!this.getTieneTelegramConfigurado()) {
      return { ok: false, error: 'Telegram no configurado. Falta Bot Token o Chat ID.' };
    }

    const url = `https://api.telegram.org/bot${this.telegramToken}/sendMessage`;
    const payload = {
      chat_id: this.telegramChatId,
      text: mensajeTexto,
      parse_mode: 'HTML'
    };

    try {
      const resp = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await resp.json();
      if (!resp.ok || !data.ok) {
        throw new Error(data.description || `HTTP ${resp.status}`);
      }

      return { ok: true, data };
    } catch (err) {
      console.error('Error enviando a Telegram:', err);
      return { ok: false, error: err.message };
    }
  }

  /**
   * Notificación Web en el navegador
   */
  async enviarWebNotification(titulo, cuerpo) {
    if (!('Notification' in window)) return false;

    if (Notification.permission === 'granted') {
      new Notification(titulo, {
        body: cuerpo,
        icon: '../assets/logo-migato.png'
      });
      return true;
    } else if (Notification.permission !== 'denied') {
      const permiso = await Notification.requestPermission();
      if (permiso === 'granted') {
        new Notification(titulo, {
          body: cuerpo,
          icon: '../assets/logo-migato.png'
        });
        return true;
      }
    }
    return false;
  }

  /**
   * Despacha alerta multicanal (Telegram + Web Push)
   */
  async enviarAlerta({ titulo, mensaje, datosExtra = '' }) {
    if (!this.alertasActivas) return;

    // 1. Web Push
    this.enviarWebNotification(titulo, mensaje);

    // 2. Telegram al teléfono
    if (this.getTieneTelegramConfigurado()) {
      const textoTelegram = `<b>${titulo}</b>\n\n${mensaje}${datosExtra ? `\n\n<i>${datosExtra}</i>` : ''}`;
      return await this.enviarTelegram(textoTelegram);
    }
    return { ok: false, error: 'Telegram no configurado' };
  }

  /**
   * Prueba de conexión en tiempo real
   */
  async probarConexionTelegram() {
    const ahora = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const mensaje = `🔔 <b>¡Conexión Exitosa con AXIOM!</b>\n\nCompañero, tu bot de estudio personal está vinculado a tu celular.\nRecibirás alertas de inicio de sesiones y recordatorios de rebalanceo.\n\nHora del sistema: ${ahora}`;
    return await this.enviarTelegram(mensaje);
  }

  /**
   * Monitor continuo de recordatorios de bloques de estudio
   */
  iniciarMonitor(getItinerarioFn) {
    if (this.intervalId) clearInterval(this.intervalId);

    const mapeoDia = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];

    this.intervalId = setInterval(() => {
      if (!this.alertasActivas) return;

      const ahora = new Date();
      const diaSemanaStr = mapeoDia[ahora.getDay()];
      if (diaSemanaStr === 'domingo') return;

      const itinerario = getItinerarioFn();
      const bloquesHoy = (itinerario && itinerario[diaSemanaStr]) ? itinerario[diaSemanaStr] : [];

      const minutosActuales = (ahora.getHours() * 60) + ahora.getMinutes();

      bloquesHoy.forEach(b => {
        if (b.cancelado || b.completado) return;

        const [hIni, mIni] = b.inicio.split(':').map(Number);
        const minutosInicio = (hIni * 60) + mIni;

        const diff = minutosInicio - minutosActuales;

        // Si falta entre 1 y los minutos de anticipación configurados
        if (diff > 0 && diff <= this.minutosAnticipacion) {
          const keyNotif = `${diaSemanaStr}_${b.id}_${diff <= 5 ? 'inminente' : 'anticipo'}`;
          if (!this.bloquesNotificadosHoy.has(keyNotif)) {
            this.bloquesNotificadosHoy.add(keyNotif);

            this.enviarAlerta({
              titulo: `⏰ Próxima Sesión de Estudio (${diff} min)`,
              mensaje: `Tu bloque de <b>${b.tema || b.materiaCodigo}</b> inicia a las <b>${b.inicio}</b>.`,
              datosExtra: `Duración: ${b.duracion}h | Día: ${diaSemanaStr.toUpperCase()}`
            });
          }
        }
      });
    }, 30000); // Chequeo cada 30 segundos
  }

  detenerMonitor() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}

export const notificacionesService = new NotificacionesService();
