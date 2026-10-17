/**
 * MIGATO • Módulo de Estudio Inteligente (SIGAEE • AXIOM)
 * Controlador Principal de la Aplicación (estudioApp.js)
 * Conducción: José Gregorio 'El Gato' Briceño | Comisión Técnica MIGATO
 */

import {
  MATERIAS_CONFIG,
  DIAS_SEMANA,
  PLAN_MENSUAL_SEMANAS,
  ITINERARIO_BASE_SEMANAL,
  GUIAS_CONOCIMIENTO_3_NIVELES,
  BANCO_LIBROS_GRATUITOS,
  obtenerTodasLasMaterias,
  obtenerTodasLasGuias,
  obtenerTodosLosLibros
} from './estudioData.js';

import {
  rebalancearItinerario,
  detectarBloquesAfectados,
  calcularMetricasSemanales,
  calcularHorasDia,
  timeToMinutes,
  minutesToTime
} from './reschedulingEngine.js';

import { ArbolConocimientoManager } from './arbolConocimiento.js';
import { geminiTutor } from './geminiTutorService.js';
import { llmProvider } from './llmProviderService.js';
import { notificacionesService } from './notificacionesService.js';
import { AsistenteIAController } from './asistenteIAController.js';
import { bitacoraVoz } from './bitacoraVozService.js';

class EstudioApp {
  constructor() {
    let semanaInicial = 1;
    try {
      const semGuardada = parseInt(localStorage.getItem('axiom_semana_activa'), 10);
      if (semGuardada >= 1 && semGuardada <= 4) semanaInicial = semGuardada;
    } catch {}
    this.semanaActiva = semanaInicial;
    this.itinerario = this.cargarItinerario(this.semanaActiva);
    this.vistaActiva = 'semanal'; // 'semanal' | 'guias' | 'mensual' | 'tutor'
    this.arbolManager = null;
    this.asistente = null;
    this.historialEventos = this.cargarHistorial();
    this.materiaFiltro = 'todas';
    this.diaSeleccionadoParaBloque = 'lunes';
    this.materiaSeleccionadaParaNodo = 'MAT-ING';
    this.bitacoraBloqueActivo = null;
    this.campoDictadoActivo = null;
    this.audioDataTemporal = null;
    this.bloqueAjusteActivo = null; // { diaId, bloqueId } para el modal de ajuste de horario

    // Estado del Temporizador de Enfoque (Focus Mode)
    this.timerDuracionMinutos = 25;
    this.timerSegundosRestantes = 25 * 60;
    this.timerInterval = null;
    this.timerCorriendo = false;
    this.timerMateriaCodigo = 'MAT-ING';
    this.timerTemaTitulo = '';

    // Estado de Watchlist (Series & Películas para Ocio e Inmersión en Inglés)
    this.watchlist = this.cargarWatchlist();
    this.filtroWatchlist = 'todas';

    // Filtro móvil de días para el tablero semanal ('hoy' | 'todos' | diaId)
    this.diaFiltroMovil = 'hoy';

    // Estado del Banco de Libros Gratuitos
    this.filtroMateriaLibros = 'todas';
    this.busquedaLibros = '';
  }

  obtenerDiaActualId() {
    const mapa = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];
    const diaNum = new Date().getDay();
    const diaStr = mapa[diaNum];
    return (diaStr === 'domingo') ? 'lunes' : diaStr;
  }

  cargarWatchlist() {
    const key = 'axiom_watchlist_series';
    try {
      const guardado = localStorage.getItem(key);
      if (guardado) return JSON.parse(guardado);
    } catch (e) {
      console.warn('Error leyendo watchlist:', e);
    }
    const WATCHLIST_DEFAULT = [
      {
        id: 'wl_silicon_valley',
        titulo: 'Silicon Valley',
        tipo: 'serie',
        plataforma: 'Max',
        temporada: 1,
        capitulo: 1,
        estado: 'viendo',
        inglesAudio: true,
        notas: 'Servidores, compresión de datos, ingeniería de startups y rondas de inversión.',
        fechaAgregado: '2026-10-12'
      },
      {
        id: 'wl_mr_robot',
        titulo: 'Mr. Robot',
        tipo: 'serie',
        plataforma: 'Prime Video',
        temporada: 1,
        capitulo: 1,
        estado: 'pendiente',
        inglesAudio: true,
        notas: 'Ciberseguridad realista, terminal Linux, ingeniería social y cifrado.',
        fechaAgregado: '2026-10-12'
      },
      {
        id: 'wl_chernobyl',
        titulo: 'Chernobyl',
        tipo: 'miniserie',
        plataforma: 'Max',
        temporada: 1,
        capitulo: 1,
        estado: 'pendiente',
        inglesAudio: true,
        notas: 'Gestión de crisis, protocolos de ingeniería y análisis de fallas en cadena.',
        fechaAgregado: '2026-10-12'
      },
      {
        id: 'wl_better_call_saul',
        titulo: 'Better Call Saul',
        tipo: 'serie',
        plataforma: 'Netflix',
        temporada: 1,
        capitulo: 1,
        estado: 'pendiente',
        inglesAudio: true,
        notas: 'Retórica, oratoria, redacción de contratos y negociación comercial.',
        fechaAgregado: '2026-10-12'
      }
    ];
    try {
      localStorage.setItem(key, JSON.stringify(WATCHLIST_DEFAULT));
    } catch {}
    return WATCHLIST_DEFAULT;
  }

  guardarWatchlist() {
    try {
      localStorage.setItem('axiom_watchlist_series', JSON.stringify(this.watchlist));
    } catch (e) {
      console.warn('Error guardando watchlist:', e);
    }
  }

  abrirModalWatchlist() {
    const modal = document.getElementById('modal-watchlist');
    if (modal) {
      modal.classList.remove('hidden');
      modal.classList.add('flex');
    }
    this.renderWatchlist();
  }

  cerrarModalWatchlist() {
    const modal = document.getElementById('modal-watchlist');
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
    const form = document.getElementById('form-nueva-serie');
    if (form) form.classList.add('hidden');
  }

  filtrarWatchlist(filtro) {
    this.filtroWatchlist = filtro || 'todas';
    this.renderWatchlist();
  }

  toggleFormNuevaSerie() {
    const form = document.getElementById('form-nueva-serie');
    if (form) {
      form.classList.toggle('hidden');
      if (!form.classList.contains('hidden')) {
        const inp = document.getElementById('wl-input-titulo');
        if (inp) inp.focus();
      }
    }
  }

  guardarNuevoTituloWatchlist() {
    const inputTit = document.getElementById('wl-input-titulo');
    const selectPlat = document.getElementById('wl-select-plataforma');
    const selectTipo = document.getElementById('wl-select-tipo');
    const selectEst = document.getElementById('wl-select-estado');
    const inputTemp = document.getElementById('wl-input-temporada');
    const inputCap = document.getElementById('wl-input-capitulo');
    const checkIngles = document.getElementById('wl-check-ingles');
    const inputNotas = document.getElementById('wl-input-notas');

    const titulo = inputTit ? inputTit.value.trim() : '';
    if (!titulo) {
      alert('Por favor ingresa el título de la serie o película.');
      if (inputTit) inputTit.focus();
      return;
    }

    const nuevaObra = {
      id: `wl_${Date.now()}`,
      titulo,
      plataforma: selectPlat ? selectPlat.value : 'Otra',
      tipo: selectTipo ? selectTipo.value : 'serie',
      estado: selectEst ? selectEst.value : 'viendo',
      temporada: inputTemp ? parseInt(inputTemp.value, 10) || 1 : 1,
      capitulo: inputCap ? parseInt(inputCap.value, 10) || 1 : 1,
      inglesAudio: checkIngles ? checkIngles.checked : true,
      notas: inputNotas ? inputNotas.value.trim() : '',
      fechaAgregado: new Date().toISOString().split('T')[0]
    };

    this.watchlist.unshift(nuevaObra);
    this.guardarWatchlist();

    if (inputTit) inputTit.value = '';
    if (inputNotas) inputNotas.value = '';
    const form = document.getElementById('form-nueva-serie');
    if (form) form.classList.add('hidden');

    this.renderWatchlist();
  }

  avanzarCapitulo(id) {
    const item = this.watchlist.find(i => i.id === id);
    if (!item) return;
    item.capitulo = (parseInt(item.capitulo, 10) || 0) + 1;
    if (item.estado === 'pendiente') item.estado = 'viendo';
    this.guardarWatchlist();
    this.renderWatchlist();
  }

  cambiarEstadoObra(id, nuevoEstado) {
    const item = this.watchlist.find(i => i.id === id);
    if (!item) return;
    item.estado = nuevoEstado;
    this.guardarWatchlist();
    this.renderWatchlist();
  }

  eliminarObraWatchlist(id) {
    const item = this.watchlist.find(i => i.id === id);
    const nombre = item ? item.titulo : 'este título';
    if (!confirm(`¿Deseas eliminar "${nombre}" de tu lista de ocio?`)) return;
    this.watchlist = this.watchlist.filter(i => i.id !== id);
    this.guardarWatchlist();
    this.renderWatchlist();
  }

  renderWatchlist() {
    const contenedor = document.getElementById('contenedor-items-watchlist');
    const statsTexto = document.getElementById('stats-watchlist-texto');
    if (!contenedor) return;

    let items = this.watchlist || [];
    if (this.filtroWatchlist !== 'todas') {
      items = items.filter(it => it.estado === this.filtroWatchlist);
    }

    // Actualizar tabs de filtro
    const tabs = ['todas', 'viendo', 'pendiente', 'completada'];
    tabs.forEach(t => {
      const btn = document.getElementById(`tab-wl-${t}`);
      if (!btn) return;
      if (this.filtroWatchlist === t) {
        btn.className = 'px-2.5 py-1 rounded text-xs font-semibold bg-[var(--notion-card)] text-[var(--notion-text)] border border-[var(--notion-border)] cursor-pointer transition';
      } else {
        btn.className = 'px-2.5 py-1 rounded text-xs font-medium text-[var(--notion-text-muted)] hover:text-[var(--notion-text)] cursor-pointer transition';
      }
    });

    // Actualizar estadísticas
    const total = this.watchlist.length;
    const viendo = this.watchlist.filter(i => i.estado === 'viendo').length;
    const pendientes = this.watchlist.filter(i => i.estado === 'pendiente').length;
    const completadas = this.watchlist.filter(i => i.estado === 'completada').length;
    if (statsTexto) {
      statsTexto.textContent = `${total} títulos • ${viendo} viendo actualmente • ${pendientes} por ver • ${completadas} completadas`;
    }

    if (items.length === 0) {
      contenedor.innerHTML = `
        <div class="p-8 text-center border border-dashed border-[var(--notion-border)] rounded-lg text-xs text-[var(--notion-text-muted)] space-y-2">
          <p class="text-2xl">🍿</p>
          <p class="font-medium text-[var(--notion-text)]">No hay títulos en esta sección.</p>
          <p>Pulsa en <strong>+ Añadir Título</strong> para agregar tus series o películas favoritas.</p>
        </div>
      `;
      return;
    }

    contenedor.innerHTML = items.map(item => {
      const esSerie = (item.tipo === 'serie' || item.tipo === 'miniserie');
      const badgeIngles = item.inglesAudio 
        ? `<span class="px-1.5 py-0.5 rounded text-xs font-mono bg-sky-500/15 text-sky-400 border border-sky-500/30 flex items-center gap-1" title="Inmersión en inglés recomendada: audio en inglés + subtítulos">🎧 Audio EN</span>` 
        : '';
      
      const badgePlataforma = `<span class="px-1.5 py-0.5 rounded text-xs font-medium bg-[var(--notion-hover)] text-[var(--notion-text-muted)] border border-[var(--notion-border)]">${item.plataforma || 'Streaming'}</span>`;
      
      const badgeTipo = `<span class="px-1.5 py-0.5 rounded text-xs uppercase font-mono tracking-wider ${esSerie ? 'bg-purple-500/15 text-purple-400 border border-purple-500/30' : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'}">${item.tipo}</span>`;

      let progresoTexto = '';
      if (esSerie) {
        progresoTexto = `Temp. ${item.temporada || 1} • Cap. ${item.capitulo || 1}`;
      } else {
        progresoTexto = item.estado === 'completada' ? 'Película Vista' : 'Película Pendiente';
      }

      return `
        <div class="p-3.5 rounded-lg bg-[var(--notion-card)] border border-[var(--notion-border)] hover:border-[var(--notion-accent)]/50 transition space-y-2.5">
          <div class="flex items-start justify-between gap-2">
            <div class="space-y-1 min-w-0">
              <div class="flex items-center gap-1.5 flex-wrap">
                ${badgeTipo}
                ${badgePlataforma}
                ${badgeIngles}
              </div>
              <h4 class="font-semibold text-sm text-[var(--notion-text)] truncate">${item.titulo}</h4>
            </div>

            <!-- Selector de Estado & Eliminar -->
            <div class="flex items-center gap-1.5 shrink-0">
              <select onchange="window.cambiarEstadoObra('${item.id}', this.value)" class="text-xs px-2 py-1 rounded bg-[var(--notion-bg)] border border-[var(--notion-border)] text-[var(--notion-text)] cursor-pointer">
                <option value="viendo" ${item.estado === 'viendo' ? 'selected' : ''}>▶ Viendo</option>
                <option value="pendiente" ${item.estado === 'pendiente' ? 'selected' : ''}>⏳ Por Ver</option>
                <option value="completada" ${item.estado === 'completada' ? 'selected' : ''}>✓ Completada</option>
              </select>
              <button onclick="window.eliminarObraWatchlist('${item.id}')" class="p-1 rounded hover:bg-red-500/20 text-[var(--notion-text-muted)] hover:text-red-400 transition cursor-pointer text-xs" title="Eliminar de la lista">
                🗑️
              </button>
            </div>
          </div>

          <!-- Progreso y Botón +1 Cap -->
          <div class="flex items-center justify-between gap-2 pt-1 border-t border-[var(--notion-border)] text-xs">
            <div class="flex items-center gap-2">
              <span class="font-mono text-[var(--notion-text)] font-medium">${progresoTexto}</span>
              ${esSerie ? `
                <button onclick="window.avanzarCapitulo('${item.id}')" class="px-2 py-0.5 rounded bg-pink-500/15 hover:bg-pink-500/25 border border-pink-500/30 text-pink-300 font-mono font-bold text-xs transition cursor-pointer flex items-center gap-1" title="Sumar 1 capítulo visto">
                  <span>+1 Cap</span>
                  <span>▶</span>
                </button>
              ` : ''}
            </div>

            <span class="text-xs text-[var(--notion-text-muted)] truncate max-w-[200px] sm:max-w-[280px]">
              ${item.notas ? item.notas : ''}
            </span>
          </div>
        </div>
      `;
    }).join('');
  }

  cargarItinerario(semanaNum = this.semanaActiva || 1) {
    const CURRENT_VERSION = 'v5_plan_mensual_4_semanas';
    const key = `axiom_estudio_itinerario_semana_${semanaNum}`;
    try {
      const versionGuardada = localStorage.getItem('axiom_itinerario_version');
      if (versionGuardada === CURRENT_VERSION) {
        const guardado = localStorage.getItem(key);
        if (guardado) return JSON.parse(guardado);
      }
    } catch (e) {
      console.warn('Error leyendo itinerario de localStorage:', e);
    }
    const semanaData = (PLAN_MENSUAL_SEMANAS && PLAN_MENSUAL_SEMANAS[semanaNum]) 
      ? PLAN_MENSUAL_SEMANAS[semanaNum].dias 
      : ITINERARIO_BASE_SEMANAL;
    const nuevo = JSON.parse(JSON.stringify(semanaData));
    try {
      localStorage.setItem(key, JSON.stringify(nuevo));
      localStorage.setItem('axiom_itinerario_version', CURRENT_VERSION);
    } catch {}
    return nuevo;
  }

  guardarItinerario() {
    try {
      const semanaNum = this.semanaActiva || 1;
      const key = `axiom_estudio_itinerario_semana_${semanaNum}`;
      localStorage.setItem(key, JSON.stringify(this.itinerario));
      localStorage.setItem('axiom_estudio_itinerario', JSON.stringify(this.itinerario));
    } catch (e) {
      console.warn('Error guardando itinerario en localStorage:', e);
    }
  }

  setSemana(num) {
    const semanaNum = parseInt(num, 10);
    if (!semanaNum || semanaNum < 1 || semanaNum > 4) return;
    this.guardarItinerario();
    this.semanaActiva = semanaNum;
    try {
      localStorage.setItem('axiom_semana_activa', String(semanaNum));
    } catch {}
    this.itinerario = this.cargarItinerario(semanaNum);
    this.actualizarUISelectorSemanas();
    this.renderKPIs();
    this.renderVista();
  }

  actualizarUISelectorSemanas() {
    for (let i = 1; i <= 4; i++) {
      const btn = document.getElementById(`btn-semana-${i}`);
      if (!btn) continue;
      const activa = (this.semanaActiva === i);
      if (activa) {
        btn.className = 'btn-semana-tab px-3 py-1.5 rounded-md text-xs font-semibold border transition cursor-pointer flex items-center gap-1.5 bg-[var(--notion-card)] text-[var(--notion-text)] border-[var(--notion-border)] shadow-xs';
      } else {
        btn.className = 'btn-semana-tab px-3 py-1.5 rounded-md text-xs font-medium border transition cursor-pointer flex items-center gap-1.5 bg-transparent text-[var(--notion-text-muted)] border-transparent hover:bg-[var(--notion-hover)] hover:text-[var(--notion-text)]';
      }
    }
    const infoSemana = document.getElementById('info-semana-activa');
    if (infoSemana && PLAN_MENSUAL_SEMANAS && PLAN_MENSUAL_SEMANAS[this.semanaActiva]) {
      const sem = PLAN_MENSUAL_SEMANAS[this.semanaActiva];
      infoSemana.innerHTML = `<strong>${sem.titulo}:</strong> ${sem.descripcion}`;
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
    window.bitacoraVoz = bitacoraVoz;

    this.asistente = new AsistenteIAController(this);
    window.asistenteIA = this.asistente;

    notificacionesService.iniciarMonitor(() => this.itinerario);

    const params = new URLSearchParams(window.location.search);

    if (params.get('demo_bitacoras') === '1') {
      bitacoraVoz.guardarBitacora('lunes', 'b_lun_1', {
        materiaCodigo: 'MAT-ING',
        tema: 'Álgebra: Leyes de Exponentes y Polinomios',
        horario: '08:30 - 10:00',
        aprendido: 'Dominé el binomio de Newton y la simplificación de exponentes negativos y fraccionarios.',
        gusto: 'Los ejercicios resueltos paso a paso en el cuaderno me dieron mucha confianza.',
        mejorar: 'Tengo que repasar la factorización de trinomios que no son cuadrados perfectos.'
      });
      bitacoraVoz.guardarBitacora('martes', 'b_mar_1', {
        materiaCodigo: 'MAT-ING',
        tema: 'Matemáticas: Concepto de Funciones y Dominio',
        horario: '08:30 - 10:00',
        aprendido: 'Comprendí el dominio y rango de funciones racionales y con raíces.',
        gusto: 'La prueba de la línea vertical para saber si una curva es función fue muy rápida.',
        mejorar: 'Dudas con las asíntotas oblicuas en funciones racionales cuando el grado es mayor.'
      });
    }

    this.renderKPIs();

    const vistaParam = params.get('vista') || window.location.hash.replace('#', '');
    if (['semanal', 'guias', 'mensual'].includes(vistaParam) && vistaParam !== 'semanal') {
      this.cambiarVista(vistaParam);
    } else {
      this.renderVista();
    }

    if (params.get('copiloto') === '1') {
      setTimeout(() => this.abrirPanelAsistente(), 100);
    }

    if (params.get('bitacora') === '1') {
      const dia = params.get('dia') || 'lunes';
      const bloque = params.get('bloque') || 'b_lun_1';
      setTimeout(() => this.abrirModalBitacora(dia, bloque), 150);
    }

    if (params.get('lista_bitacoras') === '1') {
      setTimeout(() => this.abrirModalListaBitacoras(), 150);
    }

    if (params.get('contingencia') === '1') {
      setTimeout(() => this.abrirModalContingencia(), 150);
    }

    if (params.get('agregar_bloque') === '1') {
      const dia = params.get('dia') || 'lunes';
      setTimeout(() => this.abrirModalAgregarBloque(dia), 150);
    }

    if (params.get('nuevo_nodo') === '1') {
      const mat = params.get('materia') || 'MAT-ING';
      setTimeout(() => this.abrirModalNuevoNodo(mat), 150);
    }

    if (window.lucide) window.lucide.createIcons();
  }

  bindEvents() {
    // Formulario de Contingencia (Rebalanceo por corte de luz)
    const formContingencia = document.getElementById('form-contingencia');
    if (formContingencia) {
      formContingencia.addEventListener('submit', (e) => {
        e.preventDefault();
        this.ejecutarRebalanceoDesdeFormulario();
      });
    }
  }

  cambiarVista(nuevaVista) {
    this.vistaActiva = nuevaVista;

    ['semanal', 'guias', 'biblioteca', 'mensual'].forEach(v => {
      const btn = document.getElementById(`btn-vista-${v}`);
      const sec = document.getElementById(`seccion-vista-${v}`);

      if (btn && sec) {
        if (v === nuevaVista) {
          btn.className = 'notion-view-btn active';
          sec.classList.remove('hidden');
        } else {
          btn.className = 'notion-view-btn';
          sec.classList.add('hidden');
        }
      }
    });

    // Actualizar Breadcrumb Dinámico Superior
    const breadcrumbActive = document.getElementById('breadcrumb-active-view');
    if (breadcrumbActive) {
      if (nuevaVista === 'semanal') {
        breadcrumbActive.innerHTML = `<span>📅</span><span class="truncate font-semibold">Tablero Semanal</span>`;
      } else if (nuevaVista === 'biblioteca') {
        breadcrumbActive.innerHTML = `<span>📚</span><span class="truncate font-semibold">Banco de Libros Gratuitos</span>`;
      } else if (nuevaVista === 'mensual') {
        breadcrumbActive.innerHTML = `<span>📊</span><span class="truncate font-semibold">Resumen del Mes</span>`;
      }
      // 'guias' se actualiza dentro de arbolManager.render() con el nombre de la materia
    }

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

    const elCompletadas = document.getElementById('kpi-horas-completadas');
    if (elCompletadas) elCompletadas.textContent = `${metricas.totalCompletado}h`;
  }

  obtenerEstiloTagNotion(materiaCodigo) {
    const mapa = {
      'MAT-ING': { bg: 'var(--tag-blue-bg)', text: 'var(--tag-blue-text)', label: 'Matemáticas' },
      'SIS-ARQ': { bg: 'var(--tag-green-bg)', text: 'var(--tag-green-text)', label: 'Redes & CCTV' },
      'GEO-EST': { bg: 'var(--tag-purple-bg)', text: 'var(--tag-purple-text)', label: 'Geopolítica' },
      'ORA-CAS': { bg: 'var(--tag-amber-bg)', text: 'var(--tag-amber-text)', label: 'Léxico & Retórica' },
      'ING-TEC': { bg: 'var(--tag-indigo-bg)', text: 'var(--tag-indigo-text)', label: 'Inglés' },
      'ECO-DIG': { bg: 'var(--tag-orange-bg)', text: 'var(--tag-orange-text)', label: 'Negocios' },
      'REU-COM': { bg: 'var(--tag-rose-bg)', text: 'var(--tag-rose-text)', label: 'Reunión' },
      'GIM-FIT': { bg: 'var(--tag-orange-bg)', text: 'var(--tag-orange-text)', label: 'Gimnasio' },
      'OCI-LIB': { bg: 'var(--tag-gray-bg)', text: 'var(--tag-gray-text)', label: 'Ocio' }
    };
    return mapa[materiaCodigo] || { bg: 'var(--tag-gray-bg)', text: 'var(--tag-gray-text)', label: materiaCodigo };
  }

  renderVista() {
    if (this.vistaActiva === 'semanal') {
      this.actualizarUISelectorSemanas();
      this.renderLienzoSemanal();
    } else if (this.vistaActiva === 'guias') {
      this.arbolManager.render();
    } else if (this.vistaActiva === 'biblioteca') {
      this.renderBibliotecaLibros();
    } else if (this.vistaActiva === 'mensual') {
      this.renderVistaMensual();
    }
  }

  actualizarSelectorDiasMovil() {
    const contenedor = document.getElementById('selector-dias-movil');
    if (!contenedor) return;

    const diaActualId = this.obtenerDiaActualId();

    const opciones = [
      { id: 'hoy', etiqueta: `⚡ Hoy (${diaActualId.slice(0, 3).toUpperCase()})` },
      { id: 'todos', etiqueta: 'Todos (6 Días)' },
      ...DIAS_SEMANA.map(d => ({ id: d.id, etiqueta: d.nombre.slice(0, 3) }))
    ];

    contenedor.innerHTML = opciones.map(op => {
      const esActivo = (this.diaFiltroMovil === op.id);
      const clases = esActivo
        ? 'bg-[var(--notion-card)] text-[var(--notion-text)] border-[var(--notion-accent)] font-semibold shadow-xs'
        : 'bg-transparent text-[var(--notion-text-muted)] border-transparent hover:bg-[var(--notion-hover)] hover:text-[var(--notion-text)] font-medium';

      return `
        <button type="button"
                onclick="window.setDiaFiltroMovil('${op.id}')"
                class="px-2.5 py-1 rounded-md text-xs border transition cursor-pointer shrink-0 ${clases}">
          ${op.etiqueta}
        </button>
      `;
    }).join('');
  }

  setDiaFiltroMovil(diaId) {
    this.diaFiltroMovil = diaId;
    this.renderLienzoSemanal();
  }

  renderLienzoSemanal() {
    const contenedor = document.getElementById('grid-semana-canvases');
    if (!contenedor) return;

    this.actualizarSelectorDiasMovil();

    const diaActualId = this.obtenerDiaActualId();
    const diaEfectivo = (this.diaFiltroMovil === 'hoy') ? diaActualId : this.diaFiltroMovil;

    try {
      contenedor.innerHTML = DIAS_SEMANA.map(dia => {
        const bloques = (this.itinerario[dia.id] || []).filter(b => {
          if (this.materiaFiltro === 'todas') return true;
          return b.materiaCodigo === this.materiaFiltro;
        });

        let totalHorasDia = 0;
        try {
          totalHorasDia = calcularHorasDia(bloques);
        } catch (e) {
          console.warn('Error calculando horas para día ' + dia.id, e);
        }

        const esVisibleMovil = (this.diaFiltroMovil === 'todos') || (dia.id === diaEfectivo);
        const clasesColumna = esVisibleMovil ? 'flex' : 'hidden xl:flex';

        return `
          <div class="bg-[var(--notion-bg-sidebar)] border border-[var(--notion-border)] rounded-md flex-col min-h-[460px] ${clasesColumna}">
            <!-- Encabezado de Columna Board estilo Notion con Acción Rápida de Retraso -->
            <div class="p-2.5 border-b border-[var(--notion-border)] flex items-center justify-between">
              <div class="flex items-center gap-1.5">
                <span class="text-xs font-semibold text-[var(--notion-text)]">${dia.nombre}</span>
                <span class="text-xs font-mono px-1.5 py-0.5 rounded bg-[var(--notion-card)] text-[var(--notion-text-muted)] border border-[var(--notion-border)]">
                  ${Math.round(totalHorasDia * 10) / 10}h
                </span>
              </div>
              <div class="flex items-center gap-1">
                <button onclick="window.rodarHorarioDelDia('${dia.id}', 30)" class="px-1.5 py-0.5 rounded hover:bg-[var(--notion-hover)] text-[var(--notion-text-muted)] hover:text-amber-300 flex items-center gap-0.5 text-xs font-mono transition cursor-pointer" title="Retrasar 30 min todos los bloques pendientes de este día">
                  ⏳ +30m
                </button>
                <button onclick="window.abrirModalAgregarBloque('${dia.id}')" class="w-5 h-5 rounded hover:bg-[var(--notion-hover)] text-[var(--notion-text-muted)] hover:text-[var(--notion-text)] flex items-center justify-center text-xs transition cursor-pointer" title="Añadir bloque a ${dia.nombre}">
                  +
                </button>
              </div>
            </div>

            <!-- Lista de Tarjetas del Día (Zona de Soltado / Dropzone) -->
            <div class="p-2 space-y-2 flex-1 overflow-y-auto max-h-[520px] scrollbar-thin columna-dia-dropzone transition-colors duration-150"
                 data-dia-id="${dia.id}"
                 ondragover="window.permitirArrastre(event)"
                 ondragleave="window.salirArrastre(event)"
                 ondrop="window.soltarBloque(event, '${dia.id}')">
              ${bloques.length === 0 ? `
                <div class="py-12 text-center text-xs text-[var(--notion-text-muted)] italic pointer-events-none">
                  Sin actividades (arrastra una casilla aquí)
                </div>
              ` : bloques.map(b => {
                try {
                  return this.renderTarjetaBloque(b, dia.id);
                } catch (errCard) {
                  console.error('Error renderizando tarjeta:', errCard);
                  return '';
                }
              }).join('')}
            </div>

            <!-- Pie de Columna: Botón Añadir -->
            <div class="p-1.5 border-t border-[var(--notion-border)]">
              <button onclick="window.abrirModalAgregarBloque('${dia.id}')" type="button" class="w-full py-1 px-2 rounded text-xs text-[var(--notion-text-muted)] hover:text-[var(--notion-text)] hover:bg-[var(--notion-hover)] transition flex items-center gap-1 cursor-pointer">
                <span>+</span>
                <span>Nuevo</span>
              </button>
            </div>
          </div>
        `;
      }).join('');
    } catch (errGrid) {
      console.error('Error renderizando tablero semanal:', errGrid);
    }

    try {
      if (window.lucide?.createIcons) window.lucide.createIcons();
    } catch {}
  }

  renderBibliotecaLibros() {
    const contenedorGrid = document.getElementById('grid-libros-gratuitos');
    const estadoVacio = document.getElementById('estado-vacio-libros');
    if (!contenedorGrid) return;

    const busqueda = (this.busquedaLibros || '').toLowerCase().trim();
    const filtroMateria = this.filtroMateriaLibros || 'todas';

    // Actualizar estilo visual de las píldoras de materia
    const pildoras = document.querySelectorAll('.pildora-filtro-libro');
    pildoras.forEach(btn => {
      const mat = btn.getAttribute('data-materia');
      if (mat === filtroMateria) {
        btn.className = 'pildora-filtro-libro px-3 py-1.5 rounded-md text-xs font-semibold border transition cursor-pointer bg-[var(--notion-card)] text-[var(--notion-text)] border-[var(--notion-accent)] shadow-xs';
      } else {
        btn.className = 'pildora-filtro-libro px-3 py-1.5 rounded-md text-xs font-medium border transition cursor-pointer bg-transparent text-[var(--notion-text-muted)] border-transparent hover:bg-[var(--notion-hover)] hover:text-[var(--notion-text)]';
      }
    });

    const libros = BANCO_LIBROS_GRATUITOS || [];
    const librosFiltrados = libros.filter(libro => {
      if (filtroMateria !== 'todas' && libro.materiaCodigo !== filtroMateria) {
        return false;
      }
      if (busqueda) {
        const matchTitulo = (libro.titulo || '').toLowerCase().includes(busqueda);
        const matchAutor = (libro.autor || '').toLowerCase().includes(busqueda);
        const matchDesc = (libro.descripcion || '').toLowerCase().includes(busqueda);
        const matchBadge = (libro.badge || '').toLowerCase().includes(busqueda);
        const matchMateria = (libro.materiaCodigo || '').toLowerCase().includes(busqueda);
        const matchTemas = (libro.temasClave || []).some(t => t.toLowerCase().includes(busqueda));
        return matchTitulo || matchAutor || matchDesc || matchBadge || matchMateria || matchTemas;
      }
      return true;
    });

    if (librosFiltrados.length === 0) {
      contenedorGrid.innerHTML = '';
      if (estadoVacio) estadoVacio.classList.remove('hidden');
      return;
    }

    if (estadoVacio) estadoVacio.classList.add('hidden');

    contenedorGrid.innerHTML = librosFiltrados.map(libro => {
      const tagEstilo = this.obtenerEstiloTagNotion(libro.materiaCodigo);
      const temasHtml = (libro.temasClave || []).map(t => `
        <span class="px-2 py-0.5 rounded text-xs font-mono bg-[var(--notion-bg)] text-[var(--notion-text-muted)] border border-[var(--notion-border)]">
          #${t}
        </span>
      `).join('');

      const tituloEscapado = (libro.titulo || '').replace(/'/g, "\\'");

      return `
        <div class="bg-[var(--notion-bg-sidebar)] border border-[var(--notion-border)] rounded-lg p-4 sm:p-5 flex flex-col justify-between hover:border-[var(--notion-accent)]/60 hover:shadow-lg transition-all duration-200 group">
          <div class="space-y-3">
            <!-- Cabecera de la Tarjeta con Badges -->
            <div class="flex items-center justify-between gap-2 flex-wrap">
              <span class="px-2.5 py-0.5 rounded text-xs font-semibold uppercase tracking-wider" style="background-color: ${tagEstilo.bg}; color: ${tagEstilo.text};">
                ${libro.icono} ${libro.materiaCodigo} • ${tagEstilo.label}
              </span>
              <span class="px-2 py-0.5 rounded-full text-xs font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
                ${libro.badge}
              </span>
            </div>

            <!-- Título y Autor -->
            <div class="space-y-1">
              <h3 class="text-base font-bold text-[var(--notion-text)] leading-snug group-hover:text-sky-400 transition-colors">
                ${libro.titulo}
              </h3>
              <p class="text-xs text-[var(--notion-text-muted)] flex items-center gap-1.5 flex-wrap">
                <span>✍️ <strong>${libro.autor}</strong></span>
                <span>•</span>
                <span class="font-mono">${libro.paginas}</span>
                <span>•</span>
                <span>${libro.idioma}</span>
              </p>
            </div>

            <!-- Nivel y Formato -->
            <div class="p-2 rounded bg-[var(--notion-card)] border border-[var(--notion-border)] flex items-center justify-between text-xs text-[var(--notion-text-muted)]">
              <span class="truncate">Nivel: <strong class="text-[var(--notion-text)]">${libro.nivel}</strong></span>
              <span class="text-sky-400 font-mono shrink-0">${libro.formato}</span>
            </div>

            <!-- Descripción Pedagógica -->
            <p class="text-sm text-[var(--notion-text-muted)] leading-relaxed">
              ${libro.descripcion}
            </p>

            <!-- Temas Clave -->
            <div class="flex flex-wrap gap-1.5 pt-1">
              ${temasHtml}
            </div>
          </div>

          <!-- Acciones Inferiores -->
          <div class="pt-4 mt-4 border-t border-[var(--notion-border)] flex items-center justify-between gap-2 flex-wrap">
            <a href="${libro.urlLectura}"
               target="_blank"
               rel="noopener noreferrer"
               class="flex-1 py-2 px-3 rounded-md bg-[var(--notion-accent)] hover:opacity-90 text-white font-medium text-xs flex items-center justify-center gap-1.5 transition shadow-sm cursor-pointer"
               title="Abrir libro gratuito en nueva pestaña">
              <span>📖</span>
              <span>Leer Gratis Online</span>
              <span>↗</span>
            </a>

            <button type="button"
                    onclick="window.iniciarSesionEnfoqueConLibro('${libro.materiaCodigo}', '${tituloEscapado}')"
                    class="py-2 px-3 rounded-md bg-[var(--notion-card)] hover:bg-[var(--notion-hover)] border border-[var(--notion-border)] text-[var(--notion-text)] text-xs font-medium flex items-center gap-1 transition cursor-pointer"
                    title="Iniciar sesión Pomodoro de 25 minutos con este libro">
              <span>⏱️</span>
              <span>Estudiar (Focus)</span>
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  renderTarjetaBloque(bloque, diaId) {
    const tag = this.obtenerEstiloTagNotion(bloque.materiaCodigo);
    const completado = Boolean(bloque.completado);
    const bitacora = bitacoraVoz.obtenerPorBloque(diaId, bloque.id);
    const tieneBitacora = Boolean(bitacora && (bitacora.aprendido || bitacora.mejorar || bitacora.audioData));

    const esMateriaAcademica = ['MAT-ING', 'SIS-ARQ', 'GEO-EST', 'ORA-CAS', 'ING-TEC', 'ECO-DIG'].includes(bloque.materiaCodigo);

    if (bloque.cancelado) {
      return `
        <div class="notion-item-card p-2.5 opacity-50 space-y-1">
          <div class="flex items-center justify-between text-xs font-mono text-[var(--notion-text-muted)]">
            <span class="line-through">${bloque.inicio} - ${bloque.fin}</span>
            <span class="text-rose-400 font-sans">⚡ Corte</span>
          </div>
          <p class="text-xs text-[var(--notion-text-muted)] line-through truncate">${bloque.tema || tag.label}</p>
        </div>
      `;
    }

    return `
      <div class="notion-item-card p-2.5 space-y-2 group cursor-grab active:cursor-grabbing transition-all hover:shadow-md"
           draggable="true"
           data-dia-id="${diaId}"
           data-bloque-id="${bloque.id}"
           ondragstart="window.iniciarArrastreBloque(event, '${diaId}', '${bloque.id}')"
           ondragend="window.finalizarArrastreBloque(event)">

        <!-- Fila Superior: Horario Interactivo y Tag Pastel Notion -->
        <div class="flex items-center justify-between gap-1">
          <button onclick="window.abrirModalAjustarHorario('${diaId}', '${bloque.id}')" 
                  type="button" 
                  class="text-xs font-mono text-[var(--notion-text-muted)] hover:text-sky-400 hover:underline flex items-center gap-1 cursor-pointer transition text-left"
                  title="Click para ajustar horario o retrasar este bloque">
            <span>🕒 ${bloque.inicio} - ${bloque.fin}</span>
          </button>
          <span class="text-xs font-medium px-1.5 py-0.5 rounded select-none" style="background-color: ${tag.bg}; color: ${tag.text};">
            ${tag.label}
          </span>
        </div>

        <!-- Título del Tema -->
        <div class="space-y-0.5">
          <h4 class="text-xs sm:text-sm font-medium text-[var(--notion-text)] leading-snug ${completado ? 'line-through opacity-60' : ''}">
            ${bloque.tema || 'Sesión de Estudio'}
          </h4>
        </div>

        <!-- Etiqueta de Bitácora Registrada si existe -->
        ${tieneBitacora ? `
          <div class="pt-0.5">
            <button onclick="window.abrirModalBitacora('${diaId}', '${bloque.id}')" type="button" class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs font-medium bg-amber-500/10 text-amber-300 border border-amber-500/30 hover:bg-amber-500/20 transition cursor-pointer max-w-full" title="Ver o editar reflexión grabada">
              <span>🎙️</span>
              <span class="truncate">${bitacora.mejorar ? 'Duda: ' + bitacora.mejorar : 'Bitácora guardada'}</span>
            </button>
          </div>
        ` : ''}

        <!-- Fila Inferior: Checkbox Inline y Acciones Interactivas -->
        <div class="pt-1.5 border-t border-[var(--notion-border)] flex items-center justify-between text-xs">
          <label class="flex items-center gap-1.5 cursor-pointer select-none">
            <input 
              type="checkbox" 
              class="notion-checkbox" 
              onchange="window.toggleCompletarBloque('${diaId}', '${bloque.id}')"
              ${completado ? 'checked' : ''}>
            <span class="text-xs ${completado ? 'text-emerald-400 font-medium' : 'text-[var(--notion-text-muted)]'}">
              ${completado ? 'Hecho' : 'Pendiente'}
            </span>
          </label>

          <div class="flex items-center gap-1">
            <!-- Botón de Retraso Rápido +30m -->
            <button onclick="window.retrasarBloque('${diaId}', '${bloque.id}', 30)" 
                    type="button"
                    class="px-1.5 py-0.5 rounded hover:bg-amber-500/10 text-[var(--notion-text-muted)] hover:text-amber-300 text-xs font-mono transition cursor-pointer" 
                    title="Retrasar sesión 30 minutos (+30m)">
              +30m
            </button>
            <!-- Mover a Mañana -->
            <button onclick="window.moverBloqueADiaSiguiente('${diaId}', '${bloque.id}')" 
                    type="button"
                    class="p-1 rounded hover:bg-[var(--notion-hover)] text-[var(--notion-text-muted)] hover:text-sky-300 text-xs transition cursor-pointer" 
                    title="Mover al día siguiente">
              ➡️
            </button>
            <button onclick="window.abrirModalBitacora('${diaId}', '${bloque.id}')" class="p-1 rounded hover:bg-[var(--notion-hover)] ${tieneBitacora ? 'text-amber-400' : 'text-[var(--notion-text-muted)]'} hover:text-amber-400 text-xs transition cursor-pointer" title="Grabar o ver bitácora de conclusión (voz)">
              🎙️
            </button>
            ${esMateriaAcademica ? `
              <button onclick="window.abrirLibrosDeMateria('${bloque.materiaCodigo}')" class="p-1 rounded hover:bg-[var(--notion-hover)] text-[var(--notion-text-muted)] hover:text-sky-300 text-xs transition cursor-pointer" title="Ver libros gratuitos de esta materia">
                📚
              </button>
              <button onclick="window.abrirGuiaDeMateria('${bloque.materiaCodigo}')" class="p-1 rounded hover:bg-[var(--notion-hover)] text-[var(--notion-text-muted)] hover:text-[var(--notion-text)] text-xs transition cursor-pointer" title="Ver temas de esta materia">
                📖
              </button>
            ` : ''}
            <button onclick="window.abrirModalAjustarHorario('${diaId}', '${bloque.id}')" class="p-1 rounded hover:bg-[var(--notion-hover)] text-[var(--notion-text-muted)] hover:text-[var(--notion-text)] text-xs transition cursor-pointer" title="Editar horario y detalles">
              ✏️
            </button>
            <button onclick="window.eliminarBloqueManual('${diaId}', '${bloque.id}')" class="p-1 rounded hover:bg-[var(--notion-hover)] text-[var(--notion-text-muted)] hover:text-red-400 text-xs transition cursor-pointer" title="Eliminar bloque">
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
        <!-- Callout Box Notion de Resumen -->
        <div class="notion-callout flex items-start gap-3">
          <span class="text-lg">📊</span>
          <div class="space-y-1">
            <div class="flex items-center gap-2">
              <h3 class="text-sm font-semibold text-[var(--notion-text)]">Balance y Proyección Mensual</h3>
              <span class="text-xs px-2 py-0.5 rounded bg-[var(--notion-card)] border border-[var(--notion-border)] font-mono text-[var(--notion-text-muted)]">
                Meta Mensual: ~${metricas.totalMeta * 4}h
              </span>
            </div>
            <p class="text-xs text-[var(--notion-text-muted)] leading-relaxed">
              Distribución de horas programadas por asignatura y proyección acumulada a 4 semanas.
            </p>
          </div>
        </div>

        <!-- Callout Box Notion de Resumen de Bitácoras de Voz -->
        <div class="notion-callout flex items-start justify-between gap-3">
          <div class="flex items-start gap-3">
            <span class="text-lg">🎙️</span>
            <div class="space-y-1">
              <div class="flex items-center gap-2">
                <h3 class="text-sm font-semibold text-[var(--notion-text)]">Bitácoras y Registro de Dudas</h3>
                <span class="text-xs px-2 py-0.5 rounded bg-[var(--notion-card)] border border-[var(--notion-border)] font-mono text-amber-400">
                  ${bitacoraVoz.contarBitacoras()} reflexiones
                </span>
              </div>
              <p class="text-xs text-[var(--notion-text-muted)] leading-relaxed">
                Conclusiones grabadas tras cada bloque de estudio para que el Asistente adapte tus repasos y resuelva tus dudas.
              </p>
            </div>
          </div>
          <button onclick="window.abrirModalListaBitacoras()" type="button" class="px-2.5 py-1.5 rounded-md bg-[var(--notion-card)] hover:bg-[var(--notion-hover)] border border-[var(--notion-border)] text-xs text-[var(--notion-text)] shrink-0 flex items-center gap-1.5 cursor-pointer">
            <span>Ver Todas</span>
          </button>
        </div>

        <!-- Tabla estilo Notion Database Table View -->
        <div class="bg-[var(--notion-card)] border border-[var(--notion-border)] rounded-md overflow-hidden">
          <table class="w-full text-left text-xs sm:text-sm">
            <thead class="bg-[var(--notion-bg-sidebar)] text-xs text-[var(--notion-text-muted)] font-medium border-b border-[var(--notion-border)]">
              <tr>
                <th class="p-3">Asignatura</th>
                <th class="p-3">Meta Semanal</th>
                <th class="p-3">Proyección Mensual</th>
                <th class="p-3">Asignadas</th>
                <th class="p-3">Afectadas</th>
                <th class="p-3">Bitácoras</th>
                <th class="p-3">Cumplimiento</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-[var(--notion-border)]">
              ${metricas.materias.map(m => {
                const tag = this.obtenerEstiloTagNotion(m.codigo);
                const numBits = bitacoraVoz.obtenerPorMateria(m.codigo).length;
                return `
                  <tr class="hover:bg-[var(--notion-hover)] transition">
                    <td class="p-3">
                      <span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-medium" style="background-color: ${tag.bg}; color: ${tag.text};">
                        <span>${m.nombre}</span>
                        <span class="text-xs opacity-75 font-mono">(${m.codigo})</span>
                      </span>
                    </td>
                    <td class="p-3 font-mono text-[var(--notion-text-muted)]">${m.metaSemanal}h</td>
                    <td class="p-3 font-mono text-[var(--notion-text)]">${m.metaSemanal * 4}h</td>
                    <td class="p-3 font-mono font-medium text-[var(--notion-text)]">${m.horasProgramadas}h</td>
                    <td class="p-3 font-mono text-amber-400">${m.horasPerdidas}h</td>
                    <td class="p-3">
                      <span class="font-mono text-xs ${numBits > 0 ? 'text-amber-400 font-semibold' : 'text-[var(--notion-text-muted)]'}">
                        ${numBits > 0 ? `🎙️ ${numBits}` : '—'}
                      </span>
                    </td>
                    <td class="p-3">
                      <div class="flex items-center gap-2">
                        <div class="w-20 bg-[var(--notion-border)] h-1.5 rounded-full overflow-hidden">
                          <div class="h-full bg-emerald-500 rounded-full" style="width: ${m.porcentajeCumplimiento}%;"></div>
                        </div>
                        <span class="text-xs font-mono text-[var(--notion-text-muted)]">${m.porcentajeCumplimiento}%</span>
                      </div>
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>

        <!-- Historial de Contingencias (Notion List View) -->
        <div class="bg-[var(--notion-bg-sidebar)] border border-[var(--notion-border)] rounded-md p-4 space-y-3">
          <div class="flex items-center justify-between">
            <h4 class="text-xs font-semibold text-[var(--notion-text)] uppercase tracking-wider">
              Registro de Contingencias
            </h4>
            <span class="text-xs text-[var(--notion-text-muted)] font-mono">${this.historialEventos.length} reportadas</span>
          </div>

          ${this.historialEventos.length === 0 ? `
            <p class="text-xs text-[var(--notion-text-muted)] italic py-2 text-center">No hay interrupciones reportadas esta semana.</p>
          ` : `
            <div class="space-y-1.5">
              ${this.historialEventos.slice(-5).reverse().map(ev => `
                <div class="p-2 rounded bg-[var(--notion-card)] border border-[var(--notion-border)] flex items-center justify-between text-xs">
                  <div class="flex items-center gap-2">
                    <span>⚡</span>
                    <span class="font-medium text-[var(--notion-text)]">${ev.motivo}</span>
                    <span class="text-[var(--notion-text-muted)]">• ${ev.dia.toUpperCase()} (${ev.horaInicio} - ${ev.horaFin})</span>
                  </div>
                  <span class="font-mono text-amber-400">-${ev.horasPerdidasTotal}h</span>
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
        <div class="p-3 rounded-md ${resultado.desbordeMensualHoras === 0 ? 'bg-emerald-950/40 border border-emerald-500/40 text-emerald-300' : 'bg-amber-950/40 border border-amber-500/40 text-amber-300'} text-xs sm:text-sm font-semibold">
          ${resultado.mensaje}
        </div>

        <div class="space-y-2">
          <span class="text-xs font-semibold text-[var(--notion-text)] uppercase tracking-wider block">Acciones de Redistribución Aplicadas:</span>
          <div class="space-y-1.5 max-h-60 overflow-y-auto scrollbar-thin">
            ${resultado.logAcciones.map(a => `
              <div class="p-2.5 rounded-md bg-[var(--notion-card)] border border-[var(--notion-border)] flex items-center justify-between text-xs">
                <div>
                  <span class="font-medium text-[var(--notion-text)]">${a.materiaNombre}</span>
                  <span class="text-[var(--notion-text-muted)] block">${a.diaDestino.toUpperCase()} • ${a.horario}</span>
                </div>
                <span class="font-mono font-bold text-emerald-400">+${a.duracion}h</span>
              </div>
            `).join('')}
          </div>
        </div>

        ${resultado.planMensual ? `
          <div class="p-3 bg-[var(--notion-card)] rounded-md border border-[var(--notion-border)] text-xs text-[var(--notion-text-muted)]">
            <strong class="text-[var(--notion-text)]">Plan de Amortización Mensual:</strong> ${resultado.planMensual.recomendacion}
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
    let acabaDeCompletar = false;
    this.itinerario[diaId] = this.itinerario[diaId].map(b => {
      if (b.id === bloqueId) {
        const nuevoEstado = !b.completado;
        if (nuevoEstado) acabaDeCompletar = true;
        return { ...b, completado: nuevoEstado };
      }
      return b;
    });
    this.guardarItinerario();
    this.renderKPIs();
    this.renderVista();

    if (acabaDeCompletar) {
      const bit = bitacoraVoz.obtenerPorBloque(diaId, bloqueId);
      if (!bit) {
        setTimeout(() => this.abrirModalBitacora(diaId, bloqueId), 150);
      }
    }
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
    if (confirm(`¿Restablecer el itinerario de la Semana ${this.semanaActiva} al plan oficial? Se borrarán las modificaciones manuales de esta semana.`)) {
      const semanaData = (PLAN_MENSUAL_SEMANAS && PLAN_MENSUAL_SEMANAS[this.semanaActiva]) 
        ? PLAN_MENSUAL_SEMANAS[this.semanaActiva].dias 
        : ITINERARIO_BASE_SEMANAL;
      this.itinerario = JSON.parse(JSON.stringify(semanaData));
      this.guardarItinerario();
      this.renderKPIs();
      this.renderVista();
    }
  }

  // ==============================================================
  // MÉTODOS DE INTERACTIVIDAD: ARRASTRE, RETRASO, AJUSTE DE HORARIO
  // ==============================================================

  moverBloqueADia(bloqueId, diaOrigen, diaDestino) {
    if (!this.itinerario[diaOrigen] || !this.itinerario[diaDestino]) return;
    if (diaOrigen === diaDestino) return;
    const idx = this.itinerario[diaOrigen].findIndex(b => b.id === bloqueId);
    if (idx === -1) return;
    const [bloque] = this.itinerario[diaOrigen].splice(idx, 1);
    this.itinerario[diaDestino].push(bloque);
    this.itinerario[diaDestino].sort((a, b) => a.inicio.localeCompare(b.inicio));
    this.guardarItinerario();
    this.renderKPIs();
    this.renderVista();
    const diaNombre = (DIAS_SEMANA.find(d => d.id === diaDestino) || {}).nombre || diaDestino;
    this.mostrarToast(`Bloque movido a ${diaNombre}`, 'mover');
  }

  retrasarBloque(diaId, bloqueId, minutos) {
    if (!this.itinerario[diaId]) return;
    const bloque = this.itinerario[diaId].find(b => b.id === bloqueId);
    if (!bloque) return;
    const iniMin = timeToMinutes(bloque.inicio);
    const finMin = timeToMinutes(bloque.fin);
    bloque.inicio = minutesToTime(iniMin + minutos);
    bloque.fin = minutesToTime(finMin + minutos);
    this.itinerario[diaId].sort((a, b) => a.inicio.localeCompare(b.inicio));
    this.guardarItinerario();
    this.renderKPIs();
    this.renderVista();
    this.mostrarToast(`Retrasado ${minutos} minutos`, 'retraso');
  }

  rodarHorarioDelDia(diaId, minutos) {
    if (!this.itinerario[diaId]) return;
    const pendientes = this.itinerario[diaId].filter(b => !b.completado && !b.cancelado);
    if (pendientes.length === 0) {
      this.mostrarToast('Sin bloques pendientes para retrasar', 'info');
      return;
    }
    pendientes.forEach(b => {
      b.inicio = minutesToTime(timeToMinutes(b.inicio) + minutos);
      b.fin = minutesToTime(timeToMinutes(b.fin) + minutos);
    });
    this.itinerario[diaId].sort((a, b) => a.inicio.localeCompare(b.inicio));
    this.guardarItinerario();
    this.renderKPIs();
    this.renderVista();
    this.mostrarToast(`${pendientes.length} bloques retrasados +${minutos}m`, 'retraso');
  }

  moverBloqueADiaSiguiente(diaId, bloqueId) {
    if (!this.itinerario[diaId]) return;
    const idxDia = DIAS_SEMANA.findIndex(d => d.id === diaId);
    if (idxDia === -1) return;
    const diaDestino = (idxDia < DIAS_SEMANA.length - 1)
      ? DIAS_SEMANA[idxDia + 1].id
      : DIAS_SEMANA[0].id;
    if (!this.itinerario[diaDestino]) this.itinerario[diaDestino] = [];
    this.moverBloqueADia(bloqueId, diaId, diaDestino);
  }

  abrirModalAjustarHorario(diaId, bloqueId) {
    this.bloqueAjusteActivo = { diaId, bloqueId };
    const bloque = (this.itinerario[diaId] || []).find(b => b.id === bloqueId);
    if (!bloque) return;

    const modal = document.getElementById('modal-ajustar-horario');
    const lblSub = document.getElementById('lbl-ajustar-horario-sub');
    const inputInicio = document.getElementById('form-ajustar-inicio');
    const inputFin = document.getElementById('form-ajustar-fin');
    const selectDia = document.getElementById('form-ajustar-dia');
    const inputTema = document.getElementById('form-ajustar-tema');

    if (lblSub) lblSub.textContent = `${bloque.materiaCodigo} • ${bloque.tema || 'Sesión'}`;
    if (inputInicio) inputInicio.value = bloque.inicio;
    if (inputFin) inputFin.value = bloque.fin;
    if (selectDia) selectDia.value = diaId;
    if (inputTema) inputTema.value = bloque.tema || '';

    if (modal) {
      modal.classList.remove('hidden');
      modal.classList.add('flex');
    }
  }

  cerrarModalAjustarHorario() {
    const modal = document.getElementById('modal-ajustar-horario');
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
    this.bloqueAjusteActivo = null;
  }

  guardarAjusteHorarioForm() {
    if (!this.bloqueAjusteActivo) return;
    const { diaId: diaOrig, bloqueId } = this.bloqueAjusteActivo;

    const bloque = (this.itinerario[diaOrig] || []).find(b => b.id === bloqueId);
    if (!bloque) return;

    const nuevoInicio = document.getElementById('form-ajustar-inicio')?.value || bloque.inicio;
    const nuevoFin = document.getElementById('form-ajustar-fin')?.value || bloque.fin;
    const nuevoDia = document.getElementById('form-ajustar-dia')?.value || diaOrig;
    const nuevoTema = document.getElementById('form-ajustar-tema')?.value || '';

    bloque.inicio = nuevoInicio;
    bloque.fin = nuevoFin;
    if (nuevoTema.trim()) bloque.tema = nuevoTema.trim();

    // Si cambió el día, mover el bloque
    if (nuevoDia !== diaOrig) {
      if (!this.itinerario[nuevoDia]) this.itinerario[nuevoDia] = [];
      this.itinerario[diaOrig] = this.itinerario[diaOrig].filter(b => b.id !== bloqueId);
      this.itinerario[nuevoDia].push(bloque);
    }

    this.itinerario[nuevoDia]?.sort((a, b) => a.inicio.localeCompare(b.inicio));
    this.guardarItinerario();
    this.cerrarModalAjustarHorario();
    this.renderKPIs();
    this.renderVista();
    this.mostrarToast('Horario actualizado', 'guardar');
  }

  aplicarRetrasoRapidoModal(minutos) {
    if (!this.bloqueAjusteActivo) return;
    const { diaId, bloqueId } = this.bloqueAjusteActivo;

    const bloque = (this.itinerario[diaId] || []).find(b => b.id === bloqueId);
    if (!bloque) return;

    bloque.inicio = minutesToTime(timeToMinutes(bloque.inicio) + minutos);
    bloque.fin = minutesToTime(timeToMinutes(bloque.fin) + minutos);

    // Actualizar campos del modal
    const inputInicio = document.getElementById('form-ajustar-inicio');
    const inputFin = document.getElementById('form-ajustar-fin');
    if (inputInicio) inputInicio.value = bloque.inicio;
    if (inputFin) inputFin.value = bloque.fin;

    this.guardarItinerario();
    this.renderKPIs();
    this.renderVista();
    this.mostrarToast(`Retraso rápido +${minutos}m aplicado`, 'retraso');
  }

  moverBloqueModalDiaSiguiente() {
    if (!this.bloqueAjusteActivo) return;
    const { diaId, bloqueId } = this.bloqueAjusteActivo;
    this.cerrarModalAjustarHorario();
    this.moverBloqueADiaSiguiente(diaId, bloqueId);
  }

  eliminarBloqueModalAjuste() {
    if (!this.bloqueAjusteActivo) return;
    const { diaId, bloqueId } = this.bloqueAjusteActivo;
    const bloque = (this.itinerario[diaId] || []).find(b => b.id === bloqueId);
    const nombre = bloque?.tema || 'esta sesión';
    if (!confirm(`¿Eliminar "${nombre}" del horario?`)) return;
    this.cerrarModalAjustarHorario();
    this.eliminarBloqueManual(diaId, bloqueId);
    this.mostrarToast('Sesión eliminada', 'info');
  }

  mostrarToast(mensaje, tipo = 'info') {
    const toast = document.getElementById('toast-notificacion-flotante');
    const iconoEl = document.getElementById('toast-icono');
    const mensajeEl = document.getElementById('toast-mensaje');
    if (!toast || !mensajeEl) return;

    const iconos = { mover: '➡️', retraso: '⏳', guardar: '✅', info: 'ℹ️' };
    if (iconoEl) iconoEl.textContent = iconos[tipo] || '✨';
    mensajeEl.textContent = mensaje;

    // Si ya hay un timeout activo, cancelarlo para reiniciar el contador
    if (this._toastTimeout) clearTimeout(this._toastTimeout);

    toast.classList.remove('translate-y-12', 'opacity-0', 'pointer-events-none');
    toast.classList.add('translate-y-0', 'opacity-100');

    this._toastTimeout = setTimeout(() => {
      toast.classList.add('translate-y-12', 'opacity-0', 'pointer-events-none');
      toast.classList.remove('translate-y-0', 'opacity-100');
    }, 2500);
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
    const titulo = document.getElementById('form-nodo-titulo')?.value || '';
    const descripcion = document.getElementById('form-nodo-fundamento')?.value || '';

    if (!titulo.trim()) {
      alert('Por favor escribe un título para el tema a investigar.');
      return;
    }

    this.arbolManager.agregarTemaManual(matCod, {
      titulo,
      descripcion
    });

    const inputTit = document.getElementById('form-nodo-titulo');
    const inputDesc = document.getElementById('form-nodo-fundamento');
    if (inputTit) inputTit.value = '';
    if (inputDesc) inputDesc.value = '';

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
      this.mostrarToast('¡Cronograma copiado al portapapeles en Markdown!', '📋');
    }).catch(() => {
      const blob = new Blob([md], { type: 'text/markdown' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `itinerario_estudio_${new Date().toISOString().slice(0, 10)}.md`;
      a.click();
    });
  }

  // ==============================================================
  // MÉTODOS DE EXPORTACIÓN GOOGLE DOCS & SINCRONIZACIÓN IA
  // ==============================================================

  generarMarkdownParaDocs() {
    const ahora = new Date();
    const diasSemanaMap = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];
    const diaActualId = diasSemanaMap[ahora.getDay()];
    const diaObj = DIAS_SEMANA.find(d => d.id === diaActualId) || { nombre: diaActualId };

    const fechaFormateada = ahora.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    const horaActual = `${String(ahora.getHours()).padStart(2, '0')}:${String(ahora.getMinutes()).padStart(2, '0')}`;
    const horaMinutosActual = timeToMinutes(horaActual);

    const metricas = calcularMetricasSemanales(this.itinerario, obtenerTodasLasMaterias());
    const bloquesHoy = this.itinerario[diaActualId] || [];

    // Detectar bloque en curso en tiempo real
    let bloqueEnCurso = null;
    let proximoBloque = null;

    bloquesHoy.forEach(b => {
      const bIni = timeToMinutes(b.inicio);
      const bFin = timeToMinutes(b.fin);
      if (horaMinutosActual >= bIni && horaMinutosActual < bFin) {
        bloqueEnCurso = b;
      } else if (bIni > horaMinutosActual && (!proximoBloque || bIni < timeToMinutes(proximoBloque.inicio))) {
        proximoBloque = b;
      }
    });

    let md = `# CONTROL Y SEGUIMIENTO DIARIO DE ESTUDIO • AXIOM\n\n`;
    md += `**Fecha de Sincronización:** ${fechaFormateada.charAt(0).toUpperCase() + fechaFormateada.slice(1)}\n`;
    md += `**Hora Exacta del Sistema:** \`${horaActual}\` | **Día:** **${diaObj.nombre.toUpperCase()}**\n\n`;

    md += `---\n\n`;
    md += `## ⏱️ ESTADO EN TIEMPO REAL (AHORA MISMO)\n\n`;
    if (bloqueEnCurso) {
      const tag = this.obtenerEstiloTagNotion(bloqueEnCurso.materiaCodigo);
      md += `> **👉 EN CURSO AHORA (${bloqueEnCurso.inicio} a ${bloqueEnCurso.fin}):**\n`;
      md += `> **Materia:** \`[${bloqueEnCurso.materiaCodigo}]\` ${tag.label}\n`;
      md += `> **Tema Objetivo:** ${bloqueEnCurso.tema || 'Sesión de Estudio'}\n`;
      md += `> **Estado:** ${bloqueEnCurso.completado ? '✅ Ya completado' : '⏳ En desarrollo activo'}\n\n`;
    } else if (proximoBloque) {
      const tag = this.obtenerEstiloTagNotion(proximoBloque.materiaCodigo);
      md += `> **☕ Momento de descanso / transición.**\n`;
      md += `> **Próximo bloque:** \`[${proximoBloque.materiaCodigo}]\` ${tag.label} a las **${proximoBloque.inicio}** (${proximoBloque.tema || 'Estudio'}).\n\n`;
    } else {
      md += `> **🏁 No hay más bloques activos programados para hoy.** Jornada de estudio finalizada o día de descanso.\n\n`;
    }

    md += `## 📅 ITINERARIO ACTIVO DE HOY (${diaObj.nombre.toUpperCase()})\n\n`;
    if (bloquesHoy.length === 0) {
      md += `*Sin actividades programadas para hoy.*\n\n`;
    } else {
      md += `| Horario | Materia | Tema / Actividad | Duración | Estado |\n`;
      md += `| :--- | :--- | :--- | :--- | :--- |\n`;
      bloquesHoy.forEach(b => {
        const tag = this.obtenerEstiloTagNotion(b.materiaCodigo);
        let estadoTxt = '[ ] Pendiente';
        if (b.completado) estadoTxt = '[✅ Hecho]';
        else if (bloqueEnCurso && bloqueEnCurso.id === b.id) estadoTxt = '[⏳ En curso]';
        else if (b.cancelado) estadoTxt = '[⚡ Corte Luz]';

        md += `| \`${b.inicio} - ${b.fin}\` | \`[${b.materiaCodigo}]\` ${tag.label} | ${b.tema || 'Sesión'} | ${b.duracion}h | ${estadoTxt} |\n`;
      });
      md += `\n`;
    }

    md += `---\n\n`;
    md += `## 📊 BALANCE SEMANAL Y CUMPLIMIENTO (SEMANA ${this.semanaActiva || 1})\n\n`;
    md += `- **Meta Semanal:** **${metricas.totalMeta}h**\n`;
    md += `- **Horas Completadas:** **${metricas.totalCompletado}h** (${metricas.porcentajeGlobal}% de la meta)\n`;
    md += `- **Horas Restantes por Completar:** **${Math.max(0, Math.round((metricas.totalMeta - metricas.totalCompletado) * 10) / 10)}h**\n`;
    md += `- **Total Horas Programadas en Horario:** ${metricas.totalProgramado}h\n\n`;

    md += `## ⚡ HISTORIAL DE CONTINGENCIAS Y CORTES DE LUZ\n\n`;
    if (!this.historialEventos || this.historialEventos.length === 0) {
      md += `*Sin contingencias reportadas en esta sesión.*\n\n`;
    } else {
      this.historialEventos.forEach((ev, idx) => {
        md += `- **Evento #${idx + 1}:** ${ev.motivo || 'Interrupción'} en día **${(ev.dia || '').toUpperCase()}** (${ev.horaInicio} a ${ev.horaFin}). Rebalanceo aplicado.\n`;
      });
      md += `\n`;
    }

    md += `## 🎙️ ÚLTIMA BITÁCORA Y REFLEXIÓN REGISTRADA\n\n`;
    const todasBitacoras = bitacoraVoz.obtenerTodas();
    if (todasBitacoras.length === 0) {
      md += `*Aún no se han grabado bitácoras de voz en esta semana.*\n\n`;
    } else {
      const ultima = todasBitacoras[0];
      md += `- **Sesión:** \`[${ultima.materiaCodigo || 'MAT'}]\` ${ultima.diaId ? ultima.diaId.toUpperCase() : ''}\n`;
      if (ultima.aprendido) md += `- **Lo que se dominó:** ${ultima.aprendido}\n`;
      if (ultima.mejorar) md += `- **Duda / Punto a reforzar:** ${ultima.mejorar}\n`;
      if (ultima.gusto) md += `- **Aspecto positivo:** ${ultima.gusto}\n`;
      md += `\n`;
    }

    md += `## 📋 HORARIO SEMANAL COMPLETO (LUNES A DOMINGO)\n\n`;
    DIAS_SEMANA.forEach(d => {
      md += `### ${d.nombre.toUpperCase()}\n`;
      const bloques = this.itinerario[d.id] || [];
      if (bloques.length === 0) {
        md += `*Sin actividades*\n\n`;
      } else {
        bloques.forEach(b => {
          const tag = this.obtenerEstiloTagNotion(b.materiaCodigo);
          const st = b.completado ? '✅ Hecho' : (b.cancelado ? '⚡ Corte' : 'Pendiente');
          md += `- \`${b.inicio} - ${b.fin}\` (${b.duracion}h) | **[${b.materiaCodigo}]** ${b.tema} | *${st}*\n`;
        });
        md += `\n`;
      }
    });

    md += `---\n*Documento Maestro de Gestión Operativa • Generado por AXIOM & MIGATO 2026*\n`;
    return md;
  }

  abrirModalExportarDocs() {
    const modal = document.getElementById('modal-exportar-docs');
    const textarea = document.getElementById('textarea-exportar-docs-markdown');
    const preview = document.getElementById('preview-estado-actual-docs');
    const inputWebhook = document.getElementById('input-webhook-gdrive-url');

    const md = this.generarMarkdownParaDocs();
    if (textarea) textarea.value = md;

    // Resumen dinámico en el preview superior
    const ahora = new Date();
    const horaActual = `${String(ahora.getHours()).padStart(2, '0')}:${String(ahora.getMinutes()).padStart(2, '0')}`;
    const diasSemanaMap = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];
    const diaActualId = diasSemanaMap[ahora.getDay()];
    const bloquesHoy = this.itinerario[diaActualId] || [];
    const bloqueEnCurso = bloquesHoy.find(b => {
      const ini = timeToMinutes(b.inicio);
      const fin = timeToMinutes(b.fin);
      const act = timeToMinutes(horaActual);
      return act >= ini && act < fin;
    });

    if (preview) {
      if (bloqueEnCurso) {
        preview.innerHTML = `
          <div class="flex items-center justify-between text-emerald-400 font-medium">
            <span>⏱️ Bloque Activo Ahora (${horaActual}):</span>
            <span class="font-mono">${bloqueEnCurso.inicio} - ${bloqueEnCurso.fin}</span>
          </div>
          <p class="text-[var(--notion-text)] font-semibold">${bloqueEnCurso.tema || 'Sesión de Estudio'} <span class="font-mono text-xs opacity-75">([${bloqueEnCurso.materiaCodigo}])</span></p>
        `;
      } else {
        preview.innerHTML = `
          <div class="flex items-center justify-between text-[var(--notion-text-muted)]">
            <span>⏱️ Hora actual del sistema: <strong class="text-[var(--notion-text)] font-mono">${horaActual}</strong></span>
            <span class="text-xs">Sin bloque activo en este minuto</span>
          </div>
        `;
      }
    }

    // Cargar URL de Webhook guardada
    const webhookGuardado = localStorage.getItem('axiom_gdrive_webhook_url') || '';
    if (inputWebhook) inputWebhook.value = webhookGuardado;

    if (modal) {
      modal.classList.remove('hidden');
      modal.classList.add('flex');
    }
  }

  cerrarModalExportarDocs() {
    const modal = document.getElementById('modal-exportar-docs');
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
  }

  copiarExportacionDocsMarkdown() {
    const textarea = document.getElementById('textarea-exportar-docs-markdown');
    const md = textarea ? textarea.value : this.generarMarkdownParaDocs();
    navigator.clipboard.writeText(md).then(() => {
      this.mostrarToast('¡Formato Google Docs copiado al portapapeles!', '📋');
    }).catch(err => {
      console.error('Error al copiar:', err);
      this.mostrarToast('Error copiando. Selecciona el texto manualmente.', '⚠️');
    });
  }

  descargarExportacionDocsMarkdown() {
    const md = this.generarMarkdownParaDocs();
    const fecha = new Date().toISOString().slice(0, 10);
    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `cronograma_seguimiento_estudio_${fecha}.md`;
    a.click();
    this.mostrarToast('Archivo Markdown descargado con éxito', '⬇️');
  }

  toggleConfiguracionWebhookDocs() {
    const cont = document.getElementById('contenedor-config-webhook-docs');
    if (cont) {
      cont.classList.toggle('hidden');
    }
  }

  guardarWebhookGDriveUrl() {
    const input = document.getElementById('input-webhook-gdrive-url');
    if (!input) return;
    const url = input.value.trim();
    localStorage.setItem('axiom_gdrive_webhook_url', url);
    this.mostrarToast('URL de Webhook de Google Drive guardada', '✅');
  }

  async sincronizarConGoogleDriveWebhook() {
    const webhookUrl = localStorage.getItem('axiom_gdrive_webhook_url');
    if (!webhookUrl) {
      this.toggleConfiguracionWebhookDocs();
      alert('Por favor configura primero la URL del Webhook de Google Apps Script.');
      return;
    }

    const btn = document.getElementById('btn-sync-gdrive');
    const txtOriginal = btn ? btn.innerHTML : '';
    if (btn) btn.innerHTML = `<span>⏳</span><span>Sincronizando...</span>`;

    const md = this.generarMarkdownParaDocs();
    const metricas = calcularMetricasSemanales(this.itinerario, obtenerTodasLasMaterias());
    const payload = {
      markdown: md,
      fecha: new Date().toLocaleString('es-ES'),
      metricas: metricas,
      itinerario: this.itinerario
    };

    try {
      const resp = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload)
      });
      const data = await resp.json();
      if (data && data.ok) {
        this.mostrarToast('¡Sincronizado con Google Drive exitosamente!', '☁️');
        if (data.docUrl) {
          window.open(data.docUrl, '_blank');
        }
      } else {
        alert(`Error al sincronizar con Google Drive: ${data?.error || 'Respuesta desconocida'}`);
      }
    } catch (e) {
      console.error('Error enviando al Webhook:', e);
      this.mostrarToast('Error de red al conectar con el Webhook', '⚠️');
    } finally {
      if (btn) btn.innerHTML = txtOriginal;
    }
  }

  // ==============================================================
  // MÉTODOS DE RESPALDO Y PERSISTENCIA JSON (BACKUP & RESTORE)
  // ==============================================================

  abrirModalBackupJSON() {
    const modal = document.getElementById('modal-backup-json');
    if (modal) {
      modal.classList.remove('hidden');
      modal.classList.add('flex');
    }
  }

  cerrarModalBackupJSON() {
    const modal = document.getElementById('modal-backup-json');
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
  }

  exportarBackupCompletoJSON() {
    const backup = {
      version: '2.0.0',
      fechaExportacion: new Date().toISOString(),
      semanaActiva: this.semanaActiva || 1,
      semanas: {},
      bitacoras: bitacoraVoz.obtenerTodas(),
      watchlist: this.watchlist || [],
      historialEventos: this.historialEventos || []
    };

    for (let sem = 1; sem <= 4; sem++) {
      const key = `axiom_estudio_itinerario_semana_${sem}`;
      try {
        const data = localStorage.getItem(key);
        if (data) backup.semanas[sem] = JSON.parse(data);
        else if (sem === this.semanaActiva) backup.semanas[sem] = this.itinerario;
      } catch {}
    }

    const jsonStr = JSON.stringify(backup, null, 2);
    const fecha = new Date().toISOString().slice(0, 10);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `cronograma_estudio_backup_${fecha}.json`;
    a.click();

    this.mostrarToast('Respaldo JSON descargado con éxito', '💾');
    this.cerrarModalBackupJSON();
  }

  importarBackupDesdeArchivoJSON() {
    const input = document.getElementById('input-archivo-backup-json');
    if (!input || !input.files || input.files.length === 0) {
      alert('Por favor selecciona un archivo .json de respaldo.');
      return;
    }

    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const backup = JSON.parse(e.target.result);
        if (!backup.semanas && !backup.itinerarios && !backup.itinerario) {
          alert('El archivo no contiene un formato de respaldo válido de Cronograma de Estudio.');
          return;
        }

        // Restaurar semanas
        if (backup.semanas) {
          Object.keys(backup.semanas).forEach(sem => {
            const key = `axiom_estudio_itinerario_semana_${sem}`;
            localStorage.setItem(key, JSON.stringify(backup.semanas[sem]));
          });
        }

        // Restaurar semana activa
        if (backup.semanaActiva) {
          this.semanaActiva = backup.semanaActiva;
          localStorage.setItem('axiom_semana_activa', String(backup.semanaActiva));
        }

        // Restaurar bitacoras
        if (Array.isArray(backup.bitacoras)) {
          localStorage.setItem('axiom_bitacora_reflexiones', JSON.stringify(backup.bitacoras));
        }

        // Restaurar watchlist
        if (Array.isArray(backup.watchlist)) {
          this.watchlist = backup.watchlist;
          localStorage.setItem('axiom_watchlist_series', JSON.stringify(backup.watchlist));
        }

        // Restaurar historial de eventos
        if (Array.isArray(backup.historialEventos)) {
          this.historialEventos = backup.historialEventos;
          localStorage.setItem('axiom_historial_contingencias', JSON.stringify(backup.historialEventos));
        }

        // Recargar itinerario activo
        this.itinerario = this.cargarItinerario(this.semanaActiva);
        this.renderKPIs();
        this.renderVista();

        this.mostrarToast('¡Copia de seguridad restaurada exitosamente!', '🎉');
        this.cerrarModalBackupJSON();
      } catch (err) {
        console.error('Error parseando respaldo JSON:', err);
        alert('Error al leer el archivo JSON: archivo corrupto o formato no válido.');
      }
    };

    reader.readAsText(file);
  }

  // ==============================================================
  // MÉTODOS DE BITÁCORA DE CONCLÚSIONES Y VOZ
  // ==============================================================

  abrirModalBitacora(diaId, bloqueId) {
    this.bitacoraBloqueActivo = { diaId, bloqueId };
    const bloque = (this.itinerario[diaId] || []).find(b => b.id === bloqueId);
    if (!bloque) return;

    const modal = document.getElementById('modal-bitacora-voz');
    const lblSub = document.getElementById('lbl-bitacora-subtitulo');
    const txtAprendido = document.getElementById('form-bitacora-aprendido');
    const txtGusto = document.getElementById('form-bitacora-gusto');
    const txtMejorar = document.getElementById('form-bitacora-mejorar');
    const btnEliminar = document.getElementById('btn-eliminar-bitacora-modal');
    const audioContenedor = document.getElementById('contenedor-audio-grabado');
    const reproductor = document.getElementById('reproductor-audio-bitacora');

    const bitacora = bitacoraVoz.obtenerPorBloque(diaId, bloqueId) || {};

    if (lblSub) {
      lblSub.textContent = `${bloque.materiaCodigo} • ${bloque.tema || 'Sesión'} (${diaId.toUpperCase()} ${bloque.inicio} - ${bloque.fin})`;
    }

    if (txtAprendido) txtAprendido.value = bitacora.aprendido || '';
    if (txtGusto) txtGusto.value = bitacora.gusto || '';
    if (txtMejorar) txtMejorar.value = bitacora.mejorar || '';

    this.audioDataTemporal = bitacora.audioData || null;
    if (audioContenedor && reproductor) {
      if (this.audioDataTemporal) {
        reproductor.src = this.audioDataTemporal;
        audioContenedor.classList.remove('hidden');
      } else {
        reproductor.src = '';
        audioContenedor.classList.add('hidden');
      }
    }

    if (btnEliminar) {
      if (bitacora.id) {
        btnEliminar.classList.remove('hidden');
      } else {
        btnEliminar.classList.add('hidden');
      }
    }

    this.detenerGrabacionVozActiva();

    if (modal) {
      modal.classList.remove('hidden');
      modal.classList.add('flex');
    }
  }

  cerrarModalBitacora() {
    this.detenerGrabacionVozActiva();
    const modal = document.getElementById('modal-bitacora-voz');
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
  }

  guardarBitacoraModalActual() {
    if (!this.bitacoraBloqueActivo) return;
    const { diaId, bloqueId } = this.bitacoraBloqueActivo;
    const bloque = (this.itinerario[diaId] || []).find(b => b.id === bloqueId);
    if (!bloque) return;

    const aprendido = document.getElementById('form-bitacora-aprendido')?.value || '';
    const gusto = document.getElementById('form-bitacora-gusto')?.value || '';
    const mejorar = document.getElementById('form-bitacora-mejorar')?.value || '';

    bitacoraVoz.guardarBitacora(diaId, bloqueId, {
      materiaCodigo: bloque.materiaCodigo,
      tema: bloque.tema,
      horario: `${bloque.inicio} - ${bloque.fin}`,
      aprendido,
      gusto,
      mejorar,
      audioData: this.audioDataTemporal
    });

    this.cerrarModalBitacora();
    this.renderVista();
  }

  eliminarBitacoraModalActual() {
    if (!this.bitacoraBloqueActivo) return;
    if (confirm('¿Eliminar esta bitácora de conclusión?')) {
      const { diaId, bloqueId } = this.bitacoraBloqueActivo;
      bitacoraVoz.eliminarBitacora(diaId, bloqueId);
      this.cerrarModalBitacora();
      this.renderVista();
    }
  }

  copiarBitacoraModalMarkdown() {
    if (!this.bitacoraBloqueActivo) return;
    const { diaId, bloqueId } = this.bitacoraBloqueActivo;
    const bloque = (this.itinerario[diaId] || []).find(b => b.id === bloqueId);
    const aprendido = document.getElementById('form-bitacora-aprendido')?.value || '';
    const gusto = document.getElementById('form-bitacora-gusto')?.value || '';
    const mejorar = document.getElementById('form-bitacora-mejorar')?.value || '';

    const md = `### Bitácora de Conclusión • [${bloque?.materiaCodigo}] ${bloque?.tema || 'Sesión'}\n` +
      `- **Horario:** ${diaId.toUpperCase()} (${bloque?.inicio} - ${bloque?.fin})\n` +
      `- **¿Qué aprendí hoy?:** ${aprendido || '*(Sin especificar)*'}\n` +
      `- **¿Qué me gustó?:** ${gusto || '*(Sin especificar)*'}\n` +
      `- **¿Qué debemos mejorar / dudas?:** ${mejorar || '*(Sin observaciones)*'}\n`;

    navigator.clipboard.writeText(md).then(() => {
      alert('¡Bitácora copiada al portapapeles! Puedes enviarla al Asistente.');
    }).catch(() => {
      alert(md);
    });
  }

  iniciarDictadoCampo(campoId) {
    const el = document.getElementById(campoId);
    if (!el) return;

    const barra = document.getElementById('barra-estado-grabacion');
    const textoBarra = document.getElementById('texto-estado-grabacion');

    if (bitacoraVoz.grabandoVoz && this.campoDictadoActivo === campoId) {
      this.detenerGrabacionVozActiva();
      return;
    }

    this.campoDictadoActivo = campoId;
    const textoInicial = el.value ? el.value.trim() + ' ' : '';

    if (!bitacoraVoz.esSoportadoSpeechRecognition()) {
      el.focus();
      alert('Tu navegador no tiene activado el reconocimiento de voz por micrófono (Web Speech API). Puedes escribir tus conclusiones directamente en este recuadro.');
      return;
    }

    if (barra) {
      barra.classList.remove('hidden');
      barra.classList.add('flex');
    }
    if (textoBarra) {
      const mapa = {
        'form-bitacora-aprendido': '¿Qué aprendí hoy?',
        'form-bitacora-gusto': '¿Qué me gustó?',
        'form-bitacora-mejorar': '¿Qué podemos mejorar / dudas?'
      };
      textoBarra.textContent = `Escuchando voz para "${mapa[campoId] || campoId}"... Habla con tranquilidad.`;
    }

    bitacoraVoz.iniciarReconocimiento({
      onResultado: ({ completo }) => {
        el.value = textoInicial + completo;
      },
      onFinalizado: () => {
        if (barra) {
          barra.classList.add('hidden');
          barra.classList.remove('flex');
        }
        this.campoDictadoActivo = null;
      },
      onError: (err) => {
        console.warn('Error en dictado de voz:', err);
        if (barra) {
          barra.classList.add('hidden');
          barra.classList.remove('flex');
        }
        this.campoDictadoActivo = null;
      }
    });
  }

  detenerGrabacionVozActiva() {
    bitacoraVoz.detenerReconocimiento();
    const barra = document.getElementById('barra-estado-grabacion');
    if (barra) {
      barra.classList.add('hidden');
      barra.classList.remove('flex');
    }
    this.campoDictadoActivo = null;
  }

  async toggleGrabacionAudioBitacora() {
    const btn = document.getElementById('btn-toggle-grabacion-general');
    const lbl = document.getElementById('lbl-btn-grabacion-general');
    const reproductor = document.getElementById('reproductor-audio-bitacora');
    const audioContenedor = document.getElementById('contenedor-audio-grabado');

    if (bitacoraVoz.grabandoAudio) {
      if (lbl) lbl.textContent = 'Guardando...';
      const res = await bitacoraVoz.detenerGrabacionAudio();
      if (res && res.dataUrl) {
        this.audioDataTemporal = res.dataUrl;
        if (reproductor) reproductor.src = res.dataUrl;
        if (audioContenedor) audioContenedor.classList.remove('hidden');
      }
      if (lbl) lbl.textContent = 'Grabar Audio';
      if (btn) btn.classList.remove('bg-red-500/20', 'text-red-300');
    } else {
      const ok = await bitacoraVoz.iniciarGrabacionAudio({
        onInicio: () => {
          if (lbl) lbl.textContent = '⏹️ Detener Grabación';
          if (btn) btn.classList.add('bg-red-500/20', 'text-red-300');
        },
        onError: (err) => {
          alert('No se pudo acceder al micrófono para grabar audio. Verifica los permisos de tu navegador.');
          if (lbl) lbl.textContent = 'Grabar Audio';
        }
      });
    }
  }

  eliminarAudioBitacora() {
    this.audioDataTemporal = null;
    const reproductor = document.getElementById('reproductor-audio-bitacora');
    const audioContenedor = document.getElementById('contenedor-audio-grabado');
    if (reproductor) reproductor.src = '';
    if (audioContenedor) audioContenedor.classList.add('hidden');
  }

  abrirModalListaBitacoras() {
    const modal = document.getElementById('modal-lista-bitacoras');
    const cont = document.getElementById('contenido-lista-bitacoras');
    if (!modal || !cont) return;

    const todas = Object.values(bitacoraVoz.obtenerTodas());
    todas.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

    if (todas.length === 0) {
      cont.innerHTML = `
        <div class="py-12 text-center text-xs text-[var(--notion-text-muted)] space-y-2">
          <span class="text-3xl block">🎙️</span>
          <p class="font-medium text-[var(--notion-text)]">No tienes bitácoras de conclusión grabadas aún.</p>
          <p class="text-xs opacity-75">Al finalizar cualquier bloque de tu horario semanal, presiona el botón 🎙️ para registrar lo que aprendiste, lo que te gustó y tus dudas.</p>
        </div>
      `;
    } else {
      cont.innerHTML = todas.map(b => {
        const tag = this.obtenerEstiloTagNotion(b.materiaCodigo);
        return `
          <div class="p-3.5 rounded-md bg-[var(--notion-card)] border border-[var(--notion-border)] space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-xs font-medium px-2 py-0.5 rounded" style="background-color: ${tag.bg}; color: ${tag.text};">
                ${b.materiaCodigo} • ${tag.label}
              </span>
              <span class="text-xs font-mono text-[var(--notion-text-muted)]">
                ${b.diaId.toUpperCase()} • ${b.horario}
              </span>
            </div>

            <h4 class="text-xs sm:text-sm font-semibold text-[var(--notion-text)]">
              ${b.tema}
            </h4>

            <div class="space-y-1 text-xs pt-1 border-t border-[var(--notion-border)]">
              ${b.aprendido ? `<div><span class="font-medium text-[var(--notion-text)]">🧠 Aprendí:</span> <span class="text-[var(--notion-text-muted)]">${b.aprendido}</span></div>` : ''}
              ${b.gusto ? `<div><span class="font-medium text-[var(--notion-text)]">👍 Me gustó:</span> <span class="text-[var(--notion-text-muted)]">${b.gusto}</span></div>` : ''}
              ${b.mejorar ? `<div class="text-amber-400 font-medium"><span>🎯 Por mejorar / Dudas:</span> <span class="text-[var(--notion-text)]">${b.mejorar}</span></div>` : ''}
            </div>

            ${b.audioData ? `
              <div class="pt-2">
                <audio controls src="${b.audioData}" class="w-full h-7"></audio>
              </div>
            ` : ''}

            <div class="pt-1.5 flex items-center justify-end gap-2 text-xs">
              <button onclick="window.abrirModalBitacora('${b.diaId}', '${b.bloqueId}')" class="px-2 py-1 rounded hover:bg-[var(--notion-hover)] text-[var(--notion-text-muted)] hover:text-[var(--notion-text)] transition cursor-pointer">
                Editar Bitácora
              </button>
            </div>
          </div>
        `;
      }).join('');
    }

    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }

  cerrarModalListaBitacoras() {
    const modal = document.getElementById('modal-lista-bitacoras');
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
  }

  copiarTodasBitacorasMarkdown() {
    const res = bitacoraVoz.generarResumenParaAsistente();
    navigator.clipboard.writeText(res.textoMarkdown).then(() => {
      alert('¡Todas las bitácoras copiadas al portapapeles en formato Markdown! Puedes pegarlas aquí para que el Asistente las analice.');
    }).catch(() => {
      alert(res.textoMarkdown);
    });
  }

  // Temporizador de Enfoque (Focus Mode / Pomodoro)
  abrirModalTemporizador(materiaCodigo, temaTitulo) {
    this.timerMateriaCodigo = materiaCodigo || 'MAT-ING';
    this.timerTemaTitulo = temaTitulo || 'Sesión de Estudio';

    const modal = document.getElementById('modal-temporizador-enfoque');
    const labelMat = document.getElementById('timer-materia-label');
    const labelTema = document.getElementById('timer-tema-titulo');
    
    if (labelMat) {
      const cfg = MATERIAS_CONFIG.find(m => m.codigo === this.timerMateriaCodigo);
      labelMat.textContent = cfg ? cfg.nombre : this.timerMateriaCodigo;
    }
    if (labelTema) labelTema.textContent = this.timerTemaTitulo;

    this.ajustarDuracionTimer(25);
    if (modal) {
      modal.classList.remove('hidden');
      modal.classList.add('flex');
    }
  }

  cerrarModalTemporizador() {
    this.pausarTimerEnfoque();
    const modal = document.getElementById('modal-temporizador-enfoque');
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
  }

  ajustarDuracionTimer(minutos) {
    this.pausarTimerEnfoque();
    this.timerDuracionMinutos = minutos;
    this.timerSegundosRestantes = minutos * 60;
    this.actualizarTimerDisplay();
  }

  toggleTimerEnfoque() {
    if (this.timerCorriendo) {
      this.pausarTimerEnfoque();
    } else {
      this.iniciarTimerEnfoque();
    }
  }

  iniciarTimerEnfoque() {
    if (this.timerCorriendo) return;
    this.timerCorriendo = true;
    const btnLabel = document.getElementById('btn-timer-label');
    if (btnLabel) btnLabel.textContent = 'Pausar';
    const statusMsg = document.getElementById('timer-status-msg');
    if (statusMsg) statusMsg.textContent = '⏱️ Sesión activa. Concéntrate plenamente en el tema.';

    this.timerInterval = setInterval(() => {
      if (this.timerSegundosRestantes > 0) {
        this.timerSegundosRestantes--;
        this.actualizarTimerDisplay();
      } else {
        this.pausarTimerEnfoque();
        alert('🎉 ¡Tiempo cumplido! Excelente sesión de estudio. Es momento de registrar tu bitácora de conclusiones.');
        this.concluirSesionTimerYGrabar();
      }
    }, 1000);
  }

  pausarTimerEnfoque() {
    this.timerCorriendo = false;
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
    const btnLabel = document.getElementById('btn-timer-label');
    if (btnLabel) btnLabel.textContent = 'Reanudar';
    const statusMsg = document.getElementById('timer-status-msg');
    if (statusMsg) statusMsg.textContent = 'Sesión en pausa. Puedes reanudar cuando estés listo.';
  }

  reiniciarTimerEnfoque() {
    this.ajustarDuracionTimer(this.timerDuracionMinutos);
  }

  actualizarTimerDisplay() {
    const mins = Math.floor(this.timerSegundosRestantes / 60);
    const secs = this.timerSegundosRestantes % 60;
    const display = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    const el = document.getElementById('timer-display');
    if (el) el.textContent = display;
  }

  concluirSesionTimerYGrabar() {
    const tema = this.timerTemaTitulo;
    const mat = this.timerMateriaCodigo;
    this.cerrarModalTemporizador();

    const diaHoy = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'][new Date().getDay()] || 'lunes';
    const diaKey = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'].includes(diaHoy) ? diaHoy : 'lunes';
    const bloqueDia = (this.itinerario[diaKey] || []).find(b => b.materiaCodigo === mat) || { id: `b_custom_${Date.now()}` };
    
    this.abrirModalBitacora(diaKey, bloqueDia.id);
    
    const inputTema = document.getElementById('bitacora-input-tema');
    if (inputTema && tema) {
      inputTema.textContent = tema;
    }
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

// Interactividad Drag & Drop
window.iniciarArrastreBloque = (event, diaId, bloqueId) => {
  event.dataTransfer.setData('text/plain', JSON.stringify({ diaId, bloqueId }));
  event.dataTransfer.effectAllowed = 'move';
  event.currentTarget.classList.add('opacity-50');
};
window.finalizarArrastreBloque = (event) => {
  event.currentTarget.classList.remove('opacity-50');
  document.querySelectorAll('.columna-dia-dropzone').forEach(el => {
    el.classList.remove('bg-[var(--notion-accent)]/10', 'border-[var(--notion-accent)]/40');
  });
};
window.permitirArrastre = (event) => {
  event.preventDefault();
  event.dataTransfer.dropEffect = 'move';
  event.currentTarget.classList.add('bg-[var(--notion-accent)]/10', 'border-[var(--notion-accent)]/40');
};
window.salirArrastre = (event) => {
  event.currentTarget.classList.remove('bg-[var(--notion-accent)]/10', 'border-[var(--notion-accent)]/40');
};
window.soltarBloque = (event, diaDestino) => {
  event.preventDefault();
  event.currentTarget.classList.remove('bg-[var(--notion-accent)]/10', 'border-[var(--notion-accent)]/40');
  document.querySelectorAll('.columna-dia-dropzone').forEach(el => {
    el.classList.remove('bg-[var(--notion-accent)]/10', 'border-[var(--notion-accent)]/40');
  });
  const datos = event.dataTransfer.getData('text/plain');
  if (!datos) return;
  try {
    const { diaId, bloqueId } = JSON.parse(datos);
    app.moverBloqueADia(bloqueId, diaId, diaDestino);
  } catch (e) {
    console.warn('Error al procesar soltar bloque:', e);
  }
};

// Interactividad de Retraso y Movimiento Rápido
window.retrasarBloque = (diaId, bloqueId, minutos) => app.retrasarBloque(diaId, bloqueId, minutos);
window.rodarHorarioDelDia = (diaId, minutos) => app.rodarHorarioDelDia(diaId, minutos);
window.moverBloqueADiaSiguiente = (diaId, bloqueId) => app.moverBloqueADiaSiguiente(diaId, bloqueId);

// Modal de Ajuste de Horario
window.abrirModalAjustarHorario = (diaId, bloqueId) => app.abrirModalAjustarHorario(diaId, bloqueId);
window.cerrarModalAjustarHorario = () => app.cerrarModalAjustarHorario();
window.guardarAjusteHorarioForm = () => app.guardarAjusteHorarioForm();
window.aplicarRetrasoRapidoModal = (minutos) => app.aplicarRetrasoRapidoModal(minutos);
window.moverBloqueModalDiaSiguiente = () => app.moverBloqueModalDiaSiguiente();
window.eliminarBloqueModalAjuste = () => app.eliminarBloqueModalAjuste();

// Métodos de Bitácora y Voz en Window
window.abrirModalBitacora = (dia, id) => app.abrirModalBitacora(dia, id);
window.cerrarModalBitacora = () => app.cerrarModalBitacora();
window.guardarBitacoraModalActual = () => app.guardarBitacoraModalActual();
window.eliminarBitacoraModalActual = () => app.eliminarBitacoraModalActual();
window.copiarBitacoraModalMarkdown = () => app.copiarBitacoraModalMarkdown();
window.iniciarDictadoCampo = (campo) => app.iniciarDictadoCampo(campo);
window.detenerGrabacionVozActiva = () => app.detenerGrabacionVozActiva();
window.toggleGrabacionAudioBitacora = () => app.toggleGrabacionAudioBitacora();
window.eliminarAudioBitacora = () => app.eliminarAudioBitacora();
window.abrirModalListaBitacoras = () => app.abrirModalListaBitacoras();
window.cerrarModalListaBitacoras = () => app.cerrarModalListaBitacoras();
window.copiarTodasBitacorasMarkdown = () => app.copiarTodasBitacorasMarkdown();

// Métodos del Temporizador de Enfoque en Window
window.abrirModalTemporizador = (mat, tema) => app.abrirModalTemporizador(mat, tema);
window.cerrarModalTemporizador = () => app.cerrarModalTemporizador();
window.ajustarDuracionTimer = (mins) => app.ajustarDuracionTimer(mins);
window.toggleTimerEnfoque = () => app.toggleTimerEnfoque();
window.reiniciarTimerEnfoque = () => app.reiniciarTimerEnfoque();
window.concluirSesionTimerYGrabar = () => app.concluirSesionTimerYGrabar();

// Métodos de Watchlist (Series & Cine) en Window
window.abrirModalWatchlist = () => app.abrirModalWatchlist();
window.cerrarModalWatchlist = () => app.cerrarModalWatchlist();
window.filtrarWatchlist = (f) => app.filtrarWatchlist(f);
window.toggleFormNuevaSerie = () => app.toggleFormNuevaSerie();
window.guardarNuevoTituloWatchlist = () => app.guardarNuevoTituloWatchlist();
window.avanzarCapitulo = (id) => app.avanzarCapitulo(id);
window.cambiarEstadoObra = (id, st) => app.cambiarEstadoObra(id, st);
window.eliminarObraWatchlist = (id) => app.eliminarObraWatchlist(id);

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
  const materiasValidas = ['MAT-ING', 'SIS-ARQ', 'GEO-EST', 'ORA-CAS', 'ING-TEC', 'ECO-DIG', 'OCI-LIB'];
  const codDestino = materiasValidas.includes(materiaCod) ? materiaCod : 'MAT-ING';
  app.cambiarVista('guias');
  app.arbolManager.setMateria(codDestino);
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

// Bindings para Exportación Google Docs & Asistente IA
window.abrirModalExportarDocs = () => app.abrirModalExportarDocs();
window.cerrarModalExportarDocs = () => app.cerrarModalExportarDocs();
window.copiarExportacionDocsMarkdown = () => app.copiarExportacionDocsMarkdown();
window.descargarExportacionDocsMarkdown = () => app.descargarExportacionDocsMarkdown();
window.toggleConfiguracionWebhookDocs = () => app.toggleConfiguracionWebhookDocs();
window.guardarWebhookGDriveUrl = () => app.guardarWebhookGDriveUrl();
window.sincronizarConGoogleDriveWebhook = () => app.sincronizarConGoogleDriveWebhook();

// Bindings para Respaldo y Restauración JSON
window.abrirModalBackupJSON = () => app.abrirModalBackupJSON();
window.cerrarModalBackupJSON = () => app.cerrarModalBackupJSON();
window.exportarBackupCompletoJSON = () => app.exportarBackupCompletoJSON();
window.importarBackupDesdeArchivoJSON = () => app.importarBackupDesdeArchivoJSON();

// Bindings para Banco de Libros Gratuitos y Filtro Móvil
window.setDiaFiltroMovil = (diaId) => app.setDiaFiltroMovil(diaId);

window.filtrarLibrosPorBusqueda = (val) => {
  app.busquedaLibros = val;
  app.renderBibliotecaLibros();
};

window.filtrarLibrosPorMateria = (cod) => {
  app.filtroMateriaLibros = cod;
  app.renderBibliotecaLibros();
};

window.restablecerFiltrosLibros = () => {
  app.filtroMateriaLibros = 'todas';
  app.busquedaLibros = '';
  const input = document.getElementById('input-busqueda-libros');
  if (input) input.value = '';
  app.renderBibliotecaLibros();
};

window.iniciarSesionEnfoqueConLibro = (materiaCod, titulo) => {
  app.abrirModalTemporizador(materiaCod, `Lectura: ${titulo}`);
};

window.abrirLibrosDeMateria = (materiaCod) => {
  app.cambiarVista('biblioteca');
  app.filtroMateriaLibros = materiaCod;
  app.renderBibliotecaLibros();
};

// Bindings para Sincronización Celular y Recordatorios Nativos (.ICS)
window.abrirModalSincronizarCelular = function() {
  const modal = document.getElementById('modal-sincronizar-celular');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
};

window.cerrarModalSincronizarCelular = function() {
  const modal = document.getElementById('modal-sincronizar-celular');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
};

window.copiarUrlMovil = function() {
  const url = window.location.hostname.includes('github.io')
    ? 'https://diegodona36-netizen.github.io/cronograma-estudio/'
    : (window.location.origin + window.location.pathname);
  if (navigator.clipboard) {
    navigator.clipboard.writeText(url).then(() => {
      alert('✅ Enlace copiado al portapapeles: ' + url);
    }).catch(() => {
      prompt('Copie el enlace para su teléfono:', url);
    });
  } else {
    prompt('Copie el enlace para su teléfono:', url);
  }
};

window.descargarCalendarioICS = function() {
  window.location.href = 'horario_estudio_notion_axiom.ics';
};

window.solicitarPermisoNotificaciones = function() {
  if (!("Notification" in window)) {
    alert("Este navegador no soporta notificaciones de escritorio.");
    return;
  }
  Notification.requestPermission().then(permission => {
    if (permission === "granted") {
      new Notification("🔔 Recordatorios AXIOM Activados", {
        body: "Te notificaremos cuando inicie cada uno de tus bloques de estudio.",
        icon: "../assets/logo-migato.png"
      });
      const btn = document.getElementById('btn-permiso-notif');
      if (btn) {
        btn.textContent = '✅ Avisos Activos';
        btn.classList.add('bg-emerald-900', 'text-emerald-300');
      }
    } else {
      alert("Permiso de notificaciones denegado en el navegador.");
    }
  });
};

// Arranque
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => app.init());
} else {
  app.init();
}
