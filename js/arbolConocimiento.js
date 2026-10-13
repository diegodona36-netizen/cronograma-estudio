/**
 * MIGATO • Módulo de Temarios de Estudio & Herramientas Prácticas
 * Interfaz directa para investigar temas y acceder a herramientas de estudio
 * Conducción: José Gregorio 'El Gato' Briceño | Comisión Técnica MIGATO
 */

import {
  obtenerTemariosYHerramientas,
  guardarTemarioPersonalizado,
  obtenerTodasLasMaterias
} from './estudioData.js';

export class ArbolConocimientoManager {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.materiaActivaCodigo = 'MAT-ING';
    this.progresoTemas = this.cargarProgreso();
  }

  cargarProgreso() {
    try {
      const guardado = localStorage.getItem('axiom_estudio_temas_completados');
      return guardado ? JSON.parse(guardado) : {};
    } catch {
      return {};
    }
  }

  guardarProgreso() {
    try {
      localStorage.setItem('axiom_estudio_temas_completados', JSON.stringify(this.progresoTemas));
    } catch (e) {
      console.warn('Error guardando progreso de temas:', e);
    }
  }

  setMateria(materiaCodigo) {
    this.materiaActivaCodigo = materiaCodigo;
    this.render();
  }

  toggleTema(temaId) {
    this.progresoTemas[temaId] = !this.progresoTemas[temaId];
    this.guardarProgreso();
    this.render();
  }

  copiarPromptTema(titulo, materiaNombre) {
    const prompt = `Actúa como mi tutor de ${materiaNombre}. Explícame de forma clara, directa y práctica el siguiente tema: "${titulo}". Dame 1 ejemplo de la vida real y 3 ejercicios sencillos para resolver.`;
    navigator.clipboard.writeText(prompt).then(() => {
      alert(`¡Copiado al portapapeles!\n\nPuedes pegarlo en Gemini o ChatGPT para que te lo explique de inmediato.`);
    }).catch(() => {
      prompt('Copia esta consulta para tu tutor IA:', prompt);
    });
  }

  buscarGoogle(titulo, materiaNombre) {
    const q = `${titulo} ${materiaNombre} explicacion facil ejercicios`;
    window.open(`https://www.google.com/search?q=${encodeURIComponent(q)}`, '_blank');
  }

  buscarYouTube(titulo, materiaNombre) {
    const q = `${titulo} ${materiaNombre} clase explicacion`;
    window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`, '_blank');
  }

  agregarTemaManual(materiaCodigo, { titulo, descripcion }) {
    if (!titulo || !titulo.trim()) return;
    const catalogo = obtenerTemariosYHerramientas();
    const temario = catalogo[materiaCodigo] || {
      nombre: materiaCodigo,
      objetivo: 'Estudio general de la materia',
      temas: [],
      herramientas: []
    };

    const nuevoTema = {
      id: `custom_t_${Date.now()}`,
      titulo: titulo.trim(),
      descripcion: (descripcion || 'Tema añadido manualmente para investigación personal.').trim()
    };

    if (!Array.isArray(temario.temas)) temario.temas = [];
    temario.temas.push(nuevoTema);
    guardarTemarioPersonalizado(materiaCodigo, temario);
    this.render();
  }

  agregarNodoManual(materiaCodigo, datos) {
    // Compatibilidad con el modal anterior
    this.agregarTemaManual(materiaCodigo, {
      titulo: datos.titulo || datos.enunciado,
      descripcion: datos.fundamento || datos.enunciado || ''
    });
  }

  render() {
    if (!this.container) return;

    const temarios = obtenerTemariosYHerramientas();
    const materias = obtenerTodasLasMaterias();

    const temario = temarios[this.materiaActivaCodigo] || {
      nombre: this.materiaActivaCodigo,
      objetivo: 'Investigación y estudio práctico.',
      temas: [],
      herramientas: []
    };

    const matConfig = materias.find(m => m.codigo === this.materiaActivaCodigo) || {
      nombre: temario.nombre,
      colorHex: '#38bdf8'
    };

    const temas = temario.temas || [];
    const herramientas = temario.herramientas || [];

    const completados = temas.filter(t => Boolean(this.progresoTemas[t.id])).length;
    const total = temas.length;
    const porcentaje = total > 0 ? Math.round((completados / total) * 100) : 0;

    this.container.innerHTML = `
      <!-- Cabecera de la Materia -->
      <div class="p-4 sm:p-6 bg-[#140e40] border-b border-[#2d1f85] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div class="flex items-center gap-2 mb-1.5">
            <span class="px-2.5 py-0.5 rounded-full text-xs font-mono font-black border" style="background-color: ${matConfig.colorHex}22; border-color: ${matConfig.colorHex}66; color: ${matConfig.colorHex}">
              ${this.materiaActivaCodigo}
            </span>
            <span class="text-xs text-slate-400 font-semibold uppercase tracking-wider">
              Temario y Herramientas Prácticas
            </span>
          </div>
          <h2 class="text-lg sm:text-2xl font-black text-white tracking-wide">
            ${temario.nombre}
          </h2>
          <p class="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
            🎯 <strong>Objetivo:</strong> ${temario.objetivo}
          </p>
        </div>

        <!-- Barra de Progreso de Temas Estudiados -->
        <div class="bg-[#0e092e] p-3.5 rounded-2xl border border-[#2d1f85] flex items-center gap-4 shrink-0 shadow-inner">
          <div class="text-right">
            <span class="text-xs text-slate-400 font-semibold block">Temas Estudiados</span>
            <span class="text-base sm:text-lg font-black text-white font-mono">${completados} de ${total}</span>
          </div>
          <div class="w-12 h-12 rounded-2xl bg-[#140e40] border border-sky-500/40 flex items-center justify-center text-sky-400 font-mono font-black text-sm shadow-sm">
            ${porcentaje}%
          </div>
        </div>
      </div>

      <!-- Barra de Acciones y Filtros -->
      <div class="px-4 sm:px-6 py-2.5 bg-[#100b33] border-b border-[#2d1f85] flex flex-wrap items-center justify-between gap-2 text-xs">
        <div class="text-slate-400 font-medium">
          Marca los temas a medida que los investigues o resuelvas ejercicios.
        </div>
        <button onclick="window.abrirModalNuevoNodo('${this.materiaActivaCodigo}')" class="px-3 py-1.5 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-bold flex items-center gap-1.5 transition shadow-sm cursor-pointer">
          <span>➕ Añadir Tema a esta Materia</span>
        </button>
      </div>

      <!-- Contenido Principal: 2 Secciones Claras -->
      <div class="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 overflow-y-auto max-h-[calc(100vh-280px)] scrollbar-thin">
        
        <!-- Columna 1: Temas a Buscar y Estudiar (7 cols) -->
        <div class="lg:col-span-7 space-y-4">
          <div class="flex items-center justify-between border-b border-[#2d1f85]/60 pb-2">
            <h3 class="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
              <span>📋</span>
              <span>Temas a Buscar y Estudiar</span>
              <span class="text-xs text-sky-400 font-mono font-bold">(${temas.length})</span>
            </h3>
            <span class="text-[11px] text-slate-400">Haz clic en el cuadro al terminar</span>
          </div>

          ${temas.length === 0 ? `
            <div class="p-6 text-center text-slate-400 bg-[#0e092e] rounded-2xl border border-[#2d1f85]">
              No hay temas cargados aún. Usa el botón «Añadir Tema» para comenzar.
            </div>
          ` : `
            <div class="space-y-3">
              ${temas.map(t => this.renderTarjetaTema(t, temario.nombre)).join('')}
            </div>
          `}
        </div>

        <!-- Columna 2: Herramientas Recomendadas (Dónde Buscar) (5 cols) -->
        <div class="lg:col-span-5 space-y-4">
          <div class="flex items-center justify-between border-b border-[#2d1f85]/60 pb-2">
            <h3 class="text-sm font-black text-amber-300 uppercase tracking-wider flex items-center gap-2">
              <span>🛠️</span>
              <span>Herramientas Recomendadas</span>
              <span class="text-xs text-amber-400 font-mono font-bold">(${herramientas.length})</span>
            </h3>
            <span class="text-[11px] text-slate-400">Dónde buscar</span>
          </div>

          ${herramientas.length === 0 ? `
            <div class="p-6 text-center text-slate-400 bg-[#0e092e] rounded-2xl border border-[#2d1f85]">
              No hay herramientas registradas para esta materia.
            </div>
          ` : `
            <div class="space-y-3">
              ${herramientas.map(h => this.renderTarjetaHerramienta(h)).join('')}
            </div>
          `}

          <!-- Caja de Consejo Práctico de Estudio -->
          <div class="p-4 bg-[#140e40] rounded-2xl border border-sky-500/30 space-y-2 mt-4">
            <div class="flex items-center gap-2 text-xs font-black text-sky-300 uppercase tracking-wider">
              <span>💡</span>
              <span>Consejo de Estudio Rápido</span>
            </div>
            <p class="text-xs text-slate-300 leading-relaxed">
              No intentes abarcar todo el tema en un solo día. Busca elige <strong>1 solo concepto</strong>, mira un video de 10 minutos en YouTube y resuelve <strong>3 ejercicios a mano</strong> en tu libreta. La constancia diaria supera los maratones de última hora.
            </p>
          </div>
        </div>

      </div>
    `;

    if (window.lucide) window.lucide.createIcons();
  }

  renderTarjetaTema(tema, materiaNombre) {
    const checked = Boolean(this.progresoTemas[tema.id]);

    return `
      <div class="p-4 rounded-2xl border transition shadow-sm space-y-3 ${
        checked
          ? 'bg-[#0e092e]/60 border-emerald-500/40 opacity-80'
          : 'bg-[#140e40] border-[#2d1f85] hover:border-sky-500/50'
      }">
        <!-- Fila Superior: Checkbox y Título -->
        <div class="flex items-start gap-3">
          <button 
            type="button" 
            onclick="window.arbolManager.toggleTema('${tema.id}')"
            class="w-6 h-6 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 transition cursor-pointer ${
              checked 
                ? 'bg-emerald-600 border-emerald-400 text-white shadow-sm' 
                : 'bg-[#0e092e] border-slate-600 hover:border-sky-400 text-transparent'
            }"
            title="Marcar como estudiado">
            ✓
          </button>

          <div class="flex-1 min-w-0">
            <h4 class="text-sm sm:text-base font-bold text-white leading-snug ${checked ? 'line-through text-slate-400' : ''}">
              ${tema.titulo}
            </h4>
            <p class="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed ${checked ? 'text-slate-500' : ''}">
              ${tema.descripcion}
            </p>
          </div>
        </div>

        <!-- Fila Inferior: Botones Directos de Búsqueda -->
        <div class="pt-2 border-t border-[#2d1f85]/50 flex flex-wrap items-center justify-between gap-2">
          <span class="text-[11px] font-mono font-semibold ${checked ? 'text-emerald-400' : 'text-slate-400'}">
            ${checked ? '✅ Estudiado y practicado' : '⏳ Pendiente por revisar'}
          </span>

          <div class="flex items-center gap-1.5">
            <button 
              type="button" 
              onclick="window.arbolManager.buscarGoogle('${tema.titulo.replace(/'/g, "\\'")}', '${materiaNombre.replace(/'/g, "\\'")}')"
              class="px-2.5 py-1 rounded-xl bg-[#0e092e] hover:bg-[#18114a] border border-[#2d1f85] text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1 transition cursor-pointer"
              title="Buscar explicaciones y guías en Google">
              <span>🔍</span>
              <span>Google</span>
            </button>

            <button 
              type="button" 
              onclick="window.arbolManager.buscarYouTube('${tema.titulo.replace(/'/g, "\\'")}', '${materiaNombre.replace(/'/g, "\\'")}')"
              class="px-2.5 py-1 rounded-xl bg-[#0e092e] hover:bg-[#18114a] border border-[#2d1f85] text-red-300 hover:text-white text-xs font-semibold flex items-center gap-1 transition cursor-pointer"
              title="Buscar clases y videos en YouTube">
              <span>🎥</span>
              <span>YouTube</span>
            </button>

            <button 
              type="button" 
              onclick="window.arbolManager.copiarPromptTema('${tema.titulo.replace(/'/g, "\\'")}', '${materiaNombre.replace(/'/g, "\\'")}')"
              class="px-2.5 py-1 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white text-xs font-bold flex items-center gap-1 transition shadow-xs cursor-pointer"
              title="Copiar consulta para pedirle explicación a Gemini o ChatGPT">
              <span>📋</span>
              <span>Copiar Tema</span>
            </button>
          </div>
        </div>
      </div>
    `;
  }

  renderTarjetaHerramienta(herramienta) {
    const iconosPorTipo = {
      video: '🎥',
      web: '🌐',
      libro: '📖',
      practica: '💻',
      doc: '📄',
      lectura: '📜',
      audio: '🎙️',
      app: '📱',
      voz: '🗣️',
      finanzas: '💳'
    };

    const icono = iconosPorTipo[herramienta.tipo] || '🔧';

    return `
      <div class="p-3.5 rounded-2xl bg-[#0e092e] border border-[#2d1f85] hover:border-amber-500/40 transition space-y-1.5 shadow-sm">
        <div class="flex items-center gap-2">
          <span class="text-base">${icono}</span>
          <h4 class="text-xs sm:text-sm font-black text-amber-200 leading-tight">
            ${herramienta.nombre}
          </h4>
        </div>
        <p class="text-xs text-slate-300 leading-relaxed pl-6">
          ${herramienta.desc}
        </p>
      </div>
    `;
  }
}
