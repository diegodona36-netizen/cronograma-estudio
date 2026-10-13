/**
 * MIGATO • Módulo de Temarios de Estudio & Herramientas Prácticas
 * Sistema de Diseño Notion: Base de Datos de Temas, Recursos y Checklists
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
    this.agregarTemaManual(materiaCodigo, {
      titulo: datos.titulo || datos.enunciado,
      descripcion: datos.fundamento || datos.enunciado || ''
    });
  }

  obtenerIconoMateria(codigo) {
    const iconos = {
      'MAT-ING': '📐',
      'SIS-ARQ': '💻',
      'GEO-EST': '🌐',
      'ORA-CAS': '🗣️',
      'ING-TEC': '🇬🇧',
      'ECO-DIG': '📈'
    };
    return iconos[codigo] || '📚';
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

    const temas = temario.temas || [];
    const herramientas = temario.herramientas || [];

    const completados = temas.filter(t => Boolean(this.progresoTemas[t.id])).length;
    const total = temas.length;
    const porcentaje = total > 0 ? Math.round((completados / total) * 100) : 0;
    const emojiMateria = this.obtenerIconoMateria(this.materiaActivaCodigo);

    // Lista de materias para los tabs de filtro tipo Notion
    const listaMaterias = [
      { cod: 'MAT-ING', nom: 'Matemáticas' },
      { cod: 'SIS-ARQ', nom: 'Programación' },
      { cod: 'GEO-EST', nom: 'Geopolítica' },
      { cod: 'ORA-CAS', nom: 'Oratoria' },
      { cod: 'ING-TEC', nom: 'Inglés' },
      { cod: 'ECO-DIG', nom: 'E-Commerce' }
    ];

    this.container.innerHTML = `
      <div class="space-y-5">
        
        <!-- Selector de Materias (Filtros estilo Notion Database Pills) -->
        <div class="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
          ${listaMaterias.map(m => `
            <button 
              type="button" 
              onclick="window.arbolManager.setMateria('${m.cod}')"
              class="px-2.5 py-1 rounded-md text-xs font-medium transition cursor-pointer shrink-0 border ${
                this.materiaActivaCodigo === m.cod
                  ? 'bg-[var(--notion-card)] text-[var(--notion-text)] border-[var(--notion-border)] shadow-xs'
                  : 'bg-transparent text-[var(--notion-text-muted)] border-transparent hover:bg-[var(--notion-hover)] hover:text-[var(--notion-text)]'
              }">
              <span>${this.obtenerIconoMateria(m.cod)}</span>
              <span class="ml-1">${m.nom}</span>
            </button>
          `).join('')}
        </div>

        <!-- Encabezado de la Materia (Notion Page View) -->
        <div class="notion-callout flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div class="space-y-1">
            <div class="flex items-center gap-2">
              <span class="text-xl select-none">${emojiMateria}</span>
              <h2 class="text-base sm:text-lg font-semibold text-[var(--notion-text)]">
                ${temario.nombre}
              </h2>
              <span class="text-xs font-mono text-[var(--notion-text-muted)]">(${this.materiaActivaCodigo})</span>
            </div>
            <p class="text-xs text-[var(--notion-text-muted)] leading-relaxed pl-7">
              🎯 <strong>Objetivo:</strong> ${temario.objetivo}
            </p>
          </div>

          <!-- Píldora de Progreso de Temas -->
          <div class="flex items-center gap-3 shrink-0 pl-7 md:pl-0">
            <div class="text-right">
              <span class="text-[11px] text-[var(--notion-text-muted)] block">Progreso de estudio</span>
              <span class="text-xs font-mono font-medium text-[var(--notion-text)]">${completados} de ${total} temas</span>
            </div>
            <div class="w-12 bg-[var(--notion-border)] h-1.5 rounded-full overflow-hidden">
              <div class="h-full bg-emerald-500 rounded-full transition-all" style="width: ${porcentaje}%;"></div>
            </div>
            <span class="text-xs font-mono text-[var(--notion-text-muted)]">${porcentaje}%</span>
          </div>
        </div>

        <!-- Barra de Acción: Añadir Tema -->
        <div class="flex items-center justify-between text-xs text-[var(--notion-text-muted)] border-b border-[var(--notion-border)] pb-2">
          <span>Temas a investigar y herramientas recomendadas</span>
          <button 
            type="button" 
            onclick="window.abrirModalNuevoNodo('${this.materiaActivaCodigo}')"
            class="px-2.5 py-1 rounded-md bg-[var(--notion-card)] hover:bg-[var(--notion-hover)] border border-[var(--notion-border)] text-[var(--notion-text)] transition flex items-center gap-1 cursor-pointer">
            <span>+</span>
            <span>Añadir Tema</span>
          </button>
        </div>

        <!-- Grid Principal estilo Notion: Temas (7 cols) y Herramientas (5 cols) -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          
          <!-- Columna 1: Temas a Investigar (Lista Notion) -->
          <div class="lg:col-span-7 space-y-2.5">
            <div class="flex items-center justify-between text-xs text-[var(--notion-text-muted)] px-1">
              <span class="font-medium">📋 Temas (${temas.length})</span>
              <span>Marcar al completar</span>
            </div>

            ${temas.length === 0 ? `
              <div class="p-8 text-center text-xs text-[var(--notion-text-muted)] border border-dashed border-[var(--notion-border)] rounded-md">
                No hay temas registrados aún. Usa el botón «Añadir Tema».
              </div>
            ` : `
              <div class="space-y-2">
                ${temas.map(t => this.renderTarjetaTema(t, temario.nombre)).join('')}
              </div>
            `}
          </div>

          <!-- Columna 2: Herramientas Recomendadas (Notion Bookmarks) -->
          <div class="lg:col-span-5 space-y-3">
            <div class="text-xs font-medium text-[var(--notion-text-muted)] px-1">
              🛠️ Herramientas Recomendadas (${herramientas.length})
            </div>

            ${herramientas.length === 0 ? `
              <div class="p-6 text-center text-xs text-[var(--notion-text-muted)] border border-dashed border-[var(--notion-border)] rounded-md">
                Sin herramientas registradas.
              </div>
            ` : `
              <div class="space-y-2">
                ${herramientas.map(h => this.renderTarjetaHerramienta(h)).join('')}
              </div>
            `}

            <!-- Callout de Consejo Práctico de Estudio -->
            <div class="notion-callout flex items-start gap-2.5 mt-3">
              <span class="text-sm">💡</span>
              <div class="space-y-0.5 text-xs text-[var(--notion-text-muted)] leading-relaxed">
                <strong class="text-[var(--notion-text)] font-medium">Método de Estudio:</strong>
                <p>Elige un solo concepto, mira un video corto de 10-15 minutos y resuelve 3 ejercicios a mano en tu libreta. La constancia diaria supera los maratones de última hora.</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    `;

    if (window.lucide) window.lucide.createIcons();
  }

  renderTarjetaTema(tema, materiaNombre) {
    const checked = Boolean(this.progresoTemas[tema.id]);

    return `
      <div class="notion-item-card p-3 space-y-2 group transition">
        <!-- Encabezado de Tema con Checkbox Notion -->
        <div class="flex items-start gap-2.5">
          <input 
            type="checkbox" 
            class="notion-checkbox mt-0.5" 
            onchange="window.arbolManager.toggleTema('${tema.id}')"
            ${checked ? 'checked' : ''}
            title="Marcar como estudiado">

          <div class="flex-1 min-w-0">
            <h4 class="text-xs sm:text-sm font-medium text-[var(--notion-text)] leading-snug ${checked ? 'line-through opacity-50' : ''}">
              ${tema.titulo}
            </h4>
            <p class="text-xs text-[var(--notion-text-muted)] mt-0.5 leading-relaxed ${checked ? 'line-through opacity-40' : ''}">
              ${tema.descripcion}
            </p>
          </div>
        </div>

        <!-- Barra Inferior de Enlaces Discretos -->
        <div class="pt-1.5 border-t border-[var(--notion-border)] flex items-center justify-between text-[11px] text-[var(--notion-text-muted)] pl-6">
          <span>${checked ? '✅ Estudiado' : '⏳ Pendiente'}</span>

          <div class="flex items-center gap-1 opacity-70 group-hover:opacity-100 transition-opacity">
            <button 
              type="button" 
              onclick="window.arbolManager.buscarGoogle('${tema.titulo.replace(/'/g, "\\'")}', '${materiaNombre.replace(/'/g, "\\'")}')"
              class="px-2 py-0.5 rounded hover:bg-[var(--notion-hover)] hover:text-[var(--notion-text)] transition cursor-pointer"
              title="Buscar en Google">
              🔍 Google
            </button>

            <button 
              type="button" 
              onclick="window.arbolManager.buscarYouTube('${tema.titulo.replace(/'/g, "\\'")}', '${materiaNombre.replace(/'/g, "\\'")}')"
              class="px-2 py-0.5 rounded hover:bg-[var(--notion-hover)] hover:text-[var(--notion-text)] transition cursor-pointer"
              title="Buscar en YouTube">
              🎥 YouTube
            </button>

            <button 
              type="button" 
              onclick="window.arbolManager.copiarPromptTema('${tema.titulo.replace(/'/g, "\\'")}', '${materiaNombre.replace(/'/g, "\\'")}')"
              class="px-2 py-0.5 rounded hover:bg-[var(--notion-hover)] hover:text-[var(--notion-text)] transition cursor-pointer"
              title="Copiar consulta para pedir explicación">
              📋 Copiar
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
      <div class="notion-item-card p-2.5 flex items-start gap-2.5 hover:bg-[var(--notion-card-hover)] transition">
        <span class="text-base select-none shrink-0 mt-0.5">${icono}</span>
        <div class="space-y-0.5 min-w-0">
          <h4 class="text-xs sm:text-[13px] font-medium text-[var(--notion-text)] leading-snug">
            ${herramienta.nombre}
          </h4>
          <p class="text-xs text-[var(--notion-text-muted)] leading-relaxed">
            ${herramienta.desc}
          </p>
        </div>
      </div>
    `;
  }
}
