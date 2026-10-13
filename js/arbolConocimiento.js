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
    this.filtroTextoTemas = '';
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
    const validas = ['MAT-ING', 'SIS-ARQ', 'GEO-EST', 'ORA-CAS', 'ING-TEC', 'ECO-DIG'];
    this.materiaActivaCodigo = validas.includes(materiaCodigo) ? materiaCodigo : 'MAT-ING';
    this.filtroTextoTemas = '';
    this.render();
  }

  setFiltroTexto(query) {
    this.filtroTextoTemas = query;
    this.render();
    const el = document.getElementById('input-buscar-temas');
    if (el) {
      el.focus();
      el.selectionStart = el.selectionEnd = el.value.length;
    }
  }

  limpiarFiltroTexto() {
    this.filtroTextoTemas = '';
    this.render();
  }

  toggleTema(temaId) {
    this.progresoTemas[temaId] = !this.progresoTemas[temaId];
    this.guardarProgreso();
    this.render();
  }

  copiarPromptTema(titulo, materiaNombre) {
    const textoPrompt = `Actúa como mi tutor de ${materiaNombre}. Explícame de forma clara, directa y práctica el siguiente tema: "${titulo}". Dame 1 ejemplo de la vida real y 3 ejercicios sencillos para resolver.`;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(textoPrompt).then(() => {
        alert(`¡Copiado al portapapeles!\n\nPuedes pegarlo en tu IA favorita para que te lo explique de inmediato.`);
      }).catch(() => {
        window.prompt('Copia esta consulta para tu tutor IA:', textoPrompt);
      });
    } else {
      window.prompt('Copia esta consulta para tu tutor IA:', textoPrompt);
    }
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

    const emojiMateria = this.obtenerIconoMateria(this.materiaActivaCodigo);

    // Actualizar breadcrumb si estamos en la vista de guías
    const breadcrumbActive = document.getElementById('breadcrumb-active-view');
    if (breadcrumbActive && window.estudioApp && window.estudioApp.vistaActiva === 'guias') {
      breadcrumbActive.innerHTML = `
        <span onclick="window.cambiarVista('guias')" class="cursor-pointer hover:text-[var(--notion-text)]">📖 Temas</span>
        <span>/</span>
        <span class="text-[var(--notion-text)] font-semibold">${emojiMateria} ${temario.nombre}</span>
      `;
    }

    const todosLosTemas = temario.temas || [];
    const herramientas = temario.herramientas || [];

    const completados = todosLosTemas.filter(t => Boolean(this.progresoTemas[t.id])).length;
    const total = todosLosTemas.length;
    const porcentaje = total > 0 ? Math.round((completados / total) * 100) : 0;

    // Filtrado por buscador si existe
    let temas = todosLosTemas;
    if (this.filtroTextoTemas && this.filtroTextoTemas.trim()) {
      const q = this.filtroTextoTemas.toLowerCase().trim();
      temas = todosLosTemas.filter(t => 
        (t.titulo && t.titulo.toLowerCase().includes(q)) || 
        (t.descripcion && t.descripcion.toLowerCase().includes(q))
      );
    }

    // Lista de materias con cálculo de avance para cada una
    const listaMaterias = [
      { cod: 'MAT-ING', nom: 'Matemáticas' },
      { cod: 'SIS-ARQ', nom: 'Redes & CCTV' },
      { cod: 'GEO-EST', nom: 'Geopolítica' },
      { cod: 'ORA-CAS', nom: 'Léxico & Retórica' },
      { cod: 'ING-TEC', nom: 'Inglés' },
      { cod: 'ECO-DIG', nom: 'E-Commerce' }
    ].map(m => {
      const tData = temarios[m.cod] || { temas: [] };
      const tList = tData.temas || [];
      const mComp = tList.filter(t => Boolean(this.progresoTemas[t.id])).length;
      return {
        ...m,
        comp: mComp,
        total: tList.length
      };
    });

    this.container.innerHTML = `
      <div class="space-y-4">
        
        <!-- Selector de Materias Adhesivo (Filtros estilo Notion Database Pills con Contadores) -->
        <div class="sticky top-[102px] z-10 bg-[var(--notion-bg)]/95 backdrop-blur-xs py-2 border-b border-[var(--notion-border)] -mt-2">
          <div class="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
            ${listaMaterias.map(m => {
              const activa = this.materiaActivaCodigo === m.cod;
              const completada = m.total > 0 && m.comp === m.total;
              return `
                <button 
                  type="button" 
                  onclick="window.arbolManager.setMateria('${m.cod}')"
                  class="px-2.5 py-1.5 rounded-md text-xs font-medium transition cursor-pointer shrink-0 border flex items-center gap-1.5 ${
                    activa
                      ? 'bg-[var(--notion-card)] text-[var(--notion-text)] border-[var(--notion-border)] shadow-xs'
                      : 'bg-transparent text-[var(--notion-text-muted)] border-transparent hover:bg-[var(--notion-hover)] hover:text-[var(--notion-text)]'
                  }">
                  <span>${this.obtenerIconoMateria(m.cod)}</span>
                  <span>${m.nom}</span>
                  <span class="text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                    completada
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : activa
                        ? 'bg-[var(--notion-border)] text-[var(--notion-text)]'
                        : 'bg-[var(--notion-hover)] text-[var(--notion-text-muted)]'
                  }">
                    ${m.comp}/${m.total}
                  </span>
                </button>
              `;
            }).join('')}
          </div>
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
            <div class="w-16 bg-[var(--notion-border)] h-2 rounded-full overflow-hidden">
              <div class="h-full bg-emerald-500 rounded-full transition-all duration-300" style="width: ${porcentaje}%;"></div>
            </div>
            <span class="text-xs font-mono font-semibold text-[var(--notion-text)]">${porcentaje}%</span>
          </div>
        </div>

        <!-- Barra de Acción: Buscador de Temas y Añadir Tema -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs text-[var(--notion-text-muted)] border-b border-[var(--notion-border)] pb-2.5 pt-1">
          <div class="flex items-center gap-2 flex-1 max-w-sm">
            <div class="relative w-full">
              <input 
                id="input-buscar-temas"
                type="text" 
                placeholder="Filtrar temas de ${temario.nombre}..." 
                value="${this.filtroTextoTemas || ''}"
                oninput="window.arbolManager.setFiltroTexto(this.value)"
                class="w-full bg-[var(--notion-card)] border border-[var(--notion-border)] rounded-md px-2.5 py-1.5 text-xs text-[var(--notion-text)] placeholder-[var(--notion-text-muted)] focus:outline-hidden focus:border-[var(--notion-accent)] transition">
              ${this.filtroTextoTemas ? `
                <button type="button" onclick="window.arbolManager.limpiarFiltroTexto()" class="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-[var(--notion-text-muted)] hover:text-[var(--notion-text)] p-0.5 cursor-pointer" title="Limpiar filtro">✕</button>
              ` : ''}
            </div>
          </div>

          <div class="flex items-center gap-2 shrink-0">
            <button 
              type="button" 
              onclick="window.abrirModalNuevoNodo('${this.materiaActivaCodigo}')"
              class="px-2.5 py-1.5 rounded-md bg-[var(--notion-card)] hover:bg-[var(--notion-hover)] border border-[var(--notion-border)] text-[var(--notion-text)] transition flex items-center gap-1 cursor-pointer">
              <span>+</span>
              <span>Añadir Tema</span>
            </button>
          </div>
        </div>

        <!-- Grid Principal estilo Notion: Temas (7 cols) y Herramientas (5 cols) -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          
          <!-- Columna 1: Temas a Investigar (Lista Notion) -->
          <div class="lg:col-span-7 space-y-2.5">
            <div class="flex items-center justify-between text-xs text-[var(--notion-text-muted)] px-1">
              <span class="font-medium">📋 Temas (${temas.length}${this.filtroTextoTemas ? ' filtrados' : ''})</span>
              <span>Marcar al completar</span>
            </div>

            ${temas.length === 0 ? `
              <div class="p-8 text-center text-xs text-[var(--notion-text-muted)] border border-dashed border-[var(--notion-border)] rounded-md space-y-1">
                <p>No se encontraron temas coincidentes.</p>
                ${this.filtroTextoTemas ? `
                  <button type="button" onclick="window.arbolManager.limpiarFiltroTexto()" class="text-xs text-[var(--notion-accent)] hover:underline cursor-pointer">Ver todos los temas</button>
                ` : `
                  <p class="text-[11px]">Usa el botón «Añadir Tema» para registrar un concepto.</p>
                `}
              </div>
            ` : `
              <div class="space-y-2">
                ${temas.map(t => this.renderTarjetaTema(t, temario.nombre)).join('')}
              </div>
            `}
          </div>

          <!-- Columna 2: Herramientas Recomendadas (Notion Bookmarks con Enlaces Activos) -->
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
                <p>Elige un solo concepto, activa el temporizador de 25 minutos, mira la explicación y resuelve 3 ejercicios a mano en tu libreta. La constancia diaria supera los maratones de última hora.</p>
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
      <div class="notion-item-card p-3 space-y-2.5 group transition ${checked ? 'opacity-85' : ''}">
        <!-- Encabezado de Tema con Checkbox Notion -->
        <div class="flex items-start justify-between gap-3">
          <div class="flex items-start gap-2.5 flex-1 min-w-0">
            <input 
              type="checkbox" 
              class="notion-checkbox mt-0.5" 
              onchange="window.arbolManager.toggleTema('${tema.id}')"
              ${checked ? 'checked' : ''}
              title="Marcar como estudiado">

            <div class="flex-1 min-w-0">
              <h4 class="text-xs sm:text-sm font-medium text-[var(--notion-text)] leading-snug ${checked ? 'line-through opacity-60' : ''}">
                ${tema.titulo}
              </h4>
              <p class="text-xs text-[var(--notion-text-muted)] mt-0.5 leading-relaxed ${checked ? 'line-through opacity-50' : ''}">
                ${tema.descripcion}
              </p>
            </div>
          </div>

          <!-- Estado Badge -->
          <span class="text-[10px] font-mono px-2 py-0.5 rounded-full shrink-0 ${
            checked 
              ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' 
              : 'bg-[var(--notion-border)] text-[var(--notion-text-muted)]'
          }">
            ${checked ? '✓ Hecho' : 'Pendiente'}
          </span>
        </div>

        <!-- Barra Inferior de Micro-chips de Acción Notion -->
        <div class="pt-2 border-t border-[var(--notion-border)] flex items-center justify-between text-xs pl-6 flex-wrap gap-1.5">
          <button 
            type="button" 
            onclick="window.abrirModalTemporizador('${this.materiaActivaCodigo}', '${tema.titulo.replace(/'/g, "\\'")}')"
            class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/25 transition cursor-pointer text-[11px] font-medium"
            title="Iniciar sesión de estudio con temporizador de enfoque">
            <span>⏱️</span>
            <span>Estudiar</span>
          </button>

          <div class="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
            <button 
              type="button" 
              onclick="window.arbolManager.copiarPromptTema('${tema.titulo.replace(/'/g, "\\'")}', '${materiaNombre.replace(/'/g, "\\'")}')"
              class="px-2 py-0.5 rounded hover:bg-[var(--notion-hover)] text-[var(--notion-text-muted)] hover:text-[var(--notion-text)] text-[11px] transition cursor-pointer flex items-center gap-1"
              title="Copiar consulta didáctica para consultar a tu IA">
              <span>✨</span>
              <span>Prompt IA</span>
            </button>

            <button 
              type="button" 
              onclick="window.arbolManager.buscarYouTube('${tema.titulo.replace(/'/g, "\\'")}', '${materiaNombre.replace(/'/g, "\\'")}')"
              class="px-2 py-0.5 rounded hover:bg-[var(--notion-hover)] text-[var(--notion-text-muted)] hover:text-[var(--notion-text)] text-[11px] transition cursor-pointer flex items-center gap-1"
              title="Buscar clases en YouTube">
              <span>🎥</span>
              <span>YouTube</span>
            </button>

            <button 
              type="button" 
              onclick="window.arbolManager.buscarGoogle('${tema.titulo.replace(/'/g, "\\'")}', '${materiaNombre.replace(/'/g, "\\'")}')"
              class="px-2 py-0.5 rounded hover:bg-[var(--notion-hover)] text-[var(--notion-text-muted)] hover:text-[var(--notion-text)] text-[11px] transition cursor-pointer flex items-center gap-1"
              title="Buscar teoría y ejercicios en Google">
              <span>🔍</span>
              <span>Google</span>
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
      <div class="notion-item-card p-3 flex items-start justify-between gap-3 hover:bg-[var(--notion-card-hover)] transition group">
        <div class="flex items-start gap-2.5 min-w-0">
          <span class="text-lg select-none shrink-0 mt-0.5">${icono}</span>
          <div class="space-y-0.5 min-w-0">
            <h4 class="text-xs sm:text-[13px] font-medium text-[var(--notion-text)] leading-snug">
              ${herramienta.nombre}
            </h4>
            <p class="text-xs text-[var(--notion-text-muted)] leading-relaxed">
              ${herramienta.desc}
            </p>
          </div>
        </div>

        ${herramienta.url ? `
          <a href="${herramienta.url}" target="_blank" rel="noopener noreferrer" class="px-2 py-1 rounded bg-[var(--notion-card)] hover:bg-[var(--notion-hover)] border border-[var(--notion-border)] text-[var(--notion-text)] text-xs flex items-center gap-1 font-medium transition shrink-0 cursor-pointer shadow-2xs group-hover:border-[var(--notion-text-muted)]" title="Abrir recurso en pestaña nueva">
            <span>Abrir</span>
            <span class="text-[10px]">↗</span>
          </a>
        ` : ''}
      </div>
    `;
  }
}
