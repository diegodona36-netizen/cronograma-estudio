/**
 * MIGATO • Módulo de Estudio Inteligente (SIGAEE • AXIOM)
 * Controlador Principal de la Aplicación (estudioApp.js)
 * Conducción: José Gregorio 'El Gato' Briceño | Comisión Técnica MIGATO
 */

import {
  MATERIAS_CONFIG,
  DIAS_SEMANA,
  ITINERARIO_BASE_SEMANAL,
  GUIAS_CONOCIMIENTO_3_NIVELES,
  obtenerTodasLasMaterias,
  obtenerTodasLasGuias
} from './estudioData.js';

import {
  rebalancearItinerario,
  detectarBloquesAfectados,
  calcularMetricasSemanales,
  calcularHorasDia
} from './reschedulingEngine.js';

import { ArbolConocimientoManager } from './arbolConocimiento.js';
import { geminiTutor } from './geminiTutorService.js';
import { llmProvider } from './llmProviderService.js';
import { notificacionesService } from './notificacionesService.js';
import { AsistenteIAController } from './asistenteIAController.js';

class EstudioApp {
  constructor() {
    this.itinerario = this.cargarItinerario();
    this.vistaActiva = 'semanal'; // 'semanal' | 'guias' | 'mensual' | 'tutor'
    this.arbolManager = null;
    this.asistente = null;
    this.historialEventos = this.cargarHistorial();
    this.materiaFiltro = 'todas';
    this.diaSeleccionadoParaBloque = 'lunes';
    this.materiaSeleccionadaParaNodo = 'MAT-ING';
  }

  cargarItinerario() {
    const CURRENT_VERSION = 'v3_con_reunion_martes_limpio';
    try {
      const versionGuardada = localStorage.getItem('axiom_itinerario_version');
      if (versionGuardada === CURRENT_VERSION) {
        const guardado = localStorage.getItem('axiom_estudio_itinerario');
        if (guardado) return JSON.parse(guardado);
      }
    } catch (e) {
      console.warn('Error leyendo itinerario de localStorage:', e);
    }
    const nuevo = JSON.parse(JSON.stringify(ITINERARIO_BASE_SEMANAL));
    try {
      localStorage.setItem('axiom_estudio_itinerario', JSON.stringify(nuevo));
      localStorage.setItem('axiom_itinerario_version', CURRENT_VERSION);
    } catch {}
    return nuevo;
  }

  guardarItinerario() {
    try {
      localStorage.setItem('axiom_estudio_itinerario', JSON.stringify(this.itinerario));
    } catch (e) {
      console.warn('Error guardando itinerario en localStorage:', e);
    }
  }

  cargarHistorial() {
    try {
      const guardado = localStorage.getItem('axiom_estudio_historial_eventos') || localStorage.getItem('migato_estudio_historial_eventos');
      return guardado ? JSON.parse(guardado) : [];
    } catch {
      return [];
    }
  }

  guardarHistorial() {
    try {
      localStorage.setItem('axiom_estudio_historial_eventos', JSON.stringify(this.historialEventos));
    } catch (e) {
      console.warn('Error guardando historial:', e);
    }
  }

  init() {
    this.bindEvents();
    this.arbolManager = new ArbolConocimientoManager('contenedor-arbol-conocimiento');
    window.arbolManager = this.arbolManager;
    window.geminiTutor = geminiTutor;
    window.llmProvider = llmProvider;
    window.notificacionesService = notificacionesService;

    this.asistente = new AsistenteIAController(this);
    window.asistenteIA = this.asistente;

    notificacionesService.iniciarMonitor(() => this.itinerario);

    const params = new URLSearchParams(window.location.search);
    const vistaParam = params.get('vista') || window.location.hash.replace('#', '');
    if (['semanal', 'guias', 'mensual'].includes(vistaParam) && vistaParam !== 'semanal') {
      this.cambiarVista(vistaParam);
    } else {
      this.renderVista();
    }

    if (params.get('copiloto') === '1') {
      setTimeout(() => this.abrirPanelAsistente(), 100);
    }

    if (window.lucide) window.lucide.createIcons();
  }

  bindEvents() {
    // Cambio de Vistas Principales
    ['semanal', 'guias', 'mensual'].forEach(v => {
      const btn = document.getElementById(`btn-vista-${v}`);
      if (btn) {
        btn.addEventListener('click', () => this.cambiarVista(v));
      }
    });

    // Modal de Contingencia
    const btnReportar = document.getElementById('btn-abrir-modal-contingencia');
    if (btnReportar) {
      btnReportar.addEventListener('click', () => this.abrirModalContingencia());
    }

    const btnCerrarModal = document.getElementById('btn-cerrar-modal-contingencia');
    if (btnCerrarModal) {
      btnCerrarModal.addEventListener('click', () => this.cerrarModalContingencia());
    }

    // Formulario de Interrupción
    const formContingencia = document.getElementById('form-contingencia');
    if (formContingencia) {
      formContingencia.addEventListener('submit', (e) => {
        e.preventDefault();
        this.ejecutarRebalanceoDesdeFormulario();
      });
    }

    // Selector de materias para vista de guías
    const selectMatGuia = document.getElementById('select-materia-guia');
    if (selectMatGuia) {
      selectMatGuia.addEventListener('change', (e) => {
        this.arbolManager.setMateria(e.target.value);
      });
    }

    // Modal de API Key Gemini
    const btnApiKey = document.getElementById('btn-config-gemini-key');
    if (btnApiKey) {
      btnApiKey.addEventListener('click', () => this.abrirModalApiKey());
    }
  }

  cambiarVista(nuevaVista) {
    this.vistaActiva = nuevaVista;

    ['semanal', 'guias', 'mensual'].forEach(v => {
      const btn = document.getElementById(`btn-vista-${v}`);
      const sec = document.getElementById(`seccion-vista-${v}`);

      if (btn && sec) {
        if (v === nuevaVista) {
          btn.className = 'px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-black bg-[#23176d] text-white border border-sky-400/50 shadow-md transition flex items-center gap-1.5 cursor-pointer';
          sec.classList.remove('hidden');
        } else {
          btn.className = 'px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-slate-400 hover:text-white bg-[#140e40] border border-[#2d1f85] transition flex items-center gap-1.5 cursor-pointer';
          sec.classList.add('hidden');
        }
      }
    });

    this.renderVista();
    if (window.lucide) window.lucide.createIcons();
  }

  renderKPIs() {
    const metricas = calcularMetricasSemanales(this.itinerario, MATERIAS_CONFIG);

    const elTotalProg = document.getElementById('kpi-horas-programadas');
    if (elTotalProg) elTotalProg.textContent = `${metricas.totalProgramado}h`;

    const elTotalMeta = document.getElementById('kpi-horas-meta');
    if (elTotalMeta) elTotalMeta.textContent = `${metricas.totalMeta}h`;

    const elPorcentaje = document.getElementById('kpi-porcentaje-cumplimiento');
    if (elPorcentaje) elPorcentaje.textContent = `${metricas.porcentajeGlobal}%`;

    const elBarra = document.getElementById('barra-progreso-global');
    if (elBarra) elBarra.style.width = `${metricas.porcentajeGlobal}%`;

    const elPerdidas = document.getElementById('kpi-horas-interrupcion');
    if (elPerdidas) elPerdidas.textContent = `${metricas.totalPerdido}h`;

    const elCompletadas = document.getElementById('kpi-horas-completadas');
    if (elCompletadas) elCompletadas.textContent = `${metricas.totalCompletado}h`;
  }

  renderVista() {
    if (this.vistaActiva === 'semanal') {
      this.renderLienzoSemanal();
    } else if (this.vistaActiva === 'guias') {
      this.arbolManager.render();
    } else if (this.vistaActiva === 'mensual') {
      this.renderVistaMensual();
    }
  }

  renderLienzoSemanal() {
    const contenedor = document.getElementById('grid-semana-canvases');
    if (!contenedor) return;

    contenedor.innerHTML = DIAS_SEMANA.map(dia => {
      const bloques = (this.itinerario[dia.id] || []).filter(b => {
        if (this.materiaFiltro === 'todas') return true;
        return b.materiaCodigo === this.materiaFiltro;
      });

      const totalHorasDia = calcularHorasDia(bloques);
      const esDiaSaturado = totalHorasDia >= 6.5;

      return `
        <div class="bg-[#100b33] border border-[#2d1f85] rounded-2xl flex flex-col overflow-hidden shadow-lg transition hover:border-[#3c2ba6]">
          <!-- Encabezado del Día -->
          <div class="p-3 bg-[#140e40] border-b border-[#2d1f85] flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full ${esDiaSaturado ? 'bg-amber-400 animate-pulse' : 'bg-emerald-400'}"></span>
              <h3 class="text-sm font-black text-white uppercase tracking-wider">${dia.nombre}</h3>
            </div>
            <div class="flex items-center gap-1.5">
              <span class="text-xs font-mono font-bold px-2 py-0.5 rounded-lg ${esDiaSaturado ? 'bg-amber-950 text-amber-300 border border-amber-600/50' : 'bg-[#18114a] text-slate-300 border border-[#2d1f85]'}">
                ${Math.round(totalHorasDia * 10) / 10}h
              </span>
              <button onclick="window.abrirModalAgregarBloque('${dia.id}')" class="w-6 h-6 rounded-lg bg-[#18114a] hover:bg-[#23176d] border border-[#2d1f85] text-slate-300 hover:text-white flex items-center justify-center text-xs font-bold transition cursor-pointer" title="Agregar bloque manual a ${dia.nombre}">
                +
              </button>
            </div>
          </div>

          <!-- Lista de Bloques del Día -->
          <div class="p-2.5 space-y-2 flex-1 overflow-y-auto max-h-[480px] scrollbar-thin">
            ${bloques.length === 0 ? `
              <div class="py-8 text-center text-xs text-slate-500 italic">
                Sin bloques programados
              </div>
            ` : bloques.map(b => this.renderTarjetaBloque(b, dia.id)).join('')}
          </div>
        </div>
      `;
    }).join('');

    if (window.lucide) window.lucide.createIcons();
  }

  renderTarjetaBloque(bloque, diaId) {
    const mat = MATERIAS_CONFIG.find(m => m.codigo === bloque.materiaCodigo) || {
      nombre: bloque.materiaCodigo,
      colorHex: '#38bdf8',
      colorBg: 'rgba(56, 189, 248, 0.12)',
      colorBorder: 'rgba(56, 189, 248, 0.4)'
    };

    if (bloque.cancelado) {
      return `
        <div class="p-2.5 rounded-xl bg-red-950/20 border border-red-500/30 opacity-60 space-y-1.5 relative overflow-hidden">
          <div class="flex items-center justify-between text-xs">
            <span class="font-mono text-slate-400 line-through">${bloque.inicio} - ${bloque.fin}</span>
            <span class="px-1.5 py-0.5 rounded text-[10px] font-bold bg-red-950 text-red-300 border border-red-500/50">
              ⚡ ${bloque.motivoCancelacion || 'Cancelado'}
            </span>
          </div>
          <p class="text-xs font-bold text-slate-400 line-through truncate">${bloque.tema || mat.nombre}</p>
        </div>
      `;
    }

    return `
      <div style="background-color: ${mat.colorBg}; border-color: ${mat.colorBorder};" class="p-3 rounded-xl border flex flex-col justify-between gap-2 transition hover:scale-[1.01] hover:shadow-md group relative">
        <div>
          <!-- Cabecera del Bloque: Horario + Badges -->
          <div class="flex items-center justify-between gap-1 text-xs mb-1">
            <span class="font-mono font-bold text-slate-200">
              ⏰ ${bloque.inicio} - ${bloque.fin} <span class="text-slate-400">(${bloque.duracion}h)</span>
            </span>
            ${bloque.esRecuperacion ? `
              <span class="px-1.5 py-0.5 rounded text-[10px] font-black bg-amber-950 text-amber-300 border border-amber-500/60 shadow-sm animate-pulse" title="Recuperado de ${bloque.recuperaDe}">
                ⚡ Recuperado
              </span>
            ` : ''}
          </div>

          <!-- Materia y Tema -->
          <div class="space-y-0.5">
            <span class="text-[11px] font-black uppercase tracking-wider block" style="color: ${mat.colorHex};">
              ${mat.codigo} • ${mat.nombre}
            </span>
            <h4 class="text-xs sm:text-sm font-bold text-white group-hover:text-amber-200 transition line-clamp-2">
              ${bloque.tema || 'Estudio Profundo y Ejercitación'}
            </h4>
          </div>
        </div>

        <!-- Acciones Rápidas del Bloque -->
        <div class="pt-2 border-t border-white/10 flex items-center justify-between gap-1">
          <button onclick="window.toggleCompletarBloque('${diaId}', '${bloque.id}')" class="px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1 transition cursor-pointer ${bloque.completado ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/50' : 'bg-[#0e092e] text-slate-300 hover:text-white border border-[#2d1f85]'}">
            <span>${bloque.completado ? '✓ Listo' : '⚪ Pendiente'}</span>
          </button>

          <div class="flex items-center gap-1">
            <button onclick="window.abrirGuiaDeMateria('${bloque.materiaCodigo}')" class="p-1 rounded-lg bg-[#0e092e] hover:bg-[#23176d] text-slate-300 hover:text-sky-300 text-xs transition cursor-pointer" title="Ver guía de estudio y axiomas de esta materia">
              📖
            </button>
            <button onclick="window.eliminarBloqueManual('${diaId}', '${bloque.id}')" class="p-1 rounded-lg bg-[#0e092e] hover:bg-red-950 text-slate-400 hover:text-red-300 text-xs transition cursor-pointer" title="Eliminar bloque">
              ✕
            </button>
          </div>
        </div>
      </div>
    `;
  }

  renderVistaMensual() {
    const contenedor = document.getElementById('contenedor-vista-mensual');
    if (!contenedor) return;

    const metricas = calcularMetricasSemanales(this.itinerario, MATERIAS_CONFIG);

    contenedor.innerHTML = `
      <div class="space-y-6">
        <!-- Tarjeta de Plan de Amortización Mensual -->
        <div class="p-5 sm:p-6 bg-[#140e40] border border-[#2d1f85] rounded-2xl space-y-3">
          <div class="flex items-center justify-between">
            <div>
              <span class="text-xs font-bold text-amber-400 uppercase tracking-wider block">Balance de Resiliencia</span>
              <h3 class="text-lg font-black text-white">Promedios y Amortización Mensual</h3>
            </div>
            <span class="px-3 py-1 rounded-xl text-xs font-mono font-bold bg-[#1d1554] text-sky-300 border border-[#2d1f85]">
              Meta Mensual: ~${metricas.totalMeta * 4}h
            </span>
          </div>
          <p class="text-sm text-slate-300 max-w-3xl leading-relaxed">
            Cuando un corte eléctrico o imprevisto de partido no puede recuperarse en la semana sin sobrepasar el límite de 6.5h diarias, el motor desborda el tiempo excedente equitativamente a lo largo de las siguientes 3 semanas del mes.
          </p>
        </div>

        <!-- Tabla de Estado por Materia a Nivel Mensual -->
        <div class="bg-[#100b33] border border-[#2d1f85] rounded-2xl overflow-hidden shadow-xl">
          <table class="w-full text-left text-sm">
            <thead class="bg-[#140e40] text-xs uppercase text-slate-400 font-bold border-b border-[#2d1f85]">
              <tr>
                <th class="p-3.5">Asignatura / Proyecto</th>
                <th class="p-3.5">Meta Semanal</th>
                <th class="p-3.5">Proyección Mensual</th>
                <th class="p-3.5">Horas Semanales Asignadas</th>
                <th class="p-3.5">Horas Perdidas</th>
                <th class="p-3.5">Cumplimiento</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-[#2d1f85]/50">
              ${metricas.materias.map(m => `
                <tr class="hover:bg-[#140e40]/60 transition">
                  <td class="p-3.5 font-bold text-white flex items-center gap-2">
                    <span class="w-2.5 h-2.5 rounded-full" style="background-color: ${m.colorHex}"></span>
                    <span>${m.nombre}</span>
                    <span class="text-xs font-mono text-slate-400">(${m.codigo})</span>
                  </td>
                  <td class="p-3.5 font-mono text-slate-300">${m.metaSemanal}h</td>
                  <td class="p-3.5 font-mono text-sky-300">${m.metaSemanal * 4}h</td>
                  <td class="p-3.5 font-mono font-bold text-white">${m.horasProgramadas}h</td>
                  <td class="p-3.5 font-mono text-amber-300">${m.horasPerdidas}h</td>
                  <td class="p-3.5">
                    <div class="flex items-center gap-2">
                      <div class="flex-1 w-24 bg-[#0e092e] h-2 rounded-full overflow-hidden border border-[#2d1f85]">
                        <div class="h-full rounded-full transition-all" style="width: ${m.porcentajeCumplimiento}%; background-color: ${m.colorHex};"></div>
                      </div>
                      <span class="text-xs font-mono font-bold text-slate-200">${m.porcentajeCumplimiento}%</span>
                    </div>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <!-- Historial de Interrupciones Registradas -->
        <div class="bg-[#100b33] border border-[#2d1f85] rounded-2xl p-5 space-y-3">
          <div class="flex items-center justify-between">
            <h4 class="text-sm font-black text-white uppercase tracking-wider">Historial de Contingencias Eléctricas y Partidistas</h4>
            <span class="text-xs text-slate-400 font-mono">${this.historialEventos.length} eventos registrados</span>
          </div>

          ${this.historialEventos.length === 0 ? `
            <p class="text-xs text-slate-500 italic py-3 text-center">No hay interrupciones reportadas aún.</p>
          ` : `
            <div class="space-y-2">
              ${this.historialEventos.slice(-5).reverse().map(ev => `
                <div class="p-3 rounded-xl bg-[#140e40] border border-[#2d1f85] flex items-center justify-between text-xs">
                  <div>
                    <span class="font-bold text-white">${ev.motivo}</span>
                    <span class="text-slate-400 ml-2">• ${ev.dia.toUpperCase()} (${ev.horaInicio} - ${ev.horaFin})</span>
                  </div>
                  <span class="text-amber-300 font-bold font-mono">-${ev.horasPerdidasTotal}h afectadas</span>
                </div>
              `).join('')}
            </div>
          `}
        </div>
      </div>
    `;
  }

  abrirModalContingencia() {
    const modal = document.getElementById('modal-contingencia');
    if (modal) {
      modal.classList.remove('hidden');
      modal.classList.add('flex');
    }
    this.actualizarPreviewContingencia();
  }

  cerrarModalContingencia() {
    const modal = document.getElementById('modal-contingencia');
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
  }

  actualizarPreviewContingencia() {
    const dia = document.getElementById('input-contingencia-dia')?.value || 'lunes';
    const hIni = document.getElementById('input-contingencia-ini')?.value || '12:00';
    const hFin = document.getElementById('input-contingencia-fin')?.value || '18:00';

    const diag = detectarBloquesAfectados(this.itinerario, dia, hIni, hFin);
    const contenedor = document.getElementById('preview-bloques-afectados');
    if (!contenedor) return;

    if (diag.bloquesAfectados.length === 0) {
      contenedor.innerHTML = `
        <div class="p-3 rounded-xl bg-[#0e092e] text-xs text-slate-400 text-center border border-[#2d1f85]">
          Ningún bloque programado se cruza con esta ventana en ${dia}.
        </div>
      `;
    } else {
      contenedor.innerHTML = `
        <div class="space-y-1.5 p-3 rounded-xl bg-[#0e092e] border border-amber-900/40 text-xs">
          <span class="text-amber-400 font-bold block mb-1">Bloques a redistribuir (${diag.totalHorasPerdidas} horas totales):</span>
          ${diag.bloquesAfectados.map(b => `
            <div class="flex items-center justify-between text-slate-300">
              <span>• ${b.tema || b.materiaCodigo}</span>
              <span class="font-mono text-amber-300">${b.inicio} - ${b.fin} (${b.duracion}h)</span>
            </div>
          `).join('')}
        </div>
      `;
    }
  }

  ejecutarRebalanceoDesdeFormulario() {
    const dia = document.getElementById('input-contingencia-dia')?.value || 'lunes';
    const hIni = document.getElementById('input-contingencia-ini')?.value || '12:00';
    const hFin = document.getElementById('input-contingencia-fin')?.value || '18:00';
    const motivo = document.getElementById('input-contingencia-motivo')?.value || 'Corte de Luz';

    const resultado = rebalancearItinerario(this.itinerario, {
      dia,
      horaInicio: hIni,
      horaFin: hFin,
      motivo
    });

    if (!resultado.rebalanceado) {
      alert(resultado.mensaje);
      return;
    }

    this.itinerario = resultado.itinerario;
    this.guardarItinerario();

    this.historialEventos.push({
      dia,
      horaInicio: hIni,
      horaFin: hFin,
      motivo,
      horasPerdidasTotal: resultado.horasPerdidasTotal,
      horasRecuperadasSemana: resultado.horasRecuperadasSemana,
      desbordeMensualHoras: resultado.desbordeMensualHoras,
      fecha: new Date().toISOString()
    });
    this.guardarHistorial();

    this.cerrarModalContingencia();
    this.renderKPIs();
    this.renderVista();

    // Mostrar modal con dictamen de rebalanceo
    this.mostrarModalResultadoRebalanceo(resultado);
  }

  mostrarModalResultadoRebalanceo(resultado) {
    const modal = document.getElementById('modal-resultado-rebalanceo');
    const contenido = document.getElementById('contenido-resultado-rebalanceo');
    if (!modal || !contenido) return;

    contenido.innerHTML = `
      <div class="space-y-4">
        <div class="p-3 rounded-xl ${resultado.desbordeMensualHoras === 0 ? 'bg-emerald-950/60 border border-emerald-500/50' : 'bg-amber-950/60 border border-amber-500/50'} text-xs sm:text-sm text-white font-semibold">
          ${resultado.mensaje}
        </div>

        <div class="space-y-2">
          <span class="text-xs font-black text-slate-300 uppercase tracking-wider block">Acciones de Redistribución Aplicadas:</span>
          <div class="space-y-1.5 max-h-60 overflow-y-auto scrollbar-thin">
            ${resultado.logAcciones.map(a => `
              <div class="p-2.5 rounded-xl bg-[#0e092e] border border-[#2d1f85] flex items-center justify-between text-xs">
                <div>
                  <span class="font-bold text-white">${a.materiaNombre}</span>
                  <span class="text-slate-400 block">${a.diaDestino.toUpperCase()} • ${a.horario}</span>
                </div>
                <span class="font-mono font-bold text-sky-400">+${a.duracion}h</span>
              </div>
            `).join('')}
          </div>
        </div>

        ${resultado.planMensual ? `
          <div class="p-3 bg-[#100b33] rounded-xl border border-sky-500/30 text-xs text-sky-200">
            <strong>Plan de Amortización Mensual:</strong> ${resultado.planMensual.recomendacion}
          </div>
        ` : ''}
      </div>
    `;

    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }

  cerrarModalResultadoRebalanceo() {
    const modal = document.getElementById('modal-resultado-rebalanceo');
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
  }

  toggleCompletarBloque(diaId, bloqueId) {
    if (!this.itinerario[diaId]) return;
    this.itinerario[diaId] = this.itinerario[diaId].map(b => {
      if (b.id === bloqueId) {
        return { ...b, completado: !b.completado };
      }
      return b;
    });
    this.guardarItinerario();
    this.renderKPIs();
    this.renderVista();
  }

  eliminarBloqueManual(diaId, bloqueId) {
    if (!this.itinerario[diaId]) return;
    this.itinerario[diaId] = this.itinerario[diaId].filter(b => b.id !== bloqueId);
    this.guardarItinerario();
    this.renderKPIs();
    this.renderVista();
  }

  agregarBloqueManual(diaId, datos) {
    if (!this.itinerario[diaId]) this.itinerario[diaId] = [];
    this.itinerario[diaId].push({
      id: `man_${diaId}_${Date.now()}`,
      materiaCodigo: datos.materiaCodigo,
      inicio: datos.inicio,
      fin: datos.fin,
      duracion: datos.duracion,
      tema: datos.tema || 'Estudio de Bloque',
      completado: false
    });
    this.itinerario[diaId].sort((a, b) => a.inicio.localeCompare(b.inicio));
    this.guardarItinerario();
    this.renderKPIs();
    this.renderVista();
  }

  restablecerItinerarioBase() {
    if (confirm('¿Restablecer el itinerario al plan semanal base oficial? Se borrarán las modificaciones manuales de esta semana.')) {
      this.itinerario = JSON.parse(JSON.stringify(ITINERARIO_BASE_SEMANAL));
      this.guardarItinerario();
      this.renderKPIs();
      this.renderVista();
    }
  }

  abrirModalConfiguracionIA() {
    const modal = document.getElementById('modal-configuracion-ia');
    if (!modal) return;

    // Cargar valores actuales
    const selProv = document.getElementById('cfg-llm-provider');
    const inputGemini = document.getElementById('cfg-gemini-key');
    const inputOpenRouter = document.getElementById('cfg-openrouter-key');
    const inputModel = document.getElementById('cfg-openrouter-model');
    const inputTgToken = document.getElementById('cfg-telegram-token');
    const inputTgChat = document.getElementById('cfg-telegram-chatid');

    if (selProv) selProv.value = llmProvider.proveedor;
    if (inputGemini) inputGemini.value = llmProvider.geminiApiKey;
    if (inputOpenRouter) inputOpenRouter.value = llmProvider.openrouterApiKey;
    if (inputModel) inputModel.value = llmProvider.openrouterModel;
    if (inputTgToken) inputTgToken.value = notificacionesService.telegramToken;
    if (inputTgChat) inputTgChat.value = notificacionesService.telegramChatId;

    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }

  cerrarModalConfiguracionIA() {
    const modal = document.getElementById('modal-configuracion-ia');
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
  }

  guardarConfiguracionIAForm() {
    const selProv = document.getElementById('cfg-llm-provider')?.value || 'gemini';
    const keyGemini = document.getElementById('cfg-gemini-key')?.value || '';
    const keyOpenRouter = document.getElementById('cfg-openrouter-key')?.value || '';
    const modelOR = document.getElementById('cfg-openrouter-model')?.value || '';
    const tgToken = document.getElementById('cfg-telegram-token')?.value || '';
    const tgChat = document.getElementById('cfg-telegram-chatid')?.value || '';

    llmProvider.setProveedor(selProv);
    llmProvider.setGeminiApiKey(keyGemini);
    geminiTutor.setApiKey(keyGemini);
    llmProvider.setOpenRouterApiKey(keyOpenRouter);
    if (modelOR) llmProvider.setOpenRouterModel(modelOR);

    notificacionesService.setTelegramConfig(tgToken, tgChat);

    alert('Configuración de IA y Telegram guardada exitosamente.');
    this.cerrarModalConfiguracionIA();
  }

  async probarTelegramTest() {
    const btn = document.getElementById('btn-test-telegram');
    if (btn) btn.textContent = 'Enviando...';

    const res = await notificacionesService.probarConexionTelegram();
    if (btn) btn.textContent = 'Probar Conexión con Celular';

    if (res && res.ok) {
      alert('¡Mensaje enviado con éxito a tu Telegram! Revisa tu celular.');
    } else {
      alert(`Error al enviar mensaje: ${res?.error || 'Verifica el Bot Token y Chat ID.'}`);
    }
  }

  abrirModalAgregarBloque(diaId) {
    this.diaSeleccionadoParaBloque = diaId || 'lunes';
    const modal = document.getElementById('modal-agregar-bloque');
    const lblDia = document.getElementById('lbl-agregar-bloque-dia');
    const selMat = document.getElementById('form-bloque-materia');

    if (lblDia) lblDia.textContent = this.diaSeleccionadoParaBloque.toUpperCase();
    if (selMat) {
      const materias = obtenerTodasLasMaterias();
      selMat.innerHTML = materias.map(m => `
        <option value="${m.codigo}">${m.nombre} (${m.codigo})</option>
      `).join('');
    }

    if (modal) {
      modal.classList.remove('hidden');
      modal.classList.add('flex');
    }
  }

  cerrarModalAgregarBloque() {
    const modal = document.getElementById('modal-agregar-bloque');
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
  }

  guardarBloqueManualForm() {
    const dia = this.diaSeleccionadoParaBloque;
    const cod = document.getElementById('form-bloque-materia')?.value || 'SIS-OPSEC';
    const hIni = document.getElementById('form-bloque-inicio')?.value || '08:30';
    const hFin = document.getElementById('form-bloque-fin')?.value || '10:30';
    const tema = document.getElementById('form-bloque-tema')?.value || 'Sesión de Estudio';

    const [h1, m1] = hIni.split(':').map(Number);
    const [h2, m2] = hFin.split(':').map(Number);
    const dur = Math.round((((h2 * 60 + m2) - (h1 * 60 + m1)) / 60) * 10) / 10;

    this.agregarBloqueManual(dia, {
      materiaCodigo: cod,
      inicio: hIni,
      fin: hFin,
      duracion: dur > 0 ? dur : 1.5,
      tema
    });

    this.cerrarModalAgregarBloque();
  }

  abrirModalNuevoNodo(materiaCodigo) {
    this.materiaSeleccionadaParaNodo = materiaCodigo || this.arbolManager?.materiaActivaCodigo || 'SIS-OPSEC';
    const modal = document.getElementById('modal-nuevo-nodo');
    const lblMat = document.getElementById('lbl-nuevo-nodo-materia');

    if (lblMat) lblMat.textContent = this.materiaSeleccionadaParaNodo;
    if (modal) {
      modal.classList.remove('hidden');
      modal.classList.add('flex');
    }
  }

  cerrarModalNuevoNodo() {
    const modal = document.getElementById('modal-nuevo-nodo');
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
  }

  guardarNuevoNodoForm() {
    const matCod = this.materiaSeleccionadaParaNodo;
    const tipo = document.getElementById('form-nodo-tipo')?.value || 'axioma';
    const titulo = document.getElementById('form-nodo-titulo')?.value || '';
    const enunciado = document.getElementById('form-nodo-enunciado')?.value || '';
    const fundamento = document.getElementById('form-nodo-fundamento')?.value || '';
    const criterios = document.getElementById('form-nodo-criterios')?.value || '';

    if (!titulo.trim()) {
      alert('Por favor escribe un título para el nodo.');
      return;
    }

    this.arbolManager.agregarNodoManual(matCod, {
      tipo,
      titulo,
      enunciado,
      fundamento,
      criterios
    });

    this.cerrarModalNuevoNodo();
  }

  abrirPanelAsistente() {
    const panel = document.getElementById('panel-copiloto-asistente');
    if (panel) {
      panel.classList.remove('translate-x-full');
      this.asistente.renderChat();
    }
  }

  cerrarPanelAsistente() {
    const panel = document.getElementById('panel-copiloto-asistente');
    if (panel) {
      panel.classList.add('translate-x-full');
    }
  }

  exportarItinerarioMarkdown() {
    const metricas = calcularMetricasSemanales(this.itinerario, obtenerTodasLasMaterias());
    let md = `# Cronograma Semanal de Estudio • AXIOM\n\n`;
    md += `**Meta Semanal:** ${metricas.totalMeta}h | **Horas Programadas:** ${metricas.totalProgramado}h (${metricas.porcentajeGlobal}%)\n\n`;

    DIAS_SEMANA.forEach(d => {
      md += `## ${d.nombre.toUpperCase()}\n`;
      const bloques = this.itinerario[d.id] || [];
      if (bloques.length === 0) {
        md += `*Sin bloques programados*\n\n`;
      } else {
        bloques.forEach(b => {
          md += `- **${b.inicio} a ${b.fin}** (${b.duracion}h) | \`[${b.materiaCodigo}]\` ${b.tema}${b.cancelado ? ' *(Interrumpido por corte)*' : ''}${b.completado ? ' ✅' : ''}\n`;
        });
        md += `\n`;
      }
    });

    md += `---\n*Generado por AXIOM Sistema de Estudio Antifrágil*\n`;

    // Copiar al portapapeles o descargar
    navigator.clipboard.writeText(md).then(() => {
      alert('¡Cronograma copiado al portapapeles en formato Markdown! Puedes pegarlo directamente en Obsidian.');
    }).catch(() => {
      const blob = new Blob([md], { type: 'text/markdown' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `itinerario_estudio_${new Date().toISOString().slice(0, 10)}.md`;
      a.click();
    });
  }
}

// Inicialización global
const app = new EstudioApp();
window.estudioApp = app;

// Helpers globales para botones en HTML
window.toggleCompletarBloque = (dia, id) => app.toggleCompletarBloque(dia, id);
window.eliminarBloqueManual = (dia, id) => app.eliminarBloqueManual(dia, id);
window.abrirModalContingencia = () => app.abrirModalContingencia();
window.cerrarModalContingencia = () => app.cerrarModalContingencia();
window.cerrarModalResultadoRebalanceo = () => app.cerrarModalResultadoRebalanceo();
window.actualizarPreviewContingencia = () => app.actualizarPreviewContingencia();
window.restablecerItinerarioBase = () => app.restablecerItinerarioBase();

window.abrirModalAgregarBloque = (dia) => app.abrirModalAgregarBloque(dia);
window.cerrarModalAgregarBloque = () => app.cerrarModalAgregarBloque();
window.guardarBloqueManualForm = () => app.guardarBloqueManualForm();

window.abrirModalNuevoNodo = (mat) => app.abrirModalNuevoNodo(mat);
window.cerrarModalNuevoNodo = () => app.cerrarModalNuevoNodo();
window.guardarNuevoNodoForm = () => app.guardarNuevoNodoForm();

window.abrirPanelAsistente = () => app.abrirPanelAsistente();
window.cerrarPanelAsistente = () => app.cerrarPanelAsistente();

window.abrirModalConfiguracionIA = () => app.abrirModalConfiguracionIA();
window.cerrarModalConfiguracionIA = () => app.cerrarModalConfiguracionIA();
window.guardarConfiguracionIAForm = () => app.guardarConfiguracionIAForm();
window.probarTelegramTest = () => app.probarTelegramTest();

window.exportarItinerarioMarkdown = () => app.exportarItinerarioMarkdown();
window.cambiarVista = (vista) => app.cambiarVista(vista);

window.abrirGuiaDeMateria = (materiaCod) => {
  app.cambiarVista('guias');
  app.arbolManager.setMateria(materiaCod);
  const sel = document.getElementById('select-materia-guia');
  if (sel) sel.value = materiaCod;
};

// Enviar mensaje al asistente desde el panel
window.enviarMensajeAsistenteInput = () => {
  const input = document.getElementById('input-chat-asistente');
  if (input && input.value.trim()) {
    const val = input.value;
    input.value = '';
    app.asistente.procesarMensajeUsuario(val);
  }
};

// Diálogo Socrático Multi-turno en Modal
window.consultarTutorSocraticoAxioma = async (axiomaId, axiomaTitulo) => {
  const modal = document.getElementById('modal-tutor-socratico');
  const chatContenedor = document.getElementById('chat-tutor-socratico');
  const tituloEl = document.getElementById('lbl-tutor-axioma-titulo');

  if (tituloEl) tituloEl.textContent = axiomaTitulo;
  if (chatContenedor) {
    chatContenedor.innerHTML = `
      <div class="p-4 text-center text-xs text-slate-400">
        Invocando a Sócrates...
      </div>
    `;
  }
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }

  const res = await geminiTutor.dialogarSocratico(axiomaId, axiomaTitulo);
  if (chatContenedor) {
    chatContenedor.innerHTML = `
      <div class="space-y-3">
        <div class="p-4 rounded-2xl bg-[#140e40] border border-sky-500/40 text-slate-200 text-sm leading-relaxed space-y-2">
          <div class="flex items-center justify-between text-xs text-sky-400 font-bold">
            <span>🏛️ ${res.emisor}</span>
            <span class="font-mono text-slate-400">${res.timestamp}</span>
          </div>
          <p class="font-semibold text-white">«${res.pregunta}»</p>
          ${res.pista ? `
            <div class="pt-2 border-t border-slate-700/60 text-xs text-amber-300">
              💡 <em>Pista socrática:</em> ${res.pista}
            </div>
          ` : ''}
        </div>
        <div class="pt-2">
          <div class="flex gap-2">
            <input type="text" id="input-respuesta-socratica" placeholder="Escribe tu razonamiento o respuesta a Sócrates..." class="flex-1 px-3 py-2 rounded-xl bg-[#0e092e] border border-[#2d1f85] text-xs sm:text-sm text-white focus:outline-none focus:ring-1 focus:ring-sky-400">
            <button onclick="window.enviarRespuestaSocratica('${axiomaId}', '${escapeHtml(axiomaTitulo)}')" class="px-3 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs transition cursor-pointer">
              Responder
            </button>
          </div>
        </div>
      </div>
    `;
  }
};

window.enviarRespuestaSocratica = async (axiomaId, axiomaTitulo) => {
  const input = document.getElementById('input-respuesta-socratica');
  const chatContenedor = document.getElementById('chat-tutor-socratico');
  if (!input || !input.value.trim() || !chatContenedor) return;

  const respUser = input.value.trim();
  input.value = '';

  const divUser = document.createElement('div');
  divUser.className = 'p-3 rounded-2xl bg-[#23176d] border border-sky-400/40 text-white text-xs sm:text-sm text-right';
  divUser.innerHTML = `<strong>Tú:</strong> ${respUser}`;
  chatContenedor.appendChild(divUser);

  const divPensando = document.createElement('div');
  divPensando.className = 'p-3 rounded-2xl bg-[#140e40] text-slate-400 text-xs italic';
  divPensando.textContent = 'Sócrates evaluando tus premisas...';
  chatContenedor.appendChild(divPensando);

  // Consultar al asistente
  const prompt = `El estudiante responde al axioma "${axiomaTitulo}": "${respUser}". Evalúa socráticamente su respuesta en 2 o 3 oraciones, desafiando sus suposiciones o elogiando su precisión de primer principio.`;
  const res = await llmProvider.enviarMensaje({
    systemPrompt: 'Eres Sócrates el filósofo. Hablas con rigor, benevolencia y profundidad.',
    mensajeUsuario: prompt
  });

  divPensando.remove();

  const divSocrates = document.createElement('div');
  divSocrates.className = 'p-4 rounded-2xl bg-[#140e40] border border-sky-500/40 text-slate-200 text-xs sm:text-sm leading-relaxed space-y-1';
  divSocrates.innerHTML = `
    <div class="text-xs text-sky-400 font-bold">🏛️ Sócrates:</div>
    <p class="font-semibold text-white">«${res.texto || 'Compañero, profundiza más en las causas raíz de tu planteamiento.'}»</p>
  `;
  chatContenedor.appendChild(divSocrates);
  chatContenedor.scrollTop = chatContenedor.scrollHeight;
};

window.cerrarModalTutorSocratico = () => {
  const modal = document.getElementById('modal-tutor-socratico');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
};

// Integración de Quiz Rápido
window.generarQuizDeAxioma = async (axiomaId, axiomaTitulo) => {
  const quiz = await geminiTutor.obtenerQuizAxioma(axiomaId, axiomaTitulo);
  const modal = document.getElementById('modal-quiz-relampago');
  const contenido = document.getElementById('contenido-quiz-relampago');
  if (!modal || !contenido) return;

  const preg = quiz.preguntas[0];
  contenido.innerHTML = `
    <div class="space-y-4">
      <h4 class="text-base font-bold text-white">${preg.pregunta}</h4>
      <div class="space-y-2">
        ${preg.opciones.map((opt, idx) => `
          <button onclick="window.responderQuiz(${idx}, ${preg.correcta}, '${escapeHtml(preg.explicacion)}')" class="w-full text-left p-3 rounded-xl bg-[#140e40] hover:bg-[#23176d] border border-[#2d1f85] hover:border-sky-400 text-xs sm:text-sm text-slate-200 hover:text-white transition cursor-pointer">
            ${opt}
          </button>
        `).join('')}
      </div>
      <div id="resultado-quiz-feedback" class="hidden p-3 rounded-xl text-xs leading-relaxed"></div>
    </div>
  `;

  modal.classList.remove('hidden');
  modal.classList.add('flex');
};

window.responderQuiz = (elegida, correcta, explicacion) => {
  const fb = document.getElementById('resultado-quiz-feedback');
  if (!fb) return;

  fb.classList.remove('hidden');
  if (elegida === correcta) {
    fb.className = 'p-3 rounded-xl bg-emerald-950 border border-emerald-500 text-emerald-200 text-xs space-y-1';
    fb.innerHTML = `<strong>¡Respuesta Correcta!</strong><p>${explicacion}</p>`;
  } else {
    fb.className = 'p-3 rounded-xl bg-red-950 border border-red-500 text-red-200 text-xs space-y-1';
    fb.innerHTML = `<strong>Respuesta Incorrecta.</strong><p>${explicacion}</p>`;
  }
};

window.cerrarModalQuiz = () => {
  const modal = document.getElementById('modal-quiz-relampago');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
};

function escapeHtml(str) {
  return (str || '').replace(/'/g, "\\'").replace(/"/g, '&quot;');
}

// Arranque
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => app.init());
} else {
  app.init();
}
