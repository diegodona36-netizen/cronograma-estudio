/**
 * MIGATO • Motor de Rescheduling Inteligente y Antifrágil (Chronos Rebalancer)
 * Redistribución de carga horaria ante cortes de luz y emergencias (Lunes a Sábado)
 * Conducción: José Gregorio 'El Gato' Briceño | Comisión Técnica MIGATO
 */

import { DIAS_SEMANA, MATERIAS_CONFIG, FRANJAS_HORARIAS } from './estudioData.js';

export const CONFIG_REBALANCER_DEFAULT = {
  maxHorasDiarias: 6.5,       // Límite cognitivo sostenible diario
  minDuracionBloque: 0.5,     // 30 min mínimo por sesión (Pomodoro estándar)
  maxDuracionBloque: 2.0,     // 2 horas máximo continuo
  bufferMinutos: 15,          // 15 min de descanso entre bloques
  respetarCircadiano: true,   // Materias heavy en la mañana, light en la tarde/noche
  permitirDesbordeMensual: true
};

/**
 * Convierte cadena 'HH:MM' a minutos desde las 00:00
 */
export function timeToMinutes(timeStr) {
  if (!timeStr) return 0;
  const [h, m] = timeStr.split(':').map(Number);
  return (h * 60) + (m || 0);
}

/**
 * Convierte minutos desde las 00:00 a cadena 'HH:MM'
 */
export function minutesToTime(minutes) {
  const m = Math.max(0, Math.round(minutes));
  const h = Math.floor(m / 60) % 24;
  const remMin = m % 60;
  return `${String(h).padStart(2, '0')}:${String(remMin).padStart(2, '0')}`;
}

/**
 * Detecta bloques solapados con una ventana de corte o indisponibilidad
 */
export function detectarBloquesAfectados(itinerarioSemanal, dia, horaInicioStr, horaFinStr) {
  const bloquesDelDia = (itinerarioSemanal && itinerarioSemanal[dia]) ? itinerarioSemanal[dia] : [];
  const corteIni = timeToMinutes(horaInicioStr);
  const corteFin = timeToMinutes(horaFinStr);

  const afectados = [];
  const horasPerdidasPorMateria = {};

  bloquesDelDia.forEach(bloque => {
    // Si ya fue completado antes del corte, no se pierde
    if (bloque.completado) return;

    const bIni = timeToMinutes(bloque.inicio);
    const bFin = timeToMinutes(bloque.fin);

    // Condición de solapamiento de intervalos: [bIni, bFin] ∩ [corteIni, corteFin] ≠ ∅
    const haySolapamiento = Math.max(bIni, corteIni) < Math.min(bFin, corteFin);

    if (haySolapamiento) {
      // Calcular duración real solapada
      const solapadoMin = Math.min(bFin, corteFin) - Math.max(bIni, corteIni);
      const horasAfectadas = Math.round((solapadoMin / 60) * 10) / 10;

      afectados.push({
        ...bloque,
        horasAfectadas: horasAfectadas > 0 ? horasAfectadas : bloque.duracion
      });

      const cod = bloque.materiaCodigo;
      horasPerdidasPorMateria[cod] = (horasPerdidasPorMateria[cod] || 0) + (horasAfectadas > 0 ? horasAfectadas : bloque.duracion);
    }
  });

  const totalHorasPerdidas = Object.values(horasPerdidasPorMateria).reduce((a, b) => a + b, 0);

  return {
    dia,
    horaInicio: horaInicioStr,
    horaFin: horaFinStr,
    bloquesAfectados: afectados,
    horasPerdidasPorMateria,
    totalHorasPerdidas: Math.round(totalHorasPerdidas * 10) / 10
  };
}

/**
 * Calcula la carga horaria activa programada para un día dado
 */
export function calcularHorasDia(bloquesDia) {
  if (!Array.isArray(bloquesDia)) return 0;
  return bloquesDia
    .filter(b => !b.cancelado)
    .reduce((acc, b) => acc + (Number(b.duracion) || 0), 0);
}

/**
 * Encuentra espacios horarios disponibles en un día determinado
 */
export function encontrarSlotsDisponiblesEnDia(bloquesDia, franjasPermitidas = FRANJAS_HORARIAS) {
  const bloquesActivos = (bloquesDia || []).filter(b => !b.cancelado);
  const slotsLibres = [];

  franjasPermitidas.forEach(franja => {
    const fIni = timeToMinutes(franja.inicio);
    const fFin = timeToMinutes(franja.fin);

    // Verificar si esta franja ya está ocupada por algún bloque
    const ocupado = bloquesActivos.some(b => {
      const bIni = timeToMinutes(b.inicio);
      const bFin = timeToMinutes(b.fin);
      return Math.max(bIni, fIni) < Math.min(bFin, fFin);
    });

    if (!ocupado) {
      slotsLibres.push({
        franjaId: franja.id,
        inicio: franja.inicio,
        fin: franja.fin,
        duracionHoras: franja.duracionHoras,
        tipo: franja.tipo
      });
    }
  });

  return slotsLibres;
}

/**
 * Algoritmo Antifrágil: Rebalancea el itinerario semanal ante un evento de interrupción
 */
export function rebalancearItinerario(
  itinerarioSemanalOriginal,
  evento,
  configCustom = {}
) {
  const config = { ...CONFIG_REBALANCER_DEFAULT, ...configCustom };
  const itinerarioClon = JSON.parse(JSON.stringify(itinerarioSemanalOriginal));

  const diaEvento = (evento.dia || '').toLowerCase();
  const horaIni = evento.horaInicio || '12:00';
  const horaFin = evento.horaFin || '18:00';
  const motivo = evento.motivo || 'Corte de Luz';

  // 1. Detectar bloques afectados
  const diagnostico = detectarBloquesAfectados(itinerarioClon, diaEvento, horaIni, horaFin);
  if (diagnostico.bloquesAfectados.length === 0) {
    return {
      itinerario: itinerarioClon,
      rebalanceado: false,
      mensaje: `No se encontraron bloques de estudio en ${diaEvento} durante la ventana ${horaIni} - ${horaFin}.`,
      horasPerdidasTotal: 0,
      horasRecuperadasSemana: 0,
      desbordeMensualHoras: 0,
      logAcciones: []
    };
  }

  const idsAfectados = new Set(diagnostico.bloquesAfectados.map(b => b.id));

  // 2. Marcar bloques como cancelados por interrupción en el día afectado
  itinerarioClon[diaEvento] = itinerarioClon[diaEvento].map(b => {
    if (idsAfectados.has(b.id)) {
      return {
        ...b,
        cancelado: true,
        motivoCancelacion: motivo,
        fechaCancelacion: new Date().toISOString()
      };
    }
    return b;
  });

  // 3. Cola de horas pendientes a redistribuir
  const horasARecuperar = { ...diagnostico.horasPerdidasPorMateria };
  const logAcciones = [];

  // 4. Determinar días disponibles para recuperación (priorizando días posteriores en la semana)
  const ordenDias = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];
  const diaIndexEvento = ordenDias.indexOf(diaEvento);

  const diasCandidatos = [];
  // Primero días posteriores (resiliencia: no saturar la noche del día siniestrado)
  ordenDias.forEach((d, idx) => {
    if (idx > diaIndexEvento) {
      diasCandidatos.push(d);
    }
  });
  // Si aún quedase necesidad o si es sábado, el mismo día al final si volvió la luz antes de las 19:30
  if (timeToMinutes(horaFin) < timeToMinutes('19:30')) {
    diasCandidatos.push(diaEvento);
  }

  let totalRecuperadoSemana = 0;

  // 5. Asignación heurística por capacidad y demanda cognitiva
  // Ordenar materias por demanda cognitiva y horas pendientes
  const materiasOrdenadas = Object.keys(horasARecuperar).sort((a, b) => {
    const matA = MATERIAS_CONFIG.find(m => m.codigo === a);
    const matB = MATERIAS_CONFIG.find(m => m.codigo === b);
    const pesoA = matA?.demandaCognitiva === 'heavy' ? 3 : (matA?.demandaCognitiva === 'medium' ? 2 : 1);
    const pesoB = matB?.demandaCognitiva === 'heavy' ? 3 : (matB?.demandaCognitiva === 'medium' ? 2 : 1);
    return pesoB - pesoA;
  });

  for (const diaTarget of diasCandidatos) {
    if (!itinerarioClon[diaTarget]) itinerarioClon[diaTarget] = [];

    let cargaActual = calcularHorasDia(itinerarioClon[diaTarget]);
    let slotsLibres = encontrarSlotsDisponiblesEnDia(itinerarioClon[diaTarget]);

    // Regla Antifrágil: Si es el mismo día del evento, solo se pueden usar horas posteriores al regreso de la luz
    if (diaTarget === diaEvento) {
      slotsLibres = slotsLibres.filter(s => timeToMinutes(s.inicio) >= timeToMinutes(horaFin));
    }

    for (const matCod of materiasOrdenadas) {
      let horasPendientes = horasARecuperar[matCod] || 0;
      if (horasPendientes <= 0) continue;

      const matConfig = MATERIAS_CONFIG.find(m => m.codigo === matCod) || {
        codigo: matCod,
        nombre: matCod,
        demandaCognitiva: 'medium'
      };

      for (let sIdx = 0; sIdx < slotsLibres.length; sIdx++) {
        if (horasPendientes <= 0) break;
        if (cargaActual >= config.maxHorasDiarias) break;

        const slot = slotsLibres[sIdx];
        if (!slot) continue;

        // Verificar compatibilidad circadiana si está activada
        if (config.respetarCircadiano && matConfig.demandaCognitiva === 'heavy' && slot.tipo === 'nocturna') {
          // No asignar heavy en la noche a menos que sea la única opción
          const haySlotMatutino = slotsLibres.some(s => s && s.tipo === 'matutina');
          if (haySlotMatutino) continue;
        }

        const espacioEnDia = config.maxHorasDiarias - cargaActual;
        const duracionBloque = Math.min(horasPendientes, slot.duracionHoras, espacioEnDia);

        if (duracionBloque >= config.minDuracionBloque) {
          const nuevoFinMin = timeToMinutes(slot.inicio) + Math.round(duracionBloque * 60);
          const nuevoBloque = {
            id: `rec_${diaTarget}_${matCod}_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
            materiaCodigo: matCod,
            inicio: slot.inicio,
            fin: minutesToTime(nuevoFinMin),
            duracion: Math.round(duracionBloque * 10) / 10,
            tema: `[Recuperación ${motivo}] ${matConfig.nombre}`,
            completado: false,
            esRecuperacion: true,
            recuperaDe: diaEvento,
            motivoRecuperacion: motivo
          };

          itinerarioClon[diaTarget].push(nuevoBloque);
          itinerarioClon[diaTarget].sort((a, b) => timeToMinutes(a.inicio) - timeToMinutes(b.inicio));

          horasPendientes -= duracionBloque;
          horasARecuperar[matCod] = Math.round(horasPendientes * 10) / 10;
          cargaActual += duracionBloque;
          totalRecuperadoSemana += duracionBloque;

          logAcciones.push({
            materiaCodigo: matCod,
            materiaNombre: matConfig.nombre,
            diaDestino: diaTarget,
            horario: `${slot.inicio} a ${minutesToTime(nuevoFinMin)}`,
            duracion: Math.round(duracionBloque * 10) / 10,
            tipo: 'semanal'
          });

          // Consumir o ajustar slot
          if (duracionBloque >= slot.duracionHoras) {
            slotsLibres.splice(sIdx, 1);
            sIdx--;
          } else {
            slot.inicio = minutesToTime(nuevoFinMin + config.bufferMinutos);
            slot.duracionHoras = Math.round(((timeToMinutes(slot.fin) - timeToMinutes(slot.inicio)) / 60) * 10) / 10;
          }
        }
      }
    }
  }

  // 6. Calcular desborde mensual si quedan horas sin ubicar
  const horasRemanentes = Object.values(horasARecuperar).reduce((acc, h) => acc + Math.max(0, h), 0);
  const desbordeMensual = Math.round(horasRemanentes * 10) / 10;

  let planMensual = null;
  if (desbordeMensual > 0) {
    const semanasRestantesMes = 3; // Promedio de amortización
    const cuotaAdicionalSemanal = Math.round((desbordeMensual / semanasRestantesMes) * 10) / 10;
    planMensual = {
      horasDesbordadas: desbordeMensual,
      semanasAmortizacion: semanasRestantesMes,
      cuotaPorSemanaHoras: cuotaAdicionalSemanal,
      recomendacion: `Se desbordaron ${desbordeMensual}h al itinerario mensual. Agrega +${cuotaAdicionalSemanal}h en las siguientes ${semanasRestantesMes} semanas para mantener intacto el promedio mensual.`
    };

    Object.entries(horasARecuperar).forEach(([cod, h]) => {
      if (h > 0) {
        const mat = MATERIAS_CONFIG.find(m => m.codigo === cod);
        logAcciones.push({
          materiaCodigo: cod,
          materiaNombre: mat ? mat.nombre : cod,
          diaDestino: 'Desborde Mensual',
          horario: `Distribuido en ${semanasRestantesMes} semanas`,
          duracion: Math.round(h * 10) / 10,
          tipo: 'mensual'
        });
      }
    });
  }

  return {
    itinerario: itinerarioClon,
    rebalanceado: true,
    diaEvento,
    horaInicio: horaIni,
    horaFin: horaFin,
    motivo,
    bloquesAfectados: diagnostico.bloquesAfectados,
    horasPerdidasTotal: diagnostico.totalHorasPerdidas,
    horasRecuperadasSemana: Math.round(totalRecuperadoSemana * 10) / 10,
    desbordeMensualHoras: desbordeMensual,
    planMensual,
    logAcciones,
    mensaje: desbordeMensual === 0
      ? `✅ Rebalanceo exitoso: ${totalRecuperadoSemana}h redistribuidas en la semana sin sobrecargar ningún día.`
      : `⚠️ Rebalanceo parcial: ${totalRecuperadoSemana}h recuperadas esta semana y ${desbordeMensual}h desbordadas al plan mensual para proteger tu descanso.`
  };
}

/**
 * Calcula métricas semanales consolidando horas programadas vs reales
 */
export function calcularMetricasSemanales(itinerarioSemanal, materiasConfig = MATERIAS_CONFIG) {
  const metricasPorMateria = {};

  materiasConfig.forEach(m => {
    metricasPorMateria[m.codigo] = {
      codigo: m.codigo,
      nombre: m.nombre,
      categoria: m.categoria,
      colorHex: m.colorHex,
      metaSemanal: m.metaSemanalHoras,
      horasProgramadas: 0,
      horasCompletadas: 0,
      horasPerdidas: 0,
      horasRecuperadas: 0,
      porcentajeCumplimiento: 0
    };
  });

  Object.values(itinerarioSemanal || {}).forEach(bloquesDia => {
    (bloquesDia || []).forEach(b => {
      const met = metricasPorMateria[b.materiaCodigo];
      if (!met) return;

      const dur = Number(b.duracion) || 0;
      if (b.cancelado) {
        met.horasPerdidas += dur;
      } else {
        met.horasProgramadas += dur;
        if (b.completado) met.horasCompletadas += dur;
        if (b.esRecuperacion) met.horasRecuperadas += dur;
      }
    });
  });

  let totalMeta = 0;
  let totalProgramado = 0;
  let totalCompletado = 0;
  let totalPerdido = 0;

  Object.values(metricasPorMateria).forEach(m => {
    m.horasProgramadas = Math.round(m.horasProgramadas * 10) / 10;
    m.horasCompletadas = Math.round(m.horasCompletadas * 10) / 10;
    m.horasPerdidas = Math.round(m.horasPerdidas * 10) / 10;
    m.horasRecuperadas = Math.round(m.horasRecuperadas * 10) / 10;
    m.porcentajeCumplimiento = m.metaSemanal > 0 
      ? Math.min(100, Math.round((m.horasProgramadas / m.metaSemanal) * 100))
      : 0;

    totalMeta += m.metaSemanal;
    totalProgramado += m.horasProgramadas;
    totalCompletado += m.horasCompletadas;
    totalPerdido += m.horasPerdidas;
  });

  const porcentajeGlobal = totalMeta > 0
    ? Math.min(100, Math.round((totalProgramado / totalMeta) * 100))
    : 0;

  return {
    materias: Object.values(metricasPorMateria),
    totalMeta: Math.round(totalMeta * 10) / 10,
    totalProgramado: Math.round(totalProgramado * 10) / 10,
    totalCompletado: Math.round(totalCompletado * 10) / 10,
    totalPerdido: Math.round(totalPerdido * 10) / 10,
    porcentajeGlobal
  };
}
