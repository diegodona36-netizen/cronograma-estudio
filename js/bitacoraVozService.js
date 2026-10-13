/**
 * MIGATO • Módulo de Estudio Inteligente (SIGAEE • AXIOM)
 * Servicio de Bitácora de Conclusión de Bloque y Grabación de Voz (bitacoraVozService.js)
 * Permite registrar al finalizar cada clase:
 *  1. Qué aprendió hoy
 *  2. Qué le gustó / se le hizo fácil
 *  3. Qué se puede mejorar / dudas
 * Funciona localmente, con transcripción nativa Web Speech API y persistencia en localStorage.
 */

const STORAGE_KEY = 'axiom_bitacoras_estudio';

export class BitacoraVozService {
  constructor() {
    this.reconocedor = null;
    this.mediaRecorder = null;
    this.audioChunks = [];
    this.grabandoAudio = false;
    this.grabandoVoz = false;
  }

  // ==============================================================
  // 1. PERSISTENCIA Y CONSULTA LOCAL
  // ==============================================================

  obtenerTodas() {
    try {
      if (typeof localStorage === 'undefined') return {};
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      console.warn('Error leyendo bitácoras de localStorage:', e);
      return {};
    }
  }

  guardarTodas(datos) {
    try {
      if (typeof localStorage === 'undefined') return;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(datos));
    } catch (e) {
      console.warn('Error guardando bitácoras en localStorage:', e);
    }
  }

  generarClave(diaId, bloqueId) {
    return `${diaId}_${bloqueId}`;
  }

  obtenerPorBloque(diaId, bloqueId) {
    const todas = this.obtenerTodas();
    const clave = this.generarClave(diaId, bloqueId);
    return todas[clave] || null;
  }

  guardarBitacora(diaId, bloqueId, datos) {
    const todas = this.obtenerTodas();
    const clave = this.generarClave(diaId, bloqueId);

    const registro = {
      id: clave,
      diaId,
      bloqueId,
      materiaCodigo: datos.materiaCodigo || 'GENERAL',
      tema: datos.tema || 'Sesión de Estudio',
      horario: datos.horario || '',
      aprendido: (datos.aprendido || '').trim(),
      gusto: (datos.gusto || '').trim(),
      mejorar: (datos.mejorar || '').trim(),
      audioData: datos.audioData || null, // data URL o blob url
      audioDuracionSeg: datos.audioDuracionSeg || 0,
      fecha: datos.fecha || new Date().toISOString(),
      actualizadoEn: new Date().toISOString()
    };

    todas[clave] = registro;
    this.guardarTodas(todas);
    return registro;
  }

  eliminarBitacora(diaId, bloqueId) {
    const todas = this.obtenerTodas();
    const clave = this.generarClave(diaId, bloqueId);
    if (todas[clave]) {
      delete todas[clave];
      this.guardarTodas(todas);
      return true;
    }
    return false;
  }

  contarBitacoras() {
    const todas = this.obtenerTodas();
    return Object.keys(todas).length;
  }

  obtenerPorMateria(materiaCodigo) {
    const todas = this.obtenerTodas();
    return Object.values(todas).filter(b => b.materiaCodigo === materiaCodigo);
  }

  // ==============================================================
  // 2. GENERACIÓN DE REPORTES PARA EL ASISTENTE
  // ==============================================================

  generarResumenParaAsistente() {
    const todas = Object.values(this.obtenerTodas());
    if (todas.length === 0) {
      return {
        total: 0,
        textoMarkdown: 'No hay bitácoras de conclusión registradas aún.',
        areasDeMejora: []
      };
    }

    // Ordenar de más reciente a más antigua
    todas.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

    const areasDeMejora = todas
      .filter(b => Boolean(b.mejorar))
      .map(b => ({
        materia: b.materiaCodigo,
        tema: b.tema,
        fecha: b.fecha,
        horario: b.horario,
        puntoAMejorar: b.mejorar,
        queAprendio: b.aprendido
      }));

    let md = `## 🎙️ Resumen de Bitácoras de Estudio • Debriefs de Sesión\n\n`;
    md += `*Total de reflexiones registradas:* **${todas.length} sesiones**\n\n`;

    todas.forEach((b, idx) => {
      const fechaCorta = b.fecha ? b.fecha.slice(0, 10) : '';
      md += `### ${idx + 1}. [${b.materiaCodigo}] ${b.tema} (${b.diaId.toUpperCase()} ${b.horario})\n`;
      if (fechaCorta) md += `*Fecha:* ${fechaCorta}\n`;
      md += `- **¿Qué aprendí hoy?:** ${b.aprendido || '*(Sin especificar)*'}\n`;
      md += `- **¿Qué me gustó o se me facilitó?:** ${b.gusto || '*(Sin especificar)*'}\n`;
      md += `- **¿Qué debemos mejorar o dudas pendientes?:** ${b.mejorar || '*(Sin observaciones)*'}\n\n`;
    });

    return {
      total: todas.length,
      textoMarkdown: md,
      areasDeMejora
    };
  }

  // ==============================================================
  // 3. CONTROL DE RECONOCIMIENTO DE VOZ (WEB SPEECH API)
  // ==============================================================

  esSoportadoSpeechRecognition() {
    if (typeof window === 'undefined') return false;
    return Boolean(window.SpeechRecognition || window.webkitSpeechRecognition);
  }

  iniciarReconocimiento({ onResultado, onFinalizado, onError }) {
    if (!this.esSoportadoSpeechRecognition()) {
      if (onError) onError(new Error('El navegador no soporta SpeechRecognition nativo.'));
      return null;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    this.detenerReconocimiento();

    try {
      this.reconocedor = new SpeechRecognition();
      this.reconocedor.lang = 'es-VE';
      this.reconocedor.continuous = true;
      this.reconocedor.interimResults = true;
      this.grabandoVoz = true;

      this.reconocedor.onresult = (event) => {
        let textoFinal = '';
        let textoProvisional = '';

        for (let i = 0; i < event.results.length; i++) {
          const resultado = event.results[i];
          if (resultado.isFinal) {
            textoFinal += resultado[0].transcript + ' ';
          } else {
            textoProvisional += resultado[0].transcript;
          }
        }

        if (onResultado) {
          onResultado({
            textoFinal: textoFinal.trim(),
            textoProvisional: textoProvisional.trim(),
            completo: (textoFinal + ' ' + textoProvisional).trim()
          });
        }
      };

      this.reconocedor.onerror = (event) => {
        console.warn('SpeechRecognition error:', event.error);
        if (onError) onError(event);
      };

      this.reconocedor.onend = () => {
        this.grabandoVoz = false;
        if (onFinalizado) onFinalizado();
      };

      this.reconocedor.start();
      return this.reconocedor;
    } catch (e) {
      this.grabandoVoz = false;
      if (onError) onError(e);
      return null;
    }
  }

  detenerReconocimiento() {
    if (this.reconocedor) {
      try {
        this.reconocedor.stop();
      } catch {}
      this.reconocedor = null;
    }
    this.grabandoVoz = false;
  }

  // ==============================================================
  // 4. GRABACIÓN DE AUDIO NATIVO (MediaRecorder)
  // ==============================================================

  esSoportadoMediaRecorder() {
    if (typeof navigator === 'undefined' || !navigator.mediaDevices) return false;
    return Boolean(typeof window !== 'undefined' && window.MediaRecorder);
  }

  async iniciarGrabacionAudio({ onInicio, onError }) {
    if (!this.esSoportadoMediaRecorder()) {
      if (onError) onError(new Error('MediaRecorder no soportado'));
      return false;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.audioChunks = [];
      this.mediaRecorder = new MediaRecorder(stream);

      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          this.audioChunks.push(event.data);
        }
      };

      this.mediaRecorder.start();
      this.grabandoAudio = true;
      if (onInicio) onInicio();
      return true;
    } catch (err) {
      this.grabandoAudio = false;
      if (onError) onError(err);
      return false;
    }
  }

  detenerGrabacionAudio() {
    return new Promise((resolve) => {
      if (!this.mediaRecorder || this.mediaRecorder.state === 'inactive') {
        this.grabandoAudio = false;
        resolve(null);
        return;
      }

      this.mediaRecorder.onstop = () => {
        const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.onloadend = () => {
          this.grabandoAudio = false;
          resolve({
            blob: audioBlob,
            dataUrl: reader.result
          });
        };
        reader.readAsDataURL(audioBlob);

        // Detener tracks del stream
        try {
          this.mediaRecorder.stream.getTracks().forEach(t => t.stop());
        } catch {}
      };

      this.mediaRecorder.stop();
    });
  }
}

export const bitacoraVoz = new BitacoraVozService();
