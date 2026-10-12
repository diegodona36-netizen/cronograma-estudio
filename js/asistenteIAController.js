/**
 * AXIOM • Controlador del Asistente de IA Agéntico (Sócrates & Chronos)
 * Orquestador de Diálogo, Function Calling, Generación de Disciplinas y Alertas al Celular
 */

import { llmProvider } from './llmProviderService.js';
import { notificacionesService } from './notificacionesService.js';
import { rebalancearItinerario, calcularMetricasSemanales } from './reschedulingEngine.js';
import {
  MATERIAS_CONFIG,
  GUIAS_CONOCIMIENTO_3_NIVELES,
  obtenerTodasLasMaterias,
  guardarMateriaPersonalizada,
  obtenerTodasLasGuias,
  guardarGuiaPersonalizada
} from './estudioData.js';

export class AsistenteIAController {
  constructor(appRef) {
    this.app = appRef;
    this.historialChat = this.cargarHistorialChat();
    this.escuchandoVoz = false;
    this.recognition = null;

    this.initSpeechRecognition();
  }

  cargarHistorialChat() {
    try {
      const data = localStorage.getItem('axiom_asistente_chat_history');
      if (data) return JSON.parse(data);
    } catch {}
    return [
      {
        role: 'assistant',
        content: 'Hola, Compañero. Soy tu Asistente Agéntico de Estudio (Sócrates & Chronos). Puedo reestructurar tu horario si se va la luz o surge un imprevisto, investigar materias nuevas como Oratoria, agregar sesiones o enviarte alertas a tu teléfono. ¿En qué trabajamos hoy?'
      }
    ];
  }

  guardarHistorialChat() {
    try {
      // Guardar últimas 25 interacciones
      const recortado = this.historialChat.slice(-25);
      localStorage.setItem('axiom_asistente_chat_history', JSON.stringify(recortado));
    } catch (e) {
      console.warn('Error guardando historial de chat:', e);
    }
  }

  limpiarHistorialChat() {
    this.historialChat = [
      {
        role: 'assistant',
        content: 'Historial reiniciado. ¿Qué tema o ajuste de horario deseas coordinar, Compañero?'
      }
    ];
    this.guardarHistorialChat();
    this.renderChat();
  }

  getHerramientasDisponibles() {
    return [
      {
        name: 'reestructurar_horario',
        description: 'Reorganiza el horario semanal ante un corte de luz o imprevisto, recalculando horas perdidas y redistribuyéndolas en los días posteriores o amortizándolas en el mes.',
        parameters: {
          type: 'object',
          properties: {
            dia: {
              type: 'string',
              enum: ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'],
              description: 'Día de la semana en que ocurrió la interrupción (ej. lunes)'
            },
            hora_inicio: {
              type: 'string',
              description: 'Hora de inicio de la interrupción en formato 24h HH:MM (ej. 14:00)'
            },
            hora_fin: {
              type: 'string',
              description: 'Hora de fin en formato 24h HH:MM (ej. 18:00)'
            },
            motivo: {
              type: 'string',
              description: 'Causa del evento (ej. Corte de Luz SEN, Salida imprevista)'
            }
          },
          required: ['dia', 'hora_inicio', 'hora_fin']
        }
      },
      {
        name: 'investigar_y_crear_materia',
        description: 'Investiga una nueva disciplina de estudio (ej. Oratoria, Finanzas) bajo la metodología de primeros principios (3 axiomas basales, grupos de conceptos y detalles técnicos) y la agrega al sistema.',
        parameters: {
          type: 'object',
          properties: {
            nombre_materia: {
              type: 'string',
              description: 'Nombre descriptivo de la materia (ej. Oratoria y Debate Persuasivo)'
            },
            codigo: {
              type: 'string',
              description: 'Código mnemónico de 6-7 caracteres (ej. ORA-RET)'
            },
            meta_semanal_horas: {
              type: 'number',
              description: 'Meta de horas de estudio semanal dedicadas a la materia (ej. 2.0)'
            },
            enfoque: {
              type: 'string',
              description: 'Enfoque temático o directriz pedagógica a investigar'
            }
          },
          required: ['nombre_materia', 'codigo', 'meta_semanal_horas']
        }
      },
      {
        name: 'programar_bloque_estudio',
        description: 'Inserta una sesión de estudio específica en un día y franja horaria determinada.',
        parameters: {
          type: 'object',
          properties: {
            dia: {
              type: 'string',
              enum: ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado']
            },
            materia_codigo: {
              type: 'string',
              description: 'Código de la asignatura (ej. ORA-RET, SIS-OPSEC, ING-VIA)'
            },
            hora_inicio: {
              type: 'string',
              description: 'HH:MM de inicio (ej. 08:30)'
            },
            hora_fin: {
              type: 'string',
              description: 'HH:MM de fin (ej. 10:30)'
            },
            tema: {
              type: 'string',
              description: 'Tema o contenido específico de la sesión'
            }
          },
          required: ['dia', 'materia_codigo', 'hora_inicio', 'hora_fin']
        }
      },
      {
        name: 'enviar_alerta_telefono',
        description: 'Envía un recordatorio o notificación inmediata al teléfono celular del usuario a través de su Bot de Telegram.',
        parameters: {
          type: 'object',
          properties: {
            mensaje: {
              type: 'string',
              description: 'Contenido del mensaje a enviar al teléfono'
            }
          },
          required: ['mensaje']
        }
      },
      {
        name: 'consultar_estado_estudio',
        description: 'Consulta el estado actual de horas semanales, materias cargadas, cumplimiento y déficit.',
        parameters: {
          type: 'object',
          properties: {}
        }
      }
    ];
  }

  getSystemPrompt() {
    const materias = obtenerTodasLasMaterias();
    const listaMaterias = materias.map(m => `- ${m.codigo}: ${m.nombre} (Meta: ${m.metaSemanalHoras}h/sem)`).join('\n');

    return `Eres Sócrates & Chronos, el copiloto de IA agéntico y tutor socrático del Sistema Personal de Estudio AXIOM.
Tu rol es ayudar al compañero a mantener una disciplina de estudio inquebrantable, antifrágil ante cortes de energía eléctrica en Venezuela y emergencias.

PRINCIPIOS DE OPERACIÓN:
1. Trato: Dirígete al usuario con respeto y cercanía formal como "Compañero". Cero nombres personales y cero jerga chavista o partidista.
2. Pensamiento de Primeros Principios: Enseña y estructura todo en 3 niveles (Axiomas basales ➔ Grupos de conceptos ➔ Detalles prácticos).
3. Agéntico y Proactivo: Si el usuario te indica un corte de luz o imprevisto, invoca inmediatamente la herramienta 'reestructurar_horario'.
4. Si el usuario te pide estudiar una disciplina nueva (ej. Oratoria), usa la herramienta 'investigar_y_crear_materia' para armar su árbol epistémico e integrarla.
5. Si el usuario pide recordatorios al teléfono, invoca 'enviar_alerta_telefono'.

CATÁLOGO ACTUAL DE MATERIAS:
${listaMaterias}

Sé conciso, directo, preciso y riguroso.`;
  }

  /**
   * Procesa el mensaje del usuario y orquesta la respuesta
   */
  async procesarMensajeUsuario(textoUsuario) {
    if (!textoUsuario || !textoUsuario.trim()) return;

    const textoLimpio = textoUsuario.trim();
    this.historialChat.push({ role: 'user', content: textoLimpio });
    this.renderChat();
    this.mostrarIndicadorPensando(true);

    try {
      const respuestaLLM = await llmProvider.enviarMensaje({
        systemPrompt: this.getSystemPrompt(),
        historial: this.historialChat.slice(-10),
        mensajeUsuario: textoLimpio,
        herramientas: this.getHerramientasDisponibles()
      });

      this.mostrarIndicadorPensando(false);

      // Si el LLM invocó herramientas agénticas
      let resumenAcciones = '';
      if (respuestaLLM.llamadasHerramientas && respuestaLLM.llamadasHerramientas.length > 0) {
        for (const call of respuestaLLM.llamadasHerramientas) {
          const resultadoTool = await this.ejecutarTool(call.nombre, call.argumentos);
          resumenAcciones += `\n\n${resultadoTool}`;
        }
      }

      let textoFinal = respuestaLLM.texto || '';
      if (!textoFinal && resumenAcciones) {
        textoFinal = `✅ He completado la acción solicitada:${resumenAcciones}`;
      } else if (resumenAcciones && !textoFinal.includes('He reestructurado') && !textoFinal.includes('incorporado')) {
        textoFinal += `\n${resumenAcciones}`;
      }

      this.historialChat.push({ role: 'assistant', content: textoFinal });
      this.guardarHistorialChat();
      this.renderChat();

    } catch (err) {
      this.mostrarIndicadorPensando(false);
      console.error('Error procesando mensaje:', err);
      const errMsg = `⚠️ Ocurrió un error al procesar tu solicitud: ${err.message}.`;
      this.historialChat.push({ role: 'assistant', content: errMsg });
      this.guardarHistorialChat();
      this.renderChat();
    }
  }

  /**
   * Ejecutor interno de Tools de Function Calling
   */
  async ejecutarTool(nombre, args) {
    console.log(`[Tool Call] Ejecutando ${nombre}:`, args);

    if (nombre === 'reestructurar_horario') {
      const dia = (args.dia || 'lunes').toLowerCase();
      const horaIni = args.hora_inicio || '12:00';
      const horaFin = args.hora_fin || '18:00';
      const motivo = args.motivo || 'Corte Eléctrico';

      const res = rebalancearItinerario(this.app.itinerario, {
        dia,
        horaInicio: horaIni,
        horaFin: horaFin,
        motivo
      });

      if (res.rebalanceado) {
        this.app.itinerario = res.itinerario;
        this.app.guardarItinerario();
        this.app.historialEventos.unshift({
          id: `evt_${Date.now()}`,
          fecha: new Date().toISOString(),
          dia,
          horaInicio: horaIni,
          horaFin: horaFin,
          motivo,
          horasPerdidas: res.horasPerdidasTotal,
          horasRecuperadasSemana: res.horasRecuperadasSemana,
          desbordeMensual: res.desbordeMensualHoras
        });
        this.app.guardarHistorial();
        this.app.renderKPIs();
        this.app.renderVista();

        // Si hay Telegram configurado, avisar al celular
        if (notificacionesService.getTieneTelegramConfigurado()) {
          notificacionesService.enviarAlerta({
            titulo: '⚡ Rebalanceo Antifrágil Ejecutado',
            mensaje: `Se reprogramó tu itinerario por corte de luz el ${dia.toUpperCase()} (${horaIni} - ${horaFin}).`,
            datosExtra: `Recuperadas en semana: ${res.horasRecuperadasSemana}h | Desborde al mes: ${res.desbordeMensualHoras}h`
          });
        }

        return `⚙️ **Rebalanceo Ejecutado:** Se reconocieron ${res.horasPerdidasTotal}h perdidas el ${dia}. Se redistribuyeron ${res.horasRecuperadasSemana}h en la semana y ${res.desbordeMensualHoras}h al plan mensual.`;
      } else {
        return `ℹ️ ${res.mensaje}`;
      }
    }

    if (nombre === 'investigar_y_crear_materia') {
      const nombreMat = args.nombre_materia || 'Nueva Disciplina';
      const codigo = (args.codigo || 'MAT-NEW').toUpperCase();
      const meta = Number(args.meta_semanal_horas) || 2.0;
      const enfoque = args.enfoque || 'Estudio intensivo bajo primeros principios';

      const nuevaMateria = {
        codigo,
        nombre: nombreMat,
        categoria: 'formacion',
        metaSemanalHoras: meta,
        colorHex: '#f97316',
        colorBg: 'rgba(249, 115, 22, 0.12)',
        colorBorder: 'rgba(249, 115, 22, 0.4)',
        icono: 'book-open',
        demandaCognitiva: 'medium',
        descripcion: enfoque
      };

      guardarMateriaPersonalizada(nuevaMateria);

      // Si no tiene guía, crear una guía base de 3 niveles estructurada
      const guias = obtenerTodasLasGuias();
      if (!guias[codigo]) {
        const nuevaGuia = {
          materiaCodigo: codigo,
          titulo: nombreMat,
          descripcion: `Guía axiomática de ${nombreMat}. ${enfoque}`,
          axiomas: [
            {
              id: `ax_${codigo.toLowerCase()}_01`,
              titulo: `Fundamento Primario de ${nombreMat}`,
              enunciado: `Toda maestría en ${nombreMat} se deriva de descomponer el fenómeno en sus componentes irreducibles.`,
              porQueFundamental: `Aprender por analogía o imitación genera errores ciegos; razonar por primeros principios garantiza control total.`,
              criteriosDominio: [
                `Sé explicar la causa raíz de los conceptos fundamentales sin jerga críptica`,
                `Puedo aplicar este principio en un caso real de mi entorno`
              ],
              ejemploUniversal: `El método socrático de reducción al absurdo.`,
              ejemploVenezuela: `Aplicación en la resolución de problemas comunitarios y liderazgo regional.`,
              gruposConceptosIds: [`cc_${codigo.toLowerCase()}_01`]
            }
          ],
          gruposConceptos: [
            {
              id: `cc_${codigo.toLowerCase()}_01`,
              nombre: `Estructura y Modelos Mentales`,
              axiomasPadreIds: [`ax_${codigo.toLowerCase()}_01`],
              conceptos: [
                {
                  id: `c_${codigo.toLowerCase()}_01`,
                  nombre: `Arquitectura Central del Conocimiento`,
                  definicion: `El mapa de relaciones causa-efecto que conecta los axiomas con las aplicaciones tácticas.`,
                  analogia: `Un árbol robusto: las raíces son los axiomas, el tronco son los conceptos y las hojas son los detalles.`
                }
              ],
              detalles: [
                {
                  id: `det_${codigo.toLowerCase()}_01`,
                  conceptoId: `c_${codigo.toLowerCase()}_01`,
                  tipo: 'tecnica',
                  titulo: `Técnica Práctica de Dominio Activo`,
                  contenido: `Práctica deliberada con active recall y explicación verbal en voz alta.`,
                  notas: `Realizar 15 minutos diarios de fijación conceptual.`
                }
              ]
            }
          ]
        };
        guardarGuiaPersonalizada(codigo, nuevaGuia);
      }

      this.app.renderKPIs();
      this.app.renderVista();

      return `📚 **Materia Incorporada:** **${nombreMat}** (${codigo}) con meta de ${meta}h/semana. Ya puedes ver su árbol epistémico en la pestaña de Guías.`;
    }

    if (nombre === 'programar_bloque_estudio') {
      const dia = (args.dia || 'lunes').toLowerCase();
      const cod = (args.materia_codigo || 'SIS-OPSEC').toUpperCase();
      const hIni = args.hora_inicio || '08:30';
      const hFin = args.hora_fin || '10:30';
      const tema = args.tema || `Estudio de ${cod}`;

      const [h1, m1] = hIni.split(':').map(Number);
      const [h2, m2] = hFin.split(':').map(Number);
      const dur = Math.round((((h2 * 60 + m2) - (h1 * 60 + m1)) / 60) * 10) / 10;

      this.app.agregarBloqueManual(dia, {
        materiaCodigo: cod,
        inicio: hIni,
        fin: hFin,
        duracion: dur > 0 ? dur : 1.5,
        tema
      });

      return `⏰ **Bloque Programado:** ${dia.toUpperCase()} de ${hIni} a ${hFin} (${dur}h) para **${cod}** - *${tema}*.`;
    }

    if (nombre === 'enviar_alerta_telefono') {
      const msg = args.mensaje || 'Recordatorio de estudio de AXIOM';
      const res = await notificacionesService.enviarAlerta({
        titulo: '🔔 Alerta de Estudio AXIOM',
        mensaje: msg
      });

      if (res && res.ok) {
        return `📱 **Notificación Enviada al Celular:** Se transmitió exitosamente a tu Telegram: «${msg}».`;
      } else {
        return `⚠️ Se intentó enviar la alerta pero Telegram reportó: ${res?.error || 'No configurado'}. Configura tu Bot Token en el panel.`;
      }
    }

    if (nombre === 'consultar_estado_estudio') {
      const metricas = calcularMetricasSemanales(this.app.itinerario, MATERIAS_CONFIG);
      return `📊 **Balance Actual:** ${metricas.totalProgramado}h programadas de ${metricas.totalMeta}h meta semanal (${metricas.porcentajeGlobal}%). Horas interrumpidas: ${metricas.totalPerdido}h.`;
    }

    return `Comando ${nombre} completado.`;
  }

  initSpeechRecognition() {
    const Speech = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (Speech) {
      this.recognition = new Speech();
      this.recognition.lang = 'es-ES';
      this.recognition.continuous = false;
      this.recognition.interimResults = false;

      this.recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        const inputEl = document.getElementById('input-chat-asistente');
        if (inputEl) {
          inputEl.value = transcript;
          this.procesarMensajeUsuario(transcript);
        }
        this.toggleEscuchaVoz(false);
      };

      this.recognition.onerror = () => {
        this.toggleEscuchaVoz(false);
      };

      this.recognition.onend = () => {
        this.toggleEscuchaVoz(false);
      };
    }
  }

  toggleEscuchaVoz(forzar) {
    if (!this.recognition) {
      alert('Tu navegador no soporta entrada de voz por SpeechRecognition.');
      return;
    }

    const estado = forzar !== undefined ? forzar : !this.escuchandoVoz;
    this.escuchandoVoz = estado;

    const btnMic = document.getElementById('btn-mic-asistente');
    if (btnMic) {
      if (this.escuchandoVoz) {
        btnMic.classList.add('bg-red-600', 'text-white', 'animate-pulse');
        btnMic.classList.remove('bg-[#140e40]', 'text-slate-300');
        try { this.recognition.start(); } catch {}
      } else {
        btnMic.classList.remove('bg-red-600', 'text-white', 'animate-pulse');
        btnMic.classList.add('bg-[#140e40]', 'text-slate-300');
        try { this.recognition.stop(); } catch {}
      }
    }
  }

  renderChat() {
    const contenedor = document.getElementById('contenedor-mensajes-asistente');
    if (!contenedor) return;

    contenedor.innerHTML = this.historialChat.map(m => {
      const esUser = m.role === 'user';
      return `
        <div class="flex gap-2.5 ${esUser ? 'justify-end' : 'justify-start'}">
          ${!esUser ? `
            <div class="w-8 h-8 rounded-xl bg-indigo-900/60 border border-indigo-500/40 flex items-center justify-center text-indigo-300 shrink-0 text-sm">
              🏛️
            </div>
          ` : ''}
          <div class="max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed ${esUser ? 'bg-[#23176d] text-white rounded-tr-none border border-sky-400/40 shadow-md' : 'bg-[#140e40] text-slate-200 rounded-tl-none border border-[#2d1f85] shadow'}">
            <div class="whitespace-pre-wrap">${m.content}</div>
          </div>
          ${esUser ? `
            <div class="w-8 h-8 rounded-xl bg-sky-900/60 border border-sky-500/40 flex items-center justify-center text-sky-300 shrink-0 text-sm">
              👤
            </div>
          ` : ''}
        </div>
      `;
    }).join('');

    contenedor.scrollTop = contenedor.scrollHeight;
  }

  mostrarIndicadorPensando(mostrar) {
    const ind = document.getElementById('indicador-pensando-asistente');
    if (ind) {
      if (mostrar) ind.classList.remove('hidden');
      else ind.classList.add('hidden');
    }
  }
}
