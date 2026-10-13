/**
 * Auditor Automatizado de Botones e Interactividad en el Navegador
 * Recorre todos los botones y disparadores de eventos, simula clics y registra fallas.
 */

export async function auditarTodosLosBotones() {
  const reporte = {
    totalBotonesProbados: 0,
    exitosos: [],
    fallidos: [],
    advertencias: []
  };

  const erroresCapturados = [];
  window.addEventListener('error', (e) => {
    erroresCapturados.push({
      mensaje: e.message,
      archivo: e.filename,
      linea: e.lineno,
      columna: e.colno
    });
  });

  // Guardar alerts y confirms originales para que no bloqueen
  const alertOrig = window.alert;
  const confirmOrig = window.confirm;
  const promptOrig = window.prompt;
  const openOrig = window.open;

  window.alert = (msg) => console.log('[Audit Mock Alert]', msg);
  window.confirm = () => true;
  window.prompt = () => 'Texto de prueba';
  window.open = (url) => console.log('[Audit Mock Open]', url);

  const esperar = (ms) => new Promise(r => setTimeout(r, ms));

  async function probarBoton(btn, contexto) {
    reporte.totalBotonesProbados++;
    const texto = (btn.innerText || btn.textContent || btn.getAttribute('title') || btn.getAttribute('aria-label') || '').trim().slice(0, 30);
    const onclickAttr = btn.getAttribute('onclick') || '';
    const id = btn.id || '';
    const desc = `[${contexto}] ${texto || id || onclickAttr || 'Botón sin texto'}`;

    const erroresAntes = erroresCapturados.length;

    try {
      btn.click();
      await esperar(60);

      const erroresNuevos = erroresCapturados.slice(erroresAntes);
      if (erroresNuevos.length > 0) {
        reporte.fallidos.push({
          descripcion: desc,
          id,
          onclick: onclickAttr,
          errores: erroresNuevos
        });
      } else {
        reporte.exitosos.push({
          descripcion: desc,
          id,
          onclick: onclickAttr
        });
      }
    } catch (err) {
      reporte.fallidos.push({
        descripcion: desc,
        id,
        onclick: onclickAttr,
        errorExcepcion: err.message
      });
    }
  }

  console.log('🚀 Iniciando auditoría exhaustiva de botones...');

  // FASE 1: Botones del Header y Tablero Semanal
  if (window.cambiarVista) window.cambiarVista('semanal');
  await esperar(100);

  const botonesSemanal = Array.from(document.querySelectorAll('header button, #seccion-vista-semanal button'));
  for (const btn of botonesSemanal) {
    await probarBoton(btn, 'Vista Semanal');
  }

  // FASE 2: Botones de Temas & Herramientas (Guías)
  if (window.cambiarVista) window.cambiarVista('guias');
  await esperar(100);

  // Probar botones de materias
  const botonesMaterias = Array.from(document.querySelectorAll('#contenedor-arbol-conocimiento button'));
  for (const btn of botonesMaterias) {
    await probarBoton(btn, 'Vista Temas');
  }

  // FASE 3: Botones de Vista Mensual
  if (window.cambiarVista) window.cambiarVista('mensual');
  await esperar(100);

  const botonesMensual = Array.from(document.querySelectorAll('#seccion-vista-mensual button'));
  for (const btn of botonesMensual) {
    await probarBoton(btn, 'Vista Mensual');
  }

  // FASE 4: Modales
  const modales = [
    { id: 'modal-contingencia', abrir: () => window.abrirModalContingencia && window.abrirModalContingencia(), cerrar: () => window.cerrarModalContingencia && window.cerrarModalContingencia() },
    { id: 'modal-agregar-bloque', abrir: () => window.abrirModalAgregarBloque && window.abrirModalAgregarBloque('lunes'), cerrar: () => window.cerrarModalAgregarBloque && window.cerrarModalAgregarBloque() },
    { id: 'modal-nuevo-nodo', abrir: () => window.abrirModalNuevoNodo && window.abrirModalNuevoNodo('MAT-ING'), cerrar: () => window.cerrarModalNuevoNodo && window.cerrarModalNuevoNodo() },
    { id: 'modal-bitacora-voz', abrir: () => window.abrirModalBitacora && window.abrirModalBitacora('lunes', 'b_lun_1'), cerrar: () => window.cerrarModalBitacora && window.cerrarModalBitacora() },
    { id: 'modal-lista-bitacoras', abrir: () => window.abrirModalListaBitacoras && window.abrirModalListaBitacoras(), cerrar: () => window.cerrarModalListaBitacoras && window.cerrarModalListaBitacoras() }
  ];

  for (const m of modales) {
    try {
      m.abrir();
      await esperar(100);
      const btnsModal = Array.from(document.querySelectorAll(`#${m.id} button`));
      for (const btn of btnsModal) {
        // No clickear submit directo para no alterar datos de golpe si no es necesario
        if (btn.type !== 'submit') {
          await probarBoton(btn, `Modal ${m.id}`);
        }
      }
      m.cerrar();
      await esperar(50);
    } catch (e) {
      reporte.advertencias.push(`Fallo al abrir/probar modal ${m.id}: ${e.message}`);
    }
  }

  // Restaurar mocks
  window.alert = alertOrig;
  window.confirm = confirmOrig;
  window.prompt = promptOrig;
  window.open = openOrig;

  console.log('✅ Auditoría finalizada.');
  console.log(`Total probados: ${reporte.totalBotonesProbados}`);
  console.log(`Exitosos: ${reporte.exitosos.length}`);
  console.log(`Fallidos: ${reporte.fallidos.length}`);

  window.__reporteAuditoriaBotones = reporte;
  return reporte;
}
