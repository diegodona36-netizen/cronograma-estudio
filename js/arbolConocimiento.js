/**
 * MIGATO • Módulo de Árbol de Conocimiento en 3 Niveles (Axiomas, Conceptos, Detalles)
 * Renderizador de Guías de Estudio estilo Notion con Toggles y Criterios Epistémicos
 * Conducción: José Gregorio 'El Gato' Briceño | Comisión Técnica MIGATO
 */

import {
  GUIAS_CONOCIMIENTO_3_NIVELES,
  MATERIAS_CONFIG,
  obtenerTodasLasGuias,
  obtenerTodasLasMaterias,
  guardarGuiaPersonalizada
} from './estudioData.js';

export class ArbolConocimientoManager {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.materiaActivaCodigo = 'SIS-OPSEC';
    this.progresoNodos = this.cargarProgreso();
    this.filtroNivel = 'todos'; // 'todos' | 'axiomas' | 'conceptos' | 'detalles'
  }

  cargarProgreso() {
    try {
      const guardado = localStorage.getItem('axiom_estudio_progreso_nodos');
      return guardado ? JSON.parse(guardado) : {};
    } catch {
      return {};
    }
  }

  guardarProgreso() {
    try {
      localStorage.setItem('axiom_estudio_progreso_nodos', JSON.stringify(this.progresoNodos));
    } catch (e) {
      console.warn('Error al guardar progreso en localStorage:', e);
    }
  }

  setMateria(materiaCodigo) {
    this.materiaActivaCodigo = materiaCodigo;
    this.render();
  }

  setFiltroNivel(nivel) {
    this.filtroNivel = nivel;
    this.render();
  }

  toggleEstadoNodo(nodoId) {
    const estados = ['por_iniciar', 'en_estudio', 'dominado'];
    const actual = this.progresoNodos[nodoId]?.estado || 'por_iniciar';
    const nextIdx = (estados.indexOf(actual) + 1) % estados.length;
    const nuevoEstado = estados[nextIdx];

    if (!this.progresoNodos[nodoId]) this.progresoNodos[nodoId] = {};
    this.progresoNodos[nodoId].estado = nuevoEstado;
    this.progresoNodos[nodoId].fechaActualizacion = new Date().toISOString();

    this.guardarProgreso();
    this.render();
  }

  toggleChecklist(nodoId, checkIdx) {
    if (!this.progresoNodos[nodoId]) this.progresoNodos[nodoId] = { checks: {} };
    if (!this.progresoNodos[nodoId].checks) this.progresoNodos[nodoId].checks = {};

    const prev = Boolean(this.progresoNodos[nodoId].checks[checkIdx]);
    this.progresoNodos[nodoId].checks[checkIdx] = !prev;

    this.guardarProgreso();
    this.render();
  }

  agregarNodoManual(materiaCodigo, datos) {
    const todasLasGuias = obtenerTodasLasGuias();
    let guia = todasLasGuias[materiaCodigo];

    if (!guia) {
      const mat = obtenerTodasLasMaterias().find(m => m.codigo === materiaCodigo);
      guia = {
        materiaCodigo,
        titulo: mat ? mat.nombre : materiaCodigo,
        descripcion: `Guía de ${materiaCodigo}`,
        axiomas: [],
        gruposConceptos: []
      };
    }

    if (datos.tipo === 'axioma') {
      const nuevoAx = {
        id: `ax_${materiaCodigo.toLowerCase()}_${Date.now()}`,
        titulo: datos.titulo || 'Nuevo Axioma',
        enunciado: datos.enunciado || datos.fundamento || '',
        porQueFundamental: datos.fundamento || 'Principio basal irreducible.',
        criteriosDominio: (datos.criterios || '').split('\n').filter(Boolean),
        ejemploUniversal: datos.ejemploUniversal || '',
        ejemploVenezuela: datos.ejemploVenezuela || '',
        gruposConceptosIds: []
      };
      if (!Array.isArray(guia.axiomas)) guia.axiomas = [];
      guia.axiomas.push(nuevoAx);
    } else if (datos.tipo === 'concepto') {
      if (!Array.isArray(guia.gruposConceptos) || guia.gruposConceptos.length === 0) {
        guia.gruposConceptos = [{
          id: `cc_${materiaCodigo.toLowerCase()}_01`,
          nombre: 'Estructuras Conceptuales',
          axiomasPadreIds: [],
          conceptos: [],
          detalles: []
        }];
      }
      const nuevoConc = {
        id: `c_${materiaCodigo.toLowerCase()}_${Date.now()}`,
        nombre: datos.titulo || 'Nuevo Concepto',
        definicion: datos.enunciado || '',
        analogia: datos.fundamento || ''
      };
      guia.gruposConceptos[0].conceptos.push(nuevoConc);
    } else if (datos.tipo === 'detalle') {
      if (!Array.isArray(guia.gruposConceptos) || guia.gruposConceptos.length === 0) {
        guia.gruposConceptos = [{
          id: `cc_${materiaCodigo.toLowerCase()}_01`,
          nombre: 'Estructuras Conceptuales',
          axiomasPadreIds: [],
          conceptos: [],
          detalles: []
        }];
      }
      const nuevoDet = {
        id: `det_${materiaCodigo.toLowerCase()}_${Date.now()}`,
        conceptoId: `c_${materiaCodigo.toLowerCase()}_01`,
        tipo: 'procedimiento',
        titulo: datos.titulo || 'Nuevo Detalle',
        contenido: datos.enunciado || '',
        notas: datos.fundamento || ''
      };
      guia.gruposConceptos[0].detalles.push(nuevoDet);
    }

    guardarGuiaPersonalizada(materiaCodigo, guia);
    this.render();
  }

  render() {
    if (!this.container) return;

    const todasLasGuias = obtenerTodasLasGuias();
    const todasLasMaterias = obtenerTodasLasMaterias();

    const guia = todasLasGuias[this.materiaActivaCodigo];
    const matConfig = todasLasMaterias.find(m => m.codigo === this.materiaActivaCodigo) || {
      nombre: this.materiaActivaCodigo,
      colorHex: '#38bdf8'
    };

    if (!guia) {
      this.container.innerHTML = `
        <div class="p-8 text-center text-slate-400 space-y-3">
          <div class="w-12 h-12 rounded-2xl bg-[#140e40] border border-[#2d1f85] flex items-center justify-center mx-auto text-xl">
            📚
          </div>
          <h3 class="text-base font-bold text-white">Guía de Estudio en Construcción</h3>
          <p class="text-sm text-slate-400 max-w-md mx-auto">
            El árbol de conocimiento para <strong>${matConfig.nombre}</strong> está siendo generado. Puedes utilizar el asistente Gemini para crear sus axiomas basales.
          </p>
          <button onclick="window.solicitarGeneracionAxiomasGemini('${this.materiaActivaCodigo}')" class="px-4 py-2 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 text-white text-sm font-bold shadow-md hover:from-sky-500 hover:to-indigo-500 transition cursor-pointer">
            ✨ Generar Árbol de Axiomas con Gemini
          </button>
        </div>
      `;
      return;
    }

    // Calcular estadísticas de la guía
    let totalAxiomas = (guia.axiomas || []).length;
    let axiomasDominados = (guia.axiomas || []).filter(a => this.progresoNodos[a.id]?.estado === 'dominado').length;

    let totalConceptos = 0;
    (guia.gruposConceptos || []).forEach(gc => {
      totalConceptos += (gc.conceptos || []).length;
    });

    let totalDetalles = 0;
    (guia.gruposConceptos || []).forEach(gc => {
      totalDetalles += (gc.detalles || []).length;
    });

    this.container.innerHTML = `
      <!-- Cabecera de la Guía de Estudio -->
      <div class="p-4 sm:p-6 bg-[#140e40]/90 border-b border-[#2d1f85] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div class="flex items-center gap-2 mb-1">
            <span class="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-[#1d1554] border border-[#2d1f85]" style="color: ${matConfig.colorHex}">
              ${guia.materiaCodigo}
            </span>
            <span class="text-xs text-slate-400 font-semibold uppercase tracking-wider">
              Metodología de Primeros Principios
            </span>
          </div>
          <h2 class="text-lg sm:text-xl font-black text-white tracking-wide">
            ${guia.titulo}
          </h2>
          <p class="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
            ${guia.descripcion}
          </p>
        </div>

        <!-- Indicador de Dominio Axiomático -->
        <div class="flex items-center gap-3 bg-[#0e092e] px-4 py-3 rounded-2xl border border-[#2d1f85] shrink-0">
          <div class="text-right">
            <span class="text-xs text-slate-400 block font-semibold">Dominio Axiomático</span>
            <span class="text-base font-black text-amber-300 font-mono">${axiomasDominados} / ${totalAxiomas} Axiomas</span>
          </div>
          <div class="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold text-sm">
            ${totalAxiomas > 0 ? Math.round((axiomasDominados / totalAxiomas) * 100) : 0}%
          </div>
        </div>
      </div>

      <!-- Barra de Filtro de Profundidad (Axiomas / Conceptos / Detalles) -->
      <div class="px-4 sm:px-6 py-2.5 bg-[#100b33] border-b border-[#2d1f85] flex flex-wrap items-center justify-between gap-2 text-xs">
        <div class="flex items-center gap-1.5">
          <span class="text-slate-400 font-bold mr-1">Filtrar Capa:</span>
          <button onclick="window.arbolManager.setFiltroNivel('todos')" class="px-3 py-1 rounded-lg font-bold transition cursor-pointer ${this.filtroNivel === 'todos' ? 'bg-[#23176d] text-white border border-sky-400/50' : 'text-slate-400 hover:text-white bg-[#140e40]'}">
            Todo (${totalAxiomas + totalConceptos + totalDetalles})
          </button>
          <button onclick="window.arbolManager.setFiltroNivel('axiomas')" class="px-3 py-1 rounded-lg font-bold transition cursor-pointer ${this.filtroNivel === 'axiomas' ? 'bg-sky-950 text-sky-300 border border-sky-500' : 'text-slate-400 hover:text-sky-300 bg-[#140e40]'}">
            🔷 Axiomas (${totalAxiomas})
          </button>
          <button onclick="window.arbolManager.setFiltroNivel('conceptos')" class="px-3 py-1 rounded-lg font-bold transition cursor-pointer ${this.filtroNivel === 'conceptos' ? 'bg-amber-950 text-amber-300 border border-amber-500' : 'text-slate-400 hover:text-amber-300 bg-[#140e40]'}">
            🔶 Conceptos (${totalConceptos})
          </button>
          <button onclick="window.arbolManager.setFiltroNivel('detalles')" class="px-3 py-1 rounded-lg font-bold transition cursor-pointer ${this.filtroNivel === 'detalles' ? 'bg-emerald-950 text-emerald-300 border border-emerald-500' : 'text-slate-400 hover:text-emerald-300 bg-[#140e40]'}">
            🔸 Detalles (${totalDetalles})
          </button>
        </div>

        <button onclick="window.abrirModalNuevoNodo('${this.materiaActivaCodigo}')" class="px-3 py-1 rounded-lg bg-[#18114a] hover:bg-[#23176d] border border-[#2d1f85] text-sky-300 hover:text-white font-bold flex items-center gap-1 transition cursor-pointer">
          <span>➕ Añadir Nodo / Apunte</span>
        </button>
      </div>

      <!-- Contenedor del Árbol Epistémico Ramificado -->
      <div class="p-4 sm:p-6 space-y-6 overflow-y-auto max-h-[calc(100vh-280px)] scrollbar-thin">
        ${this.renderSeccionAxiomas(guia.axiomas || [])}
        ${this.renderSeccionGruposConceptos(guia.gruposConceptos || [])}
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();
  }

  renderSeccionAxiomas(axiomas) {
    if (this.filtroNivel === 'conceptos' || this.filtroNivel === 'detalles') return '';

    return `
      <div class="space-y-3">
        <div class="flex items-center gap-2">
          <span class="w-3 h-3 rounded-md bg-sky-400 shadow-sm shadow-sky-400/50"></span>
          <h3 class="text-sm font-black text-sky-200 tracking-wider uppercase">
            Nivel 1: Axiomas Basales (Verdades Fundamentales Inamovibles)
          </h3>
          <span class="text-xs text-slate-400 font-mono">(${axiomas.length})</span>
        </div>

        <div class="space-y-3">
          ${axiomas.map(ax => this.renderTarjetaAxioma(ax)).join('')}
        </div>
      </div>
    `;
  }

  renderTarjetaAxioma(ax) {
    const estado = this.progresoNodos[ax.id]?.estado || 'por_iniciar';
    const badgeColor = {
      por_iniciar: 'bg-slate-800 text-slate-300 border-slate-700',
      en_estudio: 'bg-amber-950/80 text-amber-300 border-amber-600/50',
      dominado: 'bg-emerald-950/80 text-emerald-300 border-emerald-500/50'
    }[estado];

    const labelEstado = {
      por_iniciar: '⚪ Por iniciar',
      en_estudio: '🟡 En estudio activo',
      dominado: '🟢 Axioma dominado'
    }[estado];

    const checksGuardados = this.progresoNodos[ax.id]?.checks || {};

    return `
      <div class="bg-[#140e40] border border-[#2d1f85] rounded-2xl p-4 sm:p-5 transition hover:border-sky-500/50 shadow-md space-y-3.5">
        <!-- Encabezado del Axioma -->
        <div class="flex items-start justify-between gap-3">
          <div class="space-y-1 min-w-0">
            <div class="flex items-center gap-2">
              <span class="text-xs font-mono font-bold text-sky-400 bg-sky-950/60 px-2 py-0.5 rounded border border-sky-800/40">
                ${ax.id}
              </span>
              <h4 class="text-base font-black text-white leading-snug">
                ${ax.titulo}
              </h4>
            </div>
            <p class="text-sm text-sky-100 font-semibold italic bg-[#0e092e]/80 p-2.5 rounded-xl border border-sky-900/30">
              «${ax.enunciado}»
            </p>
          </div>

          <!-- Selector de Estado de Dominio -->
          <button onclick="window.arbolManager.toggleEstadoNodo('${ax.id}')" class="px-2.5 py-1 rounded-xl text-xs font-bold border transition cursor-pointer shrink-0 ${badgeColor}" title="Clic para alternar estado de dominio">
            ${labelEstado}
          </button>
        </div>

        <!-- Por qué es fundamental -->
        <div class="text-xs sm:text-sm text-slate-300 space-y-1">
          <span class="font-bold text-slate-200">🔍 Razón de Primeros Principios:</span>
          <p class="text-slate-400 leading-relaxed">${ax.porQueFundamental}</p>
        </div>

        <!-- Criterios de Dominio (Checklist Feynman) -->
        <div class="p-3 bg-[#0e092e] rounded-xl border border-[#2d1f85]/80 space-y-2">
          <span class="text-xs font-black text-amber-400 uppercase tracking-wider block">
            Criterios de Verificación Feynman (¿Realmente lo dominas?):
          </span>
          <div class="space-y-1.5">
            ${(ax.criteriosDominio || []).map((crit, idx) => `
              <label class="flex items-center gap-2 text-xs text-slate-300 hover:text-white cursor-pointer transition select-none">
                <input type="checkbox" onchange="window.arbolManager.toggleChecklist('${ax.id}', ${idx})" ${checksGuardados[idx] ? 'checked' : ''} class="w-4 h-4 rounded bg-[#140e40] border-slate-600 text-sky-500 focus:ring-0 cursor-pointer">
                <span class="${checksGuardados[idx] ? 'line-through text-slate-500' : ''}">${crit}</span>
              </label>
            `).join('')}
          </div>
        </div>

        <!-- Ejemplos: Universal vs Monagas/Venezuela -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs">
          <div class="p-2.5 rounded-xl bg-[#100b33] border border-slate-800">
            <span class="font-bold text-indigo-300 block mb-0.5">🌐 Ejemplo Universal:</span>
            <span class="text-slate-400">${ax.ejemploUniversal}</span>
          </div>
          <div class="p-2.5 rounded-xl bg-[#100b33] border border-amber-900/30">
            <span class="font-bold text-amber-300 block mb-0.5">🇻🇪 Aplicación en Venezuela / Monagas:</span>
            <span class="text-slate-400">${ax.ejemploVenezuela}</span>
          </div>
        </div>

        <!-- Barra de Acciones con Tutor Gemini -->
        <div class="pt-2 border-t border-[#2d1f85]/60 flex flex-wrap items-center justify-between gap-2">
          <span class="text-xs text-slate-400">
            Ramas vinculadas: <strong>${(ax.gruposConceptosIds || []).length} grupos conceptuales</strong>
          </span>
          <div class="flex items-center gap-2">
            <button onclick="window.consultarTutorSocraticoAxioma('${ax.id}', '${ax.titulo}')" class="px-3 py-1.5 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition active:scale-95 cursor-pointer">
              <span>🤖 Dialogar con Sócrates</span>
            </button>
            <button onclick="window.generarQuizDeAxioma('${ax.id}', '${ax.titulo}')" class="px-2.5 py-1.5 rounded-xl bg-[#18114a] hover:bg-[#23176d] border border-[#2d1f85] text-amber-300 hover:text-white text-xs font-bold flex items-center gap-1 transition active:scale-95 cursor-pointer">
              <span>❓ Quiz Rápido</span>
            </button>
          </div>
        </div>

      </div>
    `;
  }

  renderSeccionGruposConceptos(grupos) {
    if (this.filtroNivel === 'axiomas') return '';

    return `
      <div class="space-y-4 pt-2">
        <div class="flex items-center gap-2">
          <span class="w-3 h-3 rounded-md bg-amber-400 shadow-sm shadow-amber-400/50"></span>
          <h3 class="text-sm font-black text-amber-200 tracking-wider uppercase">
            Nivel 2: Grupos de Conceptos (Estructuras Mentales y Ramificaciones)
          </h3>
          <span class="text-xs text-slate-400 font-mono">(${grupos.length})</span>
        </div>

        <div class="space-y-4">
          ${grupos.map(gc => this.renderGrupoConceptual(gc)).join('')}
        </div>
      </div>
    `;
  }

  renderGrupoConceptual(gc) {
    return `
      <div class="bg-[#100b33] border border-[#2d1f85] rounded-2xl p-4 sm:p-5 space-y-3.5">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="text-xs font-mono font-bold text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/40">
              ${gc.id}
            </span>
            <h4 class="text-base font-black text-white">
              📦 ${gc.nombre}
            </h4>
          </div>
          <span class="text-xs text-slate-400 font-mono">
            ${(gc.conceptos || []).length} conceptos • ${(gc.detalles || []).length} detalles
          </span>
        </div>

        <!-- Conceptos individuales -->
        ${this.filtroNivel !== 'detalles' ? `
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            ${(gc.conceptos || []).map(c => `
              <div class="p-3 bg-[#140e40] rounded-xl border border-indigo-900/40 space-y-1.5">
                <span class="text-sm font-bold text-sky-200 block">💡 ${c.nombre}</span>
                <p class="text-xs text-slate-300 leading-relaxed">${c.definicion}</p>
                ${c.analogia ? `
                  <div class="pt-1.5 border-t border-slate-800 text-xs text-amber-300/90 font-medium">
                    🔍 <em>Analogía:</em> ${c.analogia}
                  </div>
                ` : ''}
              </div>
            `).join('')}
          </div>
        ` : ''}

        <!-- Nivel 3: Detalles (Fórmulas, Código, Procedimientos) -->
        ${(this.filtroNivel === 'todos' || this.filtroNivel === 'detalles') && (gc.detalles || []).length > 0 ? `
          <div class="space-y-2 pt-2 border-t border-[#2d1f85]/50">
            <span class="text-xs font-black text-emerald-400 uppercase tracking-wider block">
              🔸 Nivel 3: Detalles Específicos (Sintaxis, Fórmulas y Táctica)
            </span>
            <div class="space-y-2">
              ${gc.detalles.map(d => `
                <div class="p-3 bg-[#0e092e] rounded-xl border border-emerald-900/40 space-y-1">
                  <div class="flex items-center justify-between">
                    <span class="text-xs font-bold text-emerald-300 font-mono">⚙️ ${d.titulo}</span>
                    <span class="text-xs px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800/40 font-mono">
                      ${d.tipo}
                    </span>
                  </div>
                  <pre class="text-xs font-mono bg-black/40 p-2 rounded-lg text-emerald-200 overflow-x-auto border border-slate-800"><code>${d.contenido}</code></pre>
                  ${d.notas ? `<p class="text-xs text-slate-400 mt-1">${d.notas}</p>` : ''}
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}
      </div>
    `;
  }
}
