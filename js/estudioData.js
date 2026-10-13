/**
 * MIGATO • Módulo de Estudio Inteligente (SIGAEE • AXIOM)
 * Base de Datos y Catálogo de Asignaturas, Horarios y Árboles Epistémicos
 * Conducción: José Gregorio 'El Gato' Briceño | Comisión Técnica MIGATO
 */

export const MATERIAS_CONFIG = [
  {
    codigo: 'MAT-ING',
    nombre: 'Matemáticas Aplicadas & Lógica Conceptual (No Mecánica)',
    categoria: 'ingenieria',
    metaSemanalHoras: 4.5,
    colorHex: '#06b6d4', // Cyan
    colorBg: 'rgba(6, 182, 212, 0.12)',
    colorBorder: 'rgba(6, 182, 212, 0.4)',
    icono: 'layers',
    demandaCognitiva: 'heavy',
    descripcion: 'Comprensión lógica, geométrica y visual de álgebra, variables, funciones y matrices (enfoque 3Blue1Brown) aplicadas al mundo real sin memorización mecánica.'
  },
  {
    codigo: 'SIS-ARQ',
    nombre: 'Sistemas, Redes MikroTik & CCTV (Dahua / Hikvision)',
    categoria: 'redes_tecnologia',
    metaSemanalHoras: 4.5,
    colorHex: '#38bdf8', // Sky
    colorBg: 'rgba(56, 189, 248, 0.12)',
    colorBorder: 'rgba(56, 189, 248, 0.4)',
    icono: 'terminal',
    demandaCognitiva: 'heavy',
    descripcion: 'Redes IP con MikroTik RouterOS (Winbox, DHCP, multi-WAN), videovigilancia Dahua/Hikvision (PoE, NVR, DMSS, Hik-Connect) y cálculo de respaldo con inversores.'
  },
  {
    codigo: 'GEO-EST',
    nombre: 'Geopolítica, Guerra y Estrategia',
    categoria: 'geopolitica',
    metaSemanalHoras: 3.0,
    colorHex: '#8b5cf6', // Púrpura
    colorBg: 'rgba(139, 92, 246, 0.12)',
    colorBorder: 'rgba(139, 92, 246, 0.4)',
    icono: 'compass',
    demandaCognitiva: 'medium',
    descripcion: 'Doctrina de relaciones internacionales (realismo, dilema de seguridad), axiomas de la guerra (Clausewitz, Sun Tzu) y geopolítica territorial.'
  },
  {
    codigo: 'ORA-CAS',
    nombre: 'Castellano, Léxico Culto & Retórica de Negocios',
    categoria: 'comunicacion',
    metaSemanalHoras: 3.5,
    colorHex: '#f59e0b', // Ámbar
    colorBg: 'rgba(245, 158, 11, 0.12)',
    colorBorder: 'rgba(245, 158, 11, 0.4)',
    icono: 'mic',
    demandaCognitiva: 'medium',
    descripcion: 'Lectura diaria de 25 min para incorporar vocabulario culto (técnica de las 3 palabras), síntesis escrita a mano de 5 líneas y diseño/práctica de firma ejecutiva.'
  },
  {
    codigo: 'ING-TEC',
    nombre: 'Inglés Técnico (Redes, CCTV, Winbox & Inversores)',
    categoria: 'idiomas',
    metaSemanalHoras: 2.0,
    colorHex: '#10b981', // Esmeralda
    colorBg: 'rgba(16, 185, 129, 0.12)',
    colorBorder: 'rgba(16, 185, 129, 0.4)',
    icono: 'globe',
    demandaCognitiva: 'light',
    descripcion: 'Lectura de datasheets oficiales (MikroTik, Dahua, Hikvision), interfaces de software (Winbox, DMSS) y manuales de inversores sin depender de traductores.'
  },
  {
    codigo: 'ECO-DIG',
    nombre: 'Negocios de Tecnología, Redes & Seguridad en Venezuela',
    categoria: 'economia',
    metaSemanalHoras: 2.0,
    colorHex: '#22c55e', // Verde
    colorBg: 'rgba(34, 197, 94, 0.12)',
    colorBorder: 'rgba(34, 197, 94, 0.4)',
    icono: 'dollar-sign',
    demandaCognitiva: 'light',
    descripcion: 'Estructura de costos de instalación, relación con importadores mayoristas de Dahua/Hikvision/MikroTik, presupuestos llave en mano y cobros multimoneda.'
  },
  {
    codigo: 'GIM-FIT',
    nombre: 'Acondicionamiento Físico & Gimnasio',
    categoria: 'bienestar',
    metaSemanalHoras: 6.0,
    colorHex: '#f97316', // Naranja
    colorBg: 'rgba(249, 115, 22, 0.12)',
    colorBorder: 'rgba(249, 115, 22, 0.4)',
    icono: 'activity',
    demandaCognitiva: 'fisica',
    descripcion: 'Entrenamiento de fuerza y acondicionamiento físico de 5:00 PM a 6:30 PM (Lunes, Martes, Jueves, Viernes).'
  },
  {
    codigo: 'OCI-LIB',
    nombre: 'Ocio, Series, Películas & Videojuegos',
    categoria: 'ocio',
    metaSemanalHoras: 6.0,
    colorHex: '#ec4899', // Rosa
    colorBg: 'rgba(236, 72, 153, 0.12)',
    colorBorder: 'rgba(236, 72, 153, 0.4)',
    icono: 'tv',
    demandaCognitiva: 'ocio',
    descripcion: 'Espacio diario garantizado para ver series y películas (con inmersión en inglés), videojuegos y desconexión mental sin culpa.'
  },
  {
    codigo: 'REU-COM',
    nombre: 'Reunión de Trabajo (Compromiso Presencial)',
    categoria: 'compromiso',
    metaSemanalHoras: 2.0,
    colorHex: '#f43f5e', // Rosa fuerte / Rojo
    colorBg: 'rgba(244, 63, 94, 0.15)',
    colorBorder: 'rgba(244, 63, 94, 0.5)',
    icono: 'users',
    demandaCognitiva: 'medium',
    descripcion: 'Reuniones de trabajo, citas presenciales y compromisos directos.'
  }
];

export const MATERIA_ORATORIA_MODELO = {
  codigo: 'ORA-RET',
  nombre: 'Oratoria, Argumentación Retórica y Liderazgo',
  categoria: 'comunicacion',
  metaSemanalHoras: 2.0,
  colorHex: '#f97316', // Naranja
  colorBg: 'rgba(249, 115, 22, 0.12)',
  colorBorder: 'rgba(249, 115, 22, 0.4)',
  icono: 'mic',
  demandaCognitiva: 'medium',
  descripcion: 'Técnicas de oratoria clásica, argumentación dialéctica, control escénico y debate persuasivo.'
};

export const DIAS_SEMANA = [
  { id: 'lunes', nombre: 'Lunes', corto: 'LUN', diaIndex: 1 },
  { id: 'martes', nombre: 'Martes', corto: 'MAR', diaIndex: 2 },
  { id: 'miercoles', nombre: 'Miércoles', corto: 'MIÉ', diaIndex: 3 },
  { id: 'jueves', nombre: 'Jueves', corto: 'JUE', diaIndex: 4 },
  { id: 'viernes', nombre: 'Viernes', corto: 'VIE', diaIndex: 5 },
  { id: 'sabado', nombre: 'Sábado', corto: 'SÁB', diaIndex: 6 }
];

/**
 * Franjas horarias estándar para Timeboxing (24h)
 */
export const FRANJAS_HORARIAS = [
  { id: 'f0', inicio: '08:00', fin: '08:30', duracionHoras: 0.5, tipo: 'matutina', label: 'Lectura Matutina' },
  { id: 'f1', inicio: '08:30', fin: '10:30', duracionHoras: 2.0, tipo: 'matutina', label: 'Mañana 1' },
  { id: 'f2', inicio: '10:45', fin: '12:15', duracionHoras: 1.5, tipo: 'matutina', label: 'Mañana 2' },
  { id: 'f3', inicio: '14:00', fin: '16:00', duracionHoras: 2.0, tipo: 'vespertina', label: 'Tarde 1' },
  { id: 'f4', inicio: '16:15', fin: '17:45', duracionHoras: 1.5, tipo: 'vespertina', label: 'Tarde 2' },
  { id: 'f5', inicio: '19:30', fin: '21:00', duracionHoras: 1.5, tipo: 'nocturna', label: 'Noche' }
];

/**
 * Plan de Estudio Mensual Estructurado en 4 Semanas de Progresión
 */
export const PLAN_MENSUAL_SEMANAS = {
  1: {
    id: 1,
    numero: 1,
    titulo: 'Semana 1: Cimientos Lógicos, Redes IP Básicas y Hábitos',
    descripcion: 'Álgebra intuitiva con variables reales, Winbox y DHCP en MikroTik, lectura matutina (25 min) y costos técnicos.',
    dias: {
      lunes: [
        { id: 's1_lun_0', materiaCodigo: 'ORA-CAS', inicio: '08:00', fin: '08:30', duracion: 0.5, tema: 'Lectura Diaria: 25 min (Técnica de las 3 palabras - Ruiz Zafón)', completado: false },
        { id: 's1_lun_1', materiaCodigo: 'MAT-ING', inicio: '08:30', fin: '10:00', duracion: 1.5, tema: 'Álgebra Conceptual: Variables como Modelos de la Realidad (3Blue1Brown)', completado: false },
        { id: 's1_lun_2', materiaCodigo: 'ING-TEC', inicio: '10:00', fin: '10:30', duracion: 0.5, tema: 'Inglés Técnico: Vocabulario de Interfaces de Red y Winbox', completado: false },
        { id: 's1_lun_3', materiaCodigo: 'SIS-ARQ', inicio: '10:30', fin: '12:00', duracion: 1.5, tema: 'Fundamentos de Redes IP: Direccionamiento 192.168.x.x, Máscaras y Gateways', completado: false },
        { id: 's1_lun_4', materiaCodigo: 'GEO-EST', inicio: '14:30', fin: '16:00', duracion: 1.5, tema: 'Conceptos Fundamentales de Geopolítica: Territorio y Recursos', completado: false },
        { id: 's1_lun_5', materiaCodigo: 'OCI-LIB', inicio: '16:00', fin: '17:00', duracion: 1.0, tema: 'Tiempo Libre y Videojuegos', completado: false },
        { id: 's1_lun_6', materiaCodigo: 'GIM-FIT', inicio: '17:00', fin: '18:30', duracion: 1.5, tema: 'Gimnasio (5:00 PM a 6:30 PM)', completado: false }
      ],
      martes: [
        { id: 's1_mar_0', materiaCodigo: 'ORA-CAS', inicio: '08:00', fin: '08:30', duracion: 0.5, tema: 'Lectura Diaria: 25 min (Prosa rica - Carlos Ruiz Zafón)', completado: false },
        { id: 's1_mar_1', materiaCodigo: 'MAT-ING', inicio: '08:30', fin: '10:00', duracion: 1.5, tema: 'Funciones Lógicas: Entradas (Input), Salidas (Output) y Relaciones', completado: false },
        { id: 's1_mar_2', materiaCodigo: 'ING-TEC', inicio: '10:00', fin: '10:30', duracion: 0.5, tema: 'Lectura de Datasheet: Router MikroTik hEX (RB750Gr3) en Inglés', completado: false },
        { id: 's1_mar_3', materiaCodigo: 'SIS-ARQ', inicio: '10:30', fin: '12:00', duracion: 1.5, tema: 'MikroTik RouterOS & Winbox: Conexión por MAC y Primeros Pasos', completado: false },
        { id: 's1_mar_reu', materiaCodigo: 'REU-COM', inicio: '14:00', fin: '16:00', duracion: 2.0, tema: '🤝 REUNIÓN DE TRABAJO (A las 2:00 PM)', completado: false },
        { id: 's1_mar_5', materiaCodigo: 'OCI-LIB', inicio: '16:00', fin: '17:00', duracion: 1.0, tema: 'Tiempo Libre y Videojuegos', completado: false },
        { id: 's1_mar_6', materiaCodigo: 'GIM-FIT', inicio: '17:00', fin: '18:30', duracion: 1.5, tema: 'Gimnasio (5:00 PM a 6:30 PM)', completado: false }
      ],
      miercoles: [
        { id: 's1_mie_0', materiaCodigo: 'ORA-CAS', inicio: '08:00', fin: '08:30', duracion: 0.5, tema: 'Lectura Diaria: 25 min (Técnica de las 3 palabras)', completado: false },
        { id: 's1_mie_1', materiaCodigo: 'MAT-ING', inicio: '08:30', fin: '10:00', duracion: 1.5, tema: 'Ecuaciones como Balanzas de Equilibrio: Visualización en Gráficas', completado: false },
        { id: 's1_mie_2', materiaCodigo: 'ING-TEC', inicio: '10:00', fin: '10:30', duracion: 0.5, tema: 'Duolingo (15 min) + Pronunciación de Acrónimos de Red (DHCP, DNS, PoE)', completado: false },
        { id: 's1_mie_3', materiaCodigo: 'SIS-ARQ', inicio: '10:30', fin: '12:00', duracion: 1.5, tema: 'DHCP Server en MikroTik: Asignación Dinámica y Reservas Estáticas', completado: false },
        { id: 's1_mie_4', materiaCodigo: 'ECO-DIG', inicio: '14:30', fin: '16:00', duracion: 1.5, tema: 'Estructura de Costos de un Servicio Técnico de Instalación en Monagas', completado: false },
        { id: 's1_mie_5', materiaCodigo: 'OCI-LIB', inicio: '16:00', fin: '17:30', duracion: 1.5, tema: 'Ocio Extendido / Día de Descanso Físico', completado: false }
      ],
      jueves: [
        { id: 's1_jue_0', materiaCodigo: 'ORA-CAS', inicio: '08:00', fin: '08:30', duracion: 0.5, tema: 'Lectura Diaria: 25 min (Ensayo y Retórica - Baltasar Gracián)', completado: false },
        { id: 's1_jue_1', materiaCodigo: 'MAT-ING', inicio: '08:30', fin: '10:00', duracion: 1.5, tema: 'Sistemas de Ecuaciones Lineales: Comprensión Geométrica de Intersección', completado: false },
        { id: 's1_jue_2', materiaCodigo: 'ING-TEC', inicio: '10:00', fin: '10:30', duracion: 0.5, tema: 'Términos de Diagnóstico: Timeout, Unreachable, Gateway, Broadcast', completado: false },
        { id: 's1_jue_3', materiaCodigo: 'SIS-ARQ', inicio: '10:30', fin: '12:00', duracion: 1.5, tema: 'Cálculo de Consumo Eléctrico de Equipos: Ley de Ohm (Watts = V × I)', completado: false },
        { id: 's1_jue_4', materiaCodigo: 'GEO-EST', inicio: '14:30', fin: '16:00', duracion: 1.5, tema: 'Pensamiento Estratégico Clásico: Sun Tzu y Conocimiento del Terreno', completado: false },
        { id: 's1_jue_5', materiaCodigo: 'OCI-LIB', inicio: '16:00', fin: '17:00', duracion: 1.0, tema: 'Tiempo Libre y Videojuegos', completado: false },
        { id: 's1_jue_6', materiaCodigo: 'GIM-FIT', inicio: '17:00', fin: '18:30', duracion: 1.5, tema: 'Gimnasio: Tracción (Espalda, Hombro Posterior y Bíceps)', completado: false }
      ],
      viernes: [
        { id: 's1_vie_0', materiaCodigo: 'ORA-CAS', inicio: '08:00', fin: '08:30', duracion: 0.5, tema: 'Lectura Diaria: 25 min (Técnica de las 3 palabras)', completado: false },
        { id: 's1_vie_1', materiaCodigo: 'MAT-ING', inicio: '08:30', fin: '10:00', duracion: 1.5, tema: 'Taller de Razonamiento Lógico: Modelar 3 Problemas Reales con Ecuaciones', completado: false },
        { id: 's1_vie_2', materiaCodigo: 'ING-TEC', inicio: '10:00', fin: '10:30', duracion: 0.5, tema: 'Lectura de Error Logs: Diagnóstico de Fallas en Equipos de Red', completado: false },
        { id: 's1_vie_3', materiaCodigo: 'SIS-ARQ', inicio: '10:30', fin: '12:00', duracion: 1.5, tema: 'Laboratorio Semanal: Montaje de Subred Local y Verificación (Ping/Tracert)', completado: false },
        { id: 's1_vie_4', materiaCodigo: 'ORA-CAS', inicio: '14:30', fin: '15:30', duracion: 1.0, tema: 'Pitch Técnico en Nota de Voz (Telegram): Explicar la Red a un Cliente', completado: false },
        { id: 's1_vie_5', materiaCodigo: 'OCI-LIB', inicio: '15:30', fin: '17:00', duracion: 1.5, tema: 'Tarde Libre y Espacio de Juegos', completado: false },
        { id: 's1_vie_6', materiaCodigo: 'GIM-FIT', inicio: '17:00', fin: '18:30', duracion: 1.5, tema: 'Gimnasio: Fullbody / Acondicionamiento Físico', completado: false }
      ],
      sabado: [
        { id: 's1_sab_1', materiaCodigo: 'ECO-DIG', inicio: '09:30', fin: '10:30', duracion: 1.0, tema: 'Logística de Cobros Multimoneda (Pago Móvil, Zelle, USDT) en Venezuela', completado: false },
        { id: 's1_sab_2', materiaCodigo: 'ING-TEC', inicio: '10:30', fin: '11:30', duracion: 1.0, tema: 'Inmersión en Video de Redes MikroTik en Inglés (NetworkChuck)', completado: false }
      ]
    }
  },
  2: {
    id: 2,
    numero: 2,
    titulo: 'Semana 2: MikroTik Avanzado, Balanceo Multi-WAN y Cableado',
    descripcion: 'Sistemas lineales visuales, Failover de internet, VLANs para CCTV, cableado estructurado UTP cat6 y mayoristas.',
    dias: {
      lunes: [
        { id: 's2_lun_0', materiaCodigo: 'ORA-CAS', inicio: '08:00', fin: '08:30', duracion: 0.5, tema: 'Lectura Diaria: 25 min (Adjetivación y vocabulario - Ruiz Zafón)', completado: false },
        { id: 's2_lun_1', materiaCodigo: 'MAT-ING', inicio: '08:30', fin: '10:00', duracion: 1.5, tema: 'Sistemas 3x3 y Matrices: Tres Ecuaciones como Planos en el Espacio', completado: false },
        { id: 's2_lun_2', materiaCodigo: 'ING-TEC', inicio: '10:00', fin: '10:30', duracion: 0.5, tema: 'Vocabulario de Firewall MikroTik: Filter, NAT, Mangle, Drop, Accept', completado: false },
        { id: 's2_lun_3', materiaCodigo: 'SIS-ARQ', inicio: '10:30', fin: '12:00', duracion: 1.5, tema: 'MikroTik Firewall & DNS: Seguridad de Red y Bloqueo de Ataques', completado: false },
        { id: 's2_lun_4', materiaCodigo: 'GEO-EST', inicio: '14:30', fin: '16:00', duracion: 1.5, tema: 'Cuellos de Botella Mundiales (Chokepoints): Rutas Marítimas y Energía', completado: false },
        { id: 's2_lun_5', materiaCodigo: 'OCI-LIB', inicio: '16:00', fin: '17:00', duracion: 1.0, tema: 'Tiempo Libre y Videojuegos', completado: false },
        { id: 's2_lun_6', materiaCodigo: 'GIM-FIT', inicio: '17:00', fin: '18:30', duracion: 1.5, tema: 'Gimnasio (5:00 PM a 6:30 PM)', completado: false }
      ],
      martes: [
        { id: 's2_mar_0', materiaCodigo: 'ORA-CAS', inicio: '08:00', fin: '08:30', duracion: 0.5, tema: 'Lectura Diaria: 25 min (Técnica de las 3 palabras)', completado: false },
        { id: 's2_mar_1', materiaCodigo: 'MAT-ING', inicio: '08:30', fin: '10:00', duracion: 1.5, tema: 'Tasa de Cambio y Pendiente: Visualizar la Velocidad de Variación en Curvas', completado: false },
        { id: 's2_mar_2', materiaCodigo: 'ING-TEC', inicio: '10:00', fin: '10:30', duracion: 0.5, tema: 'Lectura de Especificaciones: Switches PoE 802.3af vs 802.3at (PoE+)', completado: false },
        { id: 's2_mar_3', materiaCodigo: 'SIS-ARQ', inicio: '10:30', fin: '12:00', duracion: 1.5, tema: 'Balanceo Multi-WAN en MikroTik: Failover Automático (Fibra + Cantv)', completado: false },
        { id: 's2_mar_reu', materiaCodigo: 'REU-COM', inicio: '14:00', fin: '16:00', duracion: 2.0, tema: '🤝 REUNIÓN DE TRABAJO (A las 2:00 PM)', completado: false },
        { id: 's2_mar_5', materiaCodigo: 'OCI-LIB', inicio: '16:00', fin: '17:00', duracion: 1.0, tema: 'Tiempo Libre y Videojuegos', completado: false },
        { id: 's2_mar_6', materiaCodigo: 'GIM-FIT', inicio: '17:00', fin: '18:30', duracion: 1.5, tema: 'Gimnasio (5:00 PM a 6:30 PM)', completado: false }
      ],
      miercoles: [
        { id: 's2_mie_0', materiaCodigo: 'ORA-CAS', inicio: '08:00', fin: '08:30', duracion: 0.5, tema: 'Lectura Diaria: 25 min (Técnica de las 3 palabras)', completado: false },
        { id: 's2_mie_1', materiaCodigo: 'MAT-ING', inicio: '08:30', fin: '10:00', duracion: 1.5, tema: 'Polinomios y Curvas de Tendencia: Simulador Visual en GeoGebra', completado: false },
        { id: 's2_mie_2', materiaCodigo: 'ING-TEC', inicio: '10:00', fin: '10:30', duracion: 0.5, tema: 'Duolingo (15 min) + Términos de Routing: Default Route, Distance, Gateway', completado: false },
        { id: 's2_mie_3', materiaCodigo: 'SIS-ARQ', inicio: '10:30', fin: '12:00', duracion: 1.5, tema: 'VLANs y Segmentación: Separar Cámaras IP de la Red de Oficinas', completado: false },
        { id: 's2_mie_4', materiaCodigo: 'ECO-DIG', inicio: '14:30', fin: '16:00', duracion: 1.5, tema: 'Proveedores Mayoristas de Seguridad en Venezuela (Caracas/Valencia/Oriente)', completado: false },
        { id: 's2_mie_5', materiaCodigo: 'OCI-LIB', inicio: '16:00', fin: '17:30', duracion: 1.5, tema: 'Ocio Extendido / Día de Descanso Físico', completado: false }
      ],
      jueves: [
        { id: 's2_jue_0', materiaCodigo: 'ORA-CAS', inicio: '08:00', fin: '08:30', duracion: 0.5, tema: 'Lectura Diaria: 25 min (Ensayo y Retórica - Baltasar Gracián)', completado: false },
        { id: 's2_jue_1', materiaCodigo: 'MAT-ING', inicio: '08:30', fin: '10:00', duracion: 1.5, tema: 'Introducción Visual a Matrices: Tablas de Datos como Transformadores', completado: false },
        { id: 's2_jue_2', materiaCodigo: 'ING-TEC', inicio: '10:00', fin: '10:30', duracion: 0.5, tema: 'Glosario de Cableado UTP: Twisted Pair, Crosstalk, Attenuation, AWG', completado: false },
        { id: 's2_jue_3', materiaCodigo: 'SIS-ARQ', inicio: '10:30', fin: '12:00', duracion: 1.5, tema: 'Cableado Estructurado para CCTV: UTP Cat6, 100% Cobre vs CCA y T568B', completado: false },
        { id: 's2_jue_4', materiaCodigo: 'GEO-EST', inicio: '14:30', fin: '16:00', duracion: 1.5, tema: 'Clausewitz y la Fricción en Operaciones: La Realidad Frente a la Teoría', completado: false },
        { id: 's2_jue_5', materiaCodigo: 'OCI-LIB', inicio: '16:00', fin: '17:00', duracion: 1.0, tema: 'Tiempo Libre y Videojuegos', completado: false },
        { id: 's2_jue_6', materiaCodigo: 'GIM-FIT', inicio: '17:00', fin: '18:30', duracion: 1.5, tema: 'Gimnasio: Tracción (Espalda, Hombro Posterior y Bíceps)', completado: false }
      ],
      viernes: [
        { id: 's2_vie_0', materiaCodigo: 'ORA-CAS', inicio: '08:00', fin: '08:30', duracion: 0.5, tema: 'Lectura Diaria: 25 min (Técnica de las 3 palabras)', completado: false },
        { id: 's2_vie_1', materiaCodigo: 'MAT-ING', inicio: '08:30', fin: '10:00', duracion: 1.5, tema: 'Laboratorio Lógico en GeoGebra: Resolver Sistemas Gráficamente', completado: false },
        { id: 's2_vie_2', materiaCodigo: 'ING-TEC', inicio: '10:00', fin: '10:30', duracion: 0.5, tema: 'Lectura de Diagnósticos MikroTik: Torch, Ping Speed, Bandwidth Test', completado: false },
        { id: 's2_vie_3', materiaCodigo: 'SIS-ARQ', inicio: '10:30', fin: '12:00', duracion: 1.5, tema: 'Diagnóstico de Caídas de Enlace y Saturación de Tráfico con MikroTik', completado: false },
        { id: 's2_vie_4', materiaCodigo: 'ORA-CAS', inicio: '14:30', fin: '15:30', duracion: 1.0, tema: 'Monólogo en Telegram: Cómo Justificar un Router MikroTik a una Empresa', completado: false },
        { id: 's2_vie_5', materiaCodigo: 'OCI-LIB', inicio: '15:30', fin: '17:00', duracion: 1.5, tema: 'Tarde Libre y Espacio de Juegos', completado: false },
        { id: 's2_vie_6', materiaCodigo: 'GIM-FIT', inicio: '17:00', fin: '18:30', duracion: 1.5, tema: 'Gimnasio: Fullbody / Acondicionamiento Físico', completado: false }
      ],
      sabado: [
        { id: 's2_sab_1', materiaCodigo: 'ECO-DIG', inicio: '09:30', fin: '10:30', duracion: 1.0, tema: 'Cálculo de Fletes, Envíos y Tiempos de Entrega de Equipos en Monagas', completado: false },
        { id: 's2_sab_2', materiaCodigo: 'ING-TEC', inicio: '10:30', fin: '11:30', duracion: 1.0, tema: 'Inmersión en Video: Tutorial de Failover en MikroTik en Inglés', completado: false }
      ]
    }
  },
  3: {
    id: 3,
    numero: 3,
    titulo: 'Semana 3: Videovigilancia IP Profesional: Dahua y Hikvision',
    descripcion: 'Matemáticas de imagen y píxeles, cálculo de TB en H.265+, NVRs, PoE, acceso remoto en DMSS y Hik-Connect y detección SMD.',
    dias: {
      lunes: [
        { id: 's3_lun_0', materiaCodigo: 'ORA-CAS', inicio: '08:00', fin: '08:30', duracion: 0.5, tema: 'Lectura Diaria: 25 min (Precisión de conceptos - Jorge Luis Borges)', completado: false },
        { id: 's3_lun_1', materiaCodigo: 'MAT-ING', inicio: '08:30', fin: '10:00', duracion: 1.5, tema: 'Matemáticas de la Imagen Digital: Píxeles, Resolución (2MP/4MP/8MP) y 16:9', completado: false },
        { id: 's3_lun_2', materiaCodigo: 'ING-TEC', inicio: '10:00', fin: '10:30', duracion: 0.5, tema: 'Vocabulario de CCTV: Lux, Shutter Speed, Dynamic Range (WDR), IR Cut', completado: false },
        { id: 's3_lun_3', materiaCodigo: 'SIS-ARQ', inicio: '10:30', fin: '12:00', duracion: 1.5, tema: 'CCTV Digital IP vs Analógico: Ventajas de NVR sobre DVR y Topología PoE', completado: false },
        { id: 's3_lun_4', materiaCodigo: 'GEO-EST', inicio: '14:30', fin: '16:00', duracion: 1.5, tema: 'Ciberseguridad y Guerra de la Información: Vulnerabilidades en Cámaras IP', completado: false },
        { id: 's3_lun_5', materiaCodigo: 'OCI-LIB', inicio: '16:00', fin: '17:00', duracion: 1.0, tema: 'Tiempo Libre y Videojuegos', completado: false },
        { id: 's3_lun_6', materiaCodigo: 'GIM-FIT', inicio: '17:00', fin: '18:30', duracion: 1.5, tema: 'Gimnasio (5:00 PM a 6:30 PM)', completado: false }
      ],
      martes: [
        { id: 's3_mar_0', materiaCodigo: 'ORA-CAS', inicio: '08:00', fin: '08:30', duracion: 0.5, tema: 'Lectura Diaria: 25 min (Técnica de las 3 palabras)', completado: false },
        { id: 's3_mar_1', materiaCodigo: 'MAT-ING', inicio: '08:30', fin: '10:00', duracion: 1.5, tema: 'Compresión de Video y Tasa de Bits: Fórmulas de Bitrate y Ahorro H.265+', completado: false },
        { id: 's3_mar_2', materiaCodigo: 'ING-TEC', inicio: '10:00', fin: '10:30', duracion: 0.5, tema: 'Manual de Inicialización de NVR Dahua y Hikvision en Inglés', completado: false },
        { id: 's3_mar_3', materiaCodigo: 'SIS-ARQ', inicio: '10:30', fin: '12:00', duracion: 1.5, tema: 'Puesta en Marcha de NVR: Inicialización, Contraseña, IP Fija y Detección', completado: false },
        { id: 's3_mar_reu', materiaCodigo: 'REU-COM', inicio: '14:00', fin: '16:00', duracion: 2.0, tema: '🤝 REUNIÓN DE TRABAJO (A las 2:00 PM)', completado: false },
        { id: 's3_mar_5', materiaCodigo: 'OCI-LIB', inicio: '16:00', fin: '17:00', duracion: 1.0, tema: 'Tiempo Libre y Videojuegos', completado: false },
        { id: 's3_mar_6', materiaCodigo: 'GIM-FIT', inicio: '17:00', fin: '18:30', duracion: 1.5, tema: 'Gimnasio (5:00 PM a 6:30 PM)', completado: false }
      ],
      miercoles: [
        { id: 's3_mie_0', materiaCodigo: 'ORA-CAS', inicio: '08:00', fin: '08:30', duracion: 0.5, tema: 'Lectura Diaria: 25 min (Técnica de las 3 palabras)', completado: false },
        { id: 's3_mie_1', materiaCodigo: 'MAT-ING', inicio: '08:30', fin: '10:00', duracion: 1.5, tema: 'Cálculo de Almacenamiento en Disco Duro: Fórmula de Días de Grabación en TB', completado: false },
        { id: 's3_mie_2', materiaCodigo: 'ING-TEC', inicio: '10:00', fin: '10:30', duracion: 0.5, tema: 'Duolingo (15 min) + Términos de Nube P2P: QR Code, Cloud ID, Encryption', completado: false },
        { id: 's3_mie_3', materiaCodigo: 'SIS-ARQ', inicio: '10:30', fin: '12:00', duracion: 1.5, tema: 'Acceso Remoto P2P: Configuración en DMSS (Dahua) y Hik-Connect (Hikvision)', completado: false },
        { id: 's3_mie_4', materiaCodigo: 'ECO-DIG', inicio: '14:30', fin: '16:00', duracion: 1.5, tema: 'Diseño de Paquetes Comerciales de Cámaras (Kit 4 Residencial vs Kit 8 Comercial)', completado: false },
        { id: 's3_mie_5', materiaCodigo: 'OCI-LIB', inicio: '16:00', fin: '17:30', duracion: 1.5, tema: 'Ocio Extendido / Día de Descanso Físico', completado: false }
      ],
      jueves: [
        { id: 's3_jue_0', materiaCodigo: 'ORA-CAS', inicio: '08:00', fin: '08:30', duracion: 0.5, tema: 'Lectura Diaria: 25 min (Ensayo y Retórica - Baltasar Gracián)', completado: false },
        { id: 's3_jue_1', materiaCodigo: 'MAT-ING', inicio: '08:30', fin: '10:00', duracion: 1.5, tema: 'Geometría Óptica y Lentes: Distancia Focal (2.8mm vs 4mm), Ángulos y DORI', completado: false },
        { id: 's3_jue_2', materiaCodigo: 'ING-TEC', inicio: '10:00', fin: '10:30', duracion: 0.5, tema: 'Términos de IA en CCTV: SMD, Perimeter Protection, AcuSense, Tripwire', completado: false },
        { id: 's3_jue_3', materiaCodigo: 'SIS-ARQ', inicio: '10:30', fin: '12:00', duracion: 1.5, tema: 'Detección Inteligente (SMD/AcuSense): Filtro de Humanos y Vehículos', completado: false },
        { id: 's3_jue_4', materiaCodigo: 'GEO-EST', inicio: '14:30', fin: '16:00', duracion: 1.5, tema: 'Inteligencia Estratégica: Detección Temprana y Análisis de Patrones', completado: false },
        { id: 's3_jue_5', materiaCodigo: 'OCI-LIB', inicio: '16:00', fin: '17:00', duracion: 1.0, tema: 'Tiempo Libre y Videojuegos', completado: false },
        { id: 's3_jue_6', materiaCodigo: 'GIM-FIT', inicio: '17:00', fin: '18:30', duracion: 1.5, tema: 'Gimnasio: Tracción (Espalda, Hombro Posterior y Bíceps)', completado: false }
      ],
      viernes: [
        { id: 's3_vie_0', materiaCodigo: 'ORA-CAS', inicio: '08:00', fin: '08:30', duracion: 0.5, tema: 'Lectura Diaria: 25 min (Técnica de las 3 palabras)', completado: false },
        { id: 's3_vie_1', materiaCodigo: 'MAT-ING', inicio: '08:30', fin: '10:00', duracion: 1.5, tema: 'Taller de Dimensionamiento: Calcular Disco Duro y Lente para un Galpón Real', completado: false },
        { id: 's3_vie_2', materiaCodigo: 'ING-TEC', inicio: '10:00', fin: '10:30', duracion: 0.5, tema: 'Preguntas Frecuentes de Soporte Técnico en Inglés para Clientes de CCTV', completado: false },
        { id: 's3_vie_3', materiaCodigo: 'SIS-ARQ', inicio: '10:30', fin: '12:00', duracion: 1.5, tema: 'Laboratorio Integrado: Conectar Cámara IP a MikroTik, Aislar y Ver en DMSS', completado: false },
        { id: 's3_vie_4', materiaCodigo: 'ORA-CAS', inicio: '14:30', fin: '15:30', duracion: 1.0, tema: 'Simulacro de Venta: Explicar a un Cliente por qué sus Cámaras se Verán en Celular', completado: false },
        { id: 's3_vie_5', materiaCodigo: 'OCI-LIB', inicio: '15:30', fin: '17:00', duracion: 1.5, tema: 'Tarde Libre y Espacio de Juegos', completado: false },
        { id: 's3_vie_6', materiaCodigo: 'GIM-FIT', inicio: '17:00', fin: '18:30', duracion: 1.5, tema: 'Gimnasio: Fullbody / Acondicionamiento Físico', completado: false }
      ],
      sabado: [
        { id: 's3_sab_1', materiaCodigo: 'ECO-DIG', inicio: '09:30', fin: '10:30', duracion: 1.0, tema: 'Políticas de Garantía y Reposición Inmediata de Cámaras y NVRs', completado: false },
        { id: 's3_sab_2', materiaCodigo: 'ING-TEC', inicio: '10:30', fin: '11:30', duracion: 1.0, tema: 'Inmersión en Video: Comparativa Oficial Dahua vs Hikvision en Inglés', completado: false }
      ]
    }
  },
  4: {
    id: 4,
    numero: 4,
    titulo: 'Semana 4: Respaldo Energético con Inversores, Baterías y Cotizaciones',
    descripcion: 'Matemáticas de energía eléctrica (Watts/Ah/DoD), inversores de onda pura, baterías de Litio LiFePO4 y cotización formal.',
    dias: {
      lunes: [
        { id: 's4_lun_0', materiaCodigo: 'ORA-CAS', inicio: '08:00', fin: '08:30', duracion: 0.5, tema: 'Lectura Diaria: 25 min (Aforismos y persuasión - Baltasar Gracián)', completado: false },
        { id: 's4_lun_1', materiaCodigo: 'MAT-ING', inicio: '08:30', fin: '10:00', duracion: 1.5, tema: 'Matemáticas de la Energía Eléctrica: Vatios (W), Amperios-hora (Ah) y Eficiencia (%)', completado: false },
        { id: 's4_lun_2', materiaCodigo: 'ING-TEC', inicio: '10:00', fin: '10:30', duracion: 0.5, tema: 'Glosario de Energía: Pure Sine Wave, Rated Power, Peak Surge, Transfer Time', completado: false },
        { id: 's4_lun_3', materiaCodigo: 'SIS-ARQ', inicio: '10:30', fin: '12:00', duracion: 1.5, tema: 'Inversores de Onda Pura vs Modificada: Por qué los NVRs Exigen Onda Pura', completado: false },
        { id: 's4_lun_4', materiaCodigo: 'GEO-EST', inicio: '14:30', fin: '16:00', duracion: 1.5, tema: 'Seguridad Energética: La Fragilidad Eléctrica en Monagas y Resiliencia', completado: false },
        { id: 's4_lun_5', materiaCodigo: 'OCI-LIB', inicio: '16:00', fin: '17:00', duracion: 1.0, tema: 'Tiempo Libre y Videojuegos', completado: false },
        { id: 's4_lun_6', materiaCodigo: 'GIM-FIT', inicio: '17:00', fin: '18:30', duracion: 1.5, tema: 'Gimnasio (5:00 PM a 6:30 PM)', completado: false }
      ],
      martes: [
        { id: 's4_mar_0', materiaCodigo: 'ORA-CAS', inicio: '08:00', fin: '08:30', duracion: 0.5, tema: 'Lectura Diaria: 25 min (Técnica de las 3 palabras)', completado: false },
        { id: 's4_mar_1', materiaCodigo: 'MAT-ING', inicio: '08:30', fin: '10:00', duracion: 1.5, tema: 'Curvas de Descarga y Profundidad (DoD): Vida Útil de Litio LiFePO4 vs Gel', completado: false },
        { id: 's4_mar_2', materiaCodigo: 'ING-TEC', inicio: '10:00', fin: '10:30', duracion: 0.5, tema: 'Lectura de Datasheet de Baterías LiFePO4 y Sistemas BMS en Inglés', completado: false },
        { id: 's4_mar_3', materiaCodigo: 'SIS-ARQ', inicio: '10:30', fin: '12:00', duracion: 1.5, tema: 'Bancos de Baterías para Respaldo: 12V vs 24V, Ciclos y Gestión Térmica', completado: false },
        { id: 's4_mar_reu', materiaCodigo: 'REU-COM', inicio: '14:00', fin: '16:00', duracion: 2.0, tema: '🤝 REUNIÓN DE TRABAJO (A las 2:00 PM)', completado: false },
        { id: 's4_mar_5', materiaCodigo: 'OCI-LIB', inicio: '16:00', fin: '17:00', duracion: 1.0, tema: 'Tiempo Libre y Videojuegos', completado: false },
        { id: 's4_mar_6', materiaCodigo: 'GIM-FIT', inicio: '17:00', fin: '18:30', duracion: 1.5, tema: 'Gimnasio (5:00 PM a 6:30 PM)', completado: false }
      ],
      miercoles: [
        { id: 's4_mie_0', materiaCodigo: 'ORA-CAS', inicio: '08:00', fin: '08:30', duracion: 0.5, tema: 'Lectura Diaria: 25 min (Técnica de las 3 palabras)', completado: false },
        { id: 's4_mie_1', materiaCodigo: 'MAT-ING', inicio: '08:30', fin: '10:00', duracion: 1.5, tema: 'Fórmula de Autonomía de Respaldo: Horas Reales con NVR + 4 Cámaras + MikroTik', completado: false },
        { id: 's4_mie_2', materiaCodigo: 'ING-TEC', inicio: '10:00', fin: '10:30', duracion: 0.5, tema: 'Duolingo (15 min) + Términos Eléctricos: Breaker, Fuse, Grounding, DC Wiring', completado: false },
        { id: 's4_mie_3', materiaCodigo: 'SIS-ARQ', inicio: '10:30', fin: '12:00', duracion: 1.5, tema: 'Instalación Segura de Inversores: Calibre de Cables DC (AWG), Fusibles y Tierra', completado: false },
        { id: 's4_mie_4', materiaCodigo: 'ECO-DIG', inicio: '14:30', fin: '16:00', duracion: 1.5, tema: 'Cálculo del Retorno de Inversión (ROI) para Vender Respaldo Eléctrico a Negocios', completado: false },
        { id: 's4_mie_5', materiaCodigo: 'OCI-LIB', inicio: '16:00', fin: '17:30', duracion: 1.5, tema: 'Ocio Extendido / Día de Descanso Físico', completado: false }
      ],
      jueves: [
        { id: 's4_jue_0', materiaCodigo: 'ORA-CAS', inicio: '08:00', fin: '08:30', duracion: 0.5, tema: 'Lectura Diaria: 25 min (Ensayo y Retórica - Baltasar Gracián)', completado: false },
        { id: 's4_jue_1', materiaCodigo: 'MAT-ING', inicio: '08:30', fin: '10:00', duracion: 1.5, tema: 'Modelado Financiero de una Cotización: Margen Bruto, Costos y Utilidad Neta', completado: false },
        { id: 's4_jue_2', materiaCodigo: 'ING-TEC', inicio: '10:00', fin: '10:30', duracion: 0.5, tema: 'Lectura de Mensajes del Inversor: Fault Code, Low Battery, Overload Trip', completado: false },
        { id: 's4_jue_3', materiaCodigo: 'SIS-ARQ', inicio: '10:30', fin: '12:00', duracion: 1.5, tema: 'Integración Completa: Tablero Eléctrico Protegido para CCTV, Wi-Fi y Servidor', completado: false },
        { id: 's4_jue_4', materiaCodigo: 'GEO-EST', inicio: '14:30', fin: '16:00', duracion: 1.5, tema: 'Doctrina de Continuidad Operativa: Sistemas sin Punto Único de Falla (SPOF)', completado: false },
        { id: 's4_jue_5', materiaCodigo: 'OCI-LIB', inicio: '16:00', fin: '17:00', duracion: 1.0, tema: 'Tiempo Libre y Videojuegos', completado: false },
        { id: 's4_jue_6', materiaCodigo: 'GIM-FIT', inicio: '17:00', fin: '18:30', duracion: 1.5, tema: 'Gimnasio: Tracción (Espalda, Hombro Posterior y Bíceps)', completado: false }
      ],
      viernes: [
        { id: 's4_vie_0', materiaCodigo: 'ORA-CAS', inicio: '08:00', fin: '08:30', duracion: 0.5, tema: 'Lectura Diaria: 25 min (Técnica de las 3 palabras)', completado: false },
        { id: 's4_vie_1', materiaCodigo: 'MAT-ING', inicio: '08:30', fin: '10:00', duracion: 1.5, tema: 'Taller Integral de Cálculo: Dimensionar Kit Completo (Cámaras + Inversor + Batería)', completado: false },
        { id: 's4_vie_2', materiaCodigo: 'ING-TEC', inicio: '10:00', fin: '10:30', duracion: 0.5, tema: 'Defensa Oral de un Presupuesto Técnico en Inglés y Términos Comerciales', completado: false },
        { id: 's4_vie_3', materiaCodigo: 'SIS-ARQ', inicio: '10:30', fin: '12:00', duracion: 1.5, tema: 'Simulacro de Cotización Real: Armado de Propuesta Formal Llave en Mano', completado: false },
        { id: 's4_vie_4', materiaCodigo: 'ORA-CAS', inicio: '14:30', fin: '15:30', duracion: 1.0, tema: 'Pitch Comercial de Cierre: Presentar la Cotización y Cerrar el Contrato', completado: false },
        { id: 's4_vie_5', materiaCodigo: 'OCI-LIB', inicio: '15:30', fin: '17:00', duracion: 1.5, tema: 'Tarde Libre y Espacio de Juegos', completado: false },
        { id: 's4_vie_6', materiaCodigo: 'GIM-FIT', inicio: '17:00', fin: '18:30', duracion: 1.5, tema: 'Gimnasio: Fullbody / Acondicionamiento Físico', completado: false }
      ],
      sabado: [
        { id: 's4_sab_1', materiaCodigo: 'ECO-DIG', inicio: '09:30', fin: '10:30', duracion: 1.0, tema: 'Estrategia de Cierre de Ventas y Cobro de Anticipo (60% Inicial / 40% Final)', completado: false },
        { id: 's4_sab_2', materiaCodigo: 'ING-TEC', inicio: '10:30', fin: '11:30', duracion: 1.0, tema: 'Inmersión en Video: Instalación Real de Inversor Híbrido y Baterías de Litio', completado: false }
      ]
    }
  }
};

/**
 * Itinerario Semanal Base (Lunes a Sábado) pre-configurado (Semana 1 por defecto)
 */
export const ITINERARIO_BASE_SEMANAL = PLAN_MENSUAL_SEMANAS[1].dias;

/**
 * Temarios Simplificados y Herramientas Prácticas para el Estudiante
 */
export const TEMARIOS_Y_HERRAMIENTAS = {
  'MAT-ING': {
    nombre: 'Matemáticas Aplicadas & Lógica Conceptual (No Mecánica)',
    objetivo: 'Comprender el álgebra, las funciones y las matrices de forma intuitiva, visual y lógica (3Blue1Brown/GeoGebra), aplicadas a tecnología y energía sin memorizaciones mecánicas.',
    temas: [
      { id: 'mat_t1', titulo: 'La Intuición del Álgebra y las Variables (Enfoque Lógico)', descripcion: 'No es memorizar fórmulas mecánicas; es modelar relaciones reales usando letras como incógnitas lógicas (ej. calcular autonomía de batería o ancho de banda).' },
      { id: 'mat_t2', titulo: 'Ecuaciones y Balanzas de Equilibrio', descripcion: 'Despejar incógnitas como un equilibrio físico entre dos lados de una balanza en vez de reglas arbitrarias de signos.' },
      { id: 'mat_t3', titulo: 'Sistemas de Ecuaciones como Intersección Geométrica', descripcion: 'Visualizar dos o tres rectas cruzándose en un punto único en un plano cartesiano, comprendiendo la solución antes de calcular.' },
      { id: 'mat_t4', titulo: 'Funciones como Máquinas de Transformación y Gráficas', descripcion: 'Entradas (input), salidas (output) y cómo se comportan curvas de potencia eléctrica, tasas de descarga y flujo de datos.' },
      { id: 'mat_t5', titulo: 'Álgebra Lineal Visual: Matrices como Transformaciones del Espacio', descripcion: 'Las matrices como motores que deforman, rotan o proyectan espacios y redes al estilo de 3Blue1Brown, no como tablas muertas de números.' }
    ],
    herramientas: [
      { tipo: 'video', nombre: '3Blue1Brown en Español (Esencia del Álgebra Lineal y Cálculo)', desc: 'Animaciones visuales que explican la intuición geométrica de matrices y funciones antes de hacer fórmulas.', url: 'https://www.youtube.com/@3blue1brownespanol' },
      { tipo: 'web', nombre: 'Simulador Visual Interactivo GeoGebra / Desmos', desc: 'Mover deslizadores y ver gráficamente cómo cambian curvas y sistemas de ecuaciones en tiempo real.', url: 'https://www.geogebra.org/calculator' },
      { tipo: 'video', nombre: 'YouTube: Derivando (Eduardo Sáenz de Cabezón)', desc: 'Matemáticas conceptuales, trucos lógicos y aplicaciones reales sin aburrimiento memorístico.', url: 'https://www.youtube.com/@Derivando' },
      { tipo: 'web', nombre: 'Khan Academy (Álgebra I y Álgebra Lineal Intuitiva)', desc: 'Ejercicios interactivos con pistas paso a paso para consolidar la lógica.', url: 'https://es.khanacademy.org/math' }
    ]
  },
  'SIS-ARQ': {
    nombre: 'Sistemas, Redes MikroTik & CCTV (Dahua / Hikvision)',
    objetivo: 'Dominar redes IP con MikroTik, instalación de cámaras Dahua y Hikvision (NVR/PoE/P2P) y dimensionamiento de respaldo eléctrico con inversores.',
    temas: [
      { id: 'sis_t1', titulo: 'Fundamentos de Redes IP & MikroTik RouterOS', descripcion: 'Winbox, direccionamiento estático, rangos 192.168.x.x, DHCP Server, DNS y balanceo de carga multi-WAN (Fibra + Cantv).' },
      { id: 'sis_t2', titulo: 'CCTV Profesional: Cámaras IP Dahua y Hikvision', descripcion: 'Diferencias analógico vs IP, compresión H.265+, switches PoE 802.3af/at, ancho de banda y cálculo de almacenamiento en TB.' },
      { id: 'sis_t3', titulo: 'Configuración de NVR y Acceso Remoto P2P (Apps Móviles)', descripcion: 'Puesta en marcha de NVRs Dahua (app DMSS) y Hikvision (app Hik-Connect) en los teléfonos de los clientes sin IP fija.' },
      { id: 'sis_t4', titulo: 'Sistemas de Energía de Respaldo para CCTV y Redes', descripcion: 'Cálculo de consumo en Watts de NVR, switches PoE y cámaras, y dimensionamiento de inversores híbridos y bancos de baterías.' },
      { id: 'sis_t5', titulo: 'Arquitectura de Software y Persistencia Offline (SQLite)', descripcion: 'Separación modular de código y almacenamiento local seguro en Linux sin depender de internet.' }
    ],
    herramientas: [
      { tipo: 'practica', nombre: 'MikroTik Winbox & RouterOS Software', desc: 'Herramienta oficial de administración de routers y switches MikroTik.', url: 'https://mikrotik.com/download' },
      { tipo: 'doc', nombre: 'Hikvision & Dahua Calculadoras de Ancho de Banda y Lentes', desc: 'Herramientas de escritorio oficiales para calcular discos duros y ángulos de visión.', url: 'https://www.hikvision.com/es-la/support/tools/desktop-tools/' },
      { tipo: 'video', nombre: 'YouTube: Cursos de MikroTik y CCTV Dahua/Hikvision en Español', desc: 'Explicaciones paso a paso de cableado, crimpado y configuración de grabadores.', url: 'https://www.youtube.com/results?search_query=curso+mikrotik+winbox+dahua+hikvision' },
      { tipo: 'practica', nombre: 'Editor de código VS Code / Linux Terminal', desc: 'Para scripts de automatización de red y pruebas de bases de datos.', url: 'https://code.visualstudio.com' }
    ]
  },
  'GEO-EST': {
    nombre: 'Geopolítica, Guerra y Estrategia',
    objetivo: 'Comprender cómo se mueve el poder territorial en el mundo y la posición estratégica de Venezuela.',
    temas: [
      { id: 'geo_t1', titulo: 'Conceptos fundamentales de geopolítica', descripcion: 'Poder terrestre (Heartland) vs Poder marítimo (Rimland) y chokepoints energéticos.' },
      { id: 'geo_t2', titulo: 'El Dilema de Seguridad y Realismo Político', descripcion: 'Por qué en el sistema internacional cada país vela por su propia disuasión y fuerza.' },
      { id: 'geo_t3', titulo: 'Principios de estrategia (Sun Tzu y Clausewitz)', descripcion: 'La guerra como extensión de la política, economía de fuerzas y asimetría.' },
      { id: 'geo_t4', titulo: 'Geopolítica de Venezuela y Monagas', descripcion: 'Cuenca petrolera oriental, gas de Anaco/Punta de Mata y salida fluvial hacia el Atlántico.' }
    ],
    herramientas: [
      { tipo: 'video', nombre: 'YouTube: VisualPolitik / Memorias de Pez', desc: 'Análisis geopolíticos ilustrados de conflictos globales y rutas comerciales.', url: 'https://www.youtube.com/@VisualPolitik' },
      { tipo: 'lectura', nombre: 'Lectura: El Arte de la Guerra (Sun Tzu)', desc: 'Capítulos cortos sobre evaluación del terreno y toma de decisiones.', url: 'https://es.wikisource.org/wiki/El_arte_de_la_guerra' }
    ]
  },
  'ORA-CAS': {
    nombre: 'Castellano, Léxico Culto & Retórica de Negocios',
    objetivo: 'Incorporar vocabulario de alto nivel mediante lectura de 25 min diarios, dominar pausas de silencio, diseñar firma ejecutiva y redactar síntesis escritas de 5 líneas con solvencia.',
    temas: [
      { id: 'ora_t1', titulo: 'Lectura Diaria de Prosa Rica (25 minutos diarios)', descripcion: 'Lectura de autores de alta precisión léxica (Carlos Ruiz Zafón, Borges, García Márquez) para absorber giros y adjetivación natural.' },
      { id: 'ora_t2', titulo: 'La Técnica de las 3 Palabras al Día', descripcion: 'Identificar 3 términos cultos por sesión de lectura y verbalizarlos conscientemente en notas de voz y conversaciones del día.' },
      { id: 'ora_t3', titulo: 'Estructura PREP y Pitch Comercial para Clientes', descripcion: 'Punto directo -> Razón técnica -> Ejemplo de presupuesto -> Conclusión firme para cotizar instalaciones de cámaras e inversores.' },
      { id: 'ora_t4', titulo: 'Modulación de voz, respiración diafragmática y pausas', descripcion: 'Eliminar muletillas («este...», «o sea») sustituyéndolas por pausas de silencio de 2 segundos con postura erguida.' },
      { id: 'ora_t5', titulo: 'Diseño y Práctica de Firma Ejecutiva (Memoria Muscular)', descripcion: 'Diseñar una firma sólida, legible y difícil de falsificar (inicial/nombre con estructura geométrica clara y rúbrica ascendente en un solo trazo veloz). Practicar 20 repeticiones diarias en libreta para automatizar el trazo sin titubeos.' },
      { id: 'ora_t6', titulo: 'Síntesis Escrita de 5 Líneas en Libreta (Pensar, Condensar y Redactar)', descripcion: 'Al terminar los 25 min de lectura diaria, escribir a mano un párrafo de exactamente 5 líneas resumiendo la idea central e integrando las 3 palabras cultas aprendidas. El paso de la mente al papel fija el léxico en la memoria activa y agiliza el pensamiento.' }
    ],
    herramientas: [
      { tipo: 'lectura', nombre: 'Lectura Recomendada: La Sombra del Viento / Borges', desc: 'Prosa rica, adictiva y con el más alto nivel de vocabulario narrativo en español.', url: 'https://es.wikipedia.org/wiki/La_sombra_del_viento' },
      { tipo: 'doc', nombre: 'Diccionario de la Real Academia Española (DLE)', desc: 'Consulta inmediata del significado exacto y sinónimos de palabras nuevas.', url: 'https://dle.rae.es/' },
      { tipo: 'audio', nombre: 'Notas de Voz de 2 minutos en Telegram', desc: 'Grabar un monólogo diario poniendo a prueba las 3 palabras nuevas de la sesión de lectura.', url: 'https://t.me' },
      { tipo: 'practica', nombre: 'Libreta Física de Apuntes & Bolígrafo de Trazo Firme', desc: 'Soporte analógico obligatorio para redactar la síntesis diaria de 5 líneas y repetir la firma ejecutiva 20 veces.', url: 'https://es.wikipedia.org/wiki/Caligraf%C3%ADa' }
    ]
  },
  'ING-TEC': {
    nombre: 'Inglés Técnico (Redes, CCTV, Winbox & Inversores)',
    objetivo: 'Leer con total soltura manuales de Winbox, interfaces de NVRs Dahua/Hikvision, datasheets de inversores y mensajes de diagnóstico de red sin depender de traductores.',
    temas: [
      { id: 'ing_t1', titulo: 'Vocabulario de Interfaces de Red & Winbox', descripcion: 'IP address, Subnet Mask, Gateway, Bridge, Interface, Static Lease, Port Forwarding, Bandwidth, Throughput.' },
      { id: 'ing_t2', titulo: 'Lectura de Datasheets de Cámaras & NVRs', descripcion: 'Focal Length, Field of View (FOV), PoE Budget, Frame Rate (FPS), Bitrate, Day/Night Sensor, Ingress Protection (IP67).' },
      { id: 'ing_t3', titulo: 'Especificaciones de Inversores & Energía', descripcion: 'Pure Sine Wave, Rated Output, Surge Power, Battery Voltage, Depth of Discharge (DoD), Transfer Time, Cutoff Voltage.' },
      { id: 'ing_t4', titulo: 'Mensajes de Error y Diagnóstico en Inglés', descripcion: 'Host Unreachable, Connection Timed Out, DNS Probe Finished, Overload Warning, Low Battery Cutoff.' }
    ],
    herramientas: [
      { tipo: 'app', nombre: 'App Móvil Duolingo (15 min diarios)', desc: 'Mantiene el hábito y la agilidad léxica todos los días.', url: 'https://www.duolingo.com' },
      { tipo: 'doc', nombre: 'Datasheets Oficiales en Inglés (MikroTik / Dahua / Hikvision)', desc: 'Ejercicios de lectura directa de especificaciones reales de equipos.', url: 'https://mikrotik.com/products' },
      { tipo: 'video', nombre: 'YouTube: NetworkChuck / Crosstalk Solutions (con subtítulos)', desc: 'Canales de redes y CCTV en inglés para afinar oído y pronunciación técnica.', url: 'https://www.youtube.com/@NetworkChuck' }
    ]
  },
  'ECO-DIG': {
    nombre: 'Negocios de Tecnología, Redes & Seguridad en Venezuela',
    objetivo: 'Dominar la estructura de costos, margen de ganancia, negociación con distribuidores y cotizaciones formales de servicios tecnológicos en Venezuela.',
    temas: [
      { id: 'eco_t1', titulo: 'Estructura de Costos de Instalación de CCTV & Redes', descripcion: 'Cálculo de mano de obra por punto, insumos (UTP cat6, conectores RJ45, baluns, tubería), transporte e imprevistos en Monagas.' },
      { id: 'eco_t2', titulo: 'Cotizaciones Comerciales Llave en Mano', descripcion: 'Cómo estructurar y presentar una propuesta formal a un comercio o residencia con alcance, garantías y condiciones de pago claras.' },
      { id: 'eco_t3', titulo: 'Negociación con Mayoristas e Importadores en Venezuela', descripcion: 'Manejo de fletes (Caracas/Valencia/Oriente), inventario mínimo, margen de reventa de equipos y cobros multimoneda (Zelle, USDT, Bs).' },
      { id: 'eco_t4', titulo: 'Contratos de Mantenimiento y Servicios Recurrentes', descripcion: 'Planes mensuales de limpieza de cámaras, revisión de voltajes de baterías de inversores y soporte remoto de red.' }
    ],
    herramientas: [
      { tipo: 'app', nombre: 'Hoja de Cálculo de Costos y Cotizaciones (Sheets/Excel)', desc: 'Plantilla para calcular materiales, mano de obra y margen de ganancia neto en minutos.', url: 'https://sheets.google.com' },
      { tipo: 'finanzas', nombre: 'Binance P2P / El Dorado (Liquidación en USDT/Bs)', desc: 'Manejo de tesorería multimoneda y protección contra inflación cambiaria.', url: 'https://p2p.binance.com' }
    ]
  },
  'OCI-LIB': {
    nombre: 'Ocio, Series, Películas & Videojuegos (Inmersión en Inglés)',
    objetivo: 'Descanso mental sin culpa, control de series/películas pendientes en la Watchlist y aprovechamiento del entretenimiento para afinar el oído en inglés (audio original en inglés con subtítulos).',
    temas: [
      { id: 'oci_t1', titulo: 'Inmersión Auditiva: Series en Audio Original en Inglés', descripcion: 'Entrenar la comprensión auditiva viendo producciones de alta calidad en versión original en inglés con subtítulos (en inglés o español). El oído se acostumbra al ritmo real de conversación sin esfuerzo.' },
      { id: 'oci_t2', titulo: 'Series Clave Recomendadas (Tecnología, Negocios y Sistemas)', descripcion: 'Silicon Valley (servidores, compresión, rondas de inversión), Mr. Robot (ciberseguridad, terminal Linux, redes), Chernobyl (gestión de crisis, protocolos e ingeniería de fallas) y Better Call Saul (negociación, contratos y retórica).' },
      { id: 'oci_t3', titulo: 'Gestión de Watchlist Personal sin Olvidos', descripcion: 'Registrar series y películas pendientes, controlar la temporada y episodio actual con el botón rápido +1 Cap para retomar exactamente donde te quedaste sin perder el hilo.' },
      { id: 'oci_t4', titulo: 'Desconexión Cognitiva y Videojuegos', descripcion: 'Espacio diario de juego (PlayStation, emuladores, estrategia) como recompensa tras bloques de alta demanda intelectual, garantizando recuperación cerebral para el día siguiente.' }
    ],
    herramientas: [
      { tipo: 'cine', nombre: 'Mi Watchlist de Series & Cine (Módulo Integrado)', desc: 'Rastreador directo en la plataforma para llevar el control de episodios, temporadas y vocabulario nuevo.', url: '#modal-watchlist' },
      { tipo: 'video', nombre: 'Plataformas de Streaming (Netflix / Max / Prime / Stremio)', desc: 'Configurar siempre audio original en inglés y subtítulos para inmersión pasiva.', url: 'https://www.netflix.com' },
      { tipo: 'doc', nombre: 'IMDb / FilmAffinity (Fichas Técnicas & Sinopsis)', desc: 'Consulta de calificaciones, guiones y recomendaciones de cine de culto y ciencia ficción.', url: 'https://www.imdb.com' }
    ]
  }
};

/**
 * Árboles Epistémicos de Conocimiento en 3 Niveles (Compatibilidad):
 */
export const GUIAS_CONOCIMIENTO_3_NIVELES = {
  'MAT-ING': {
    materiaCodigo: 'MAT-ING',
    titulo: 'Matemáticas Pre-Ingeniería (Álgebra, Matrices & Funciones)',
    descripcion: 'Fundamentos axiomáticos de álgebra lineal, transformaciones, sistemas lineales y análisis funcional preparatorio para ingeniería.',
    axiomas: [
      {
        id: 'ax_mat_01',
        titulo: 'Axioma de Linealidad y Transformación Espacial',
        enunciado: 'Un operador lineal preserva la adición f(u + v) = f(u) + f(v) y la escala f(c·u) = c·f(u). Cualquier transformación lineal en dimensiones finitas queda completamente determinada por dónde envía los vectores de la base estándar.',
        porQueFundamental: 'Toda la ingeniería moderna (análisis de estructuras, redes eléctricas, motores de renderizado 3D y machine learning) modela sistemas complejos mediante aproximaciones lineales de primer orden.',
        criteriosDominio: [
          'Puedo interpretar una matriz cuadrada no como una tabla de números, sino como una distorsión geométrica del espacio (rotación, escala o corte)',
          'Puedo resolver e interpretar geométricamente un sistema Ax = b mediante eliminación Gaussiana y comprender cuándo no tiene solución o tiene infinitas soluciones',
          'Comprendo el determinante como el factor de escala de área/volumen y sé por qué det(A) = 0 implica pérdida de dimensión'
        ],
        ejemploUniversal: 'Proyecciones y rotaciones 3D en OpenGL/DirectX y cálculo de tensiones en mallas de elementos finitos.',
        ejemploVenezuela: 'Cálculo de distribución estática de cargas en la estructura de un galpón o análisis nodal en una red de distribución eléctrica de Corpoelec.',
        gruposConceptosIds: ['cc_mat_01', 'cc_mat_02']
      },
      {
        id: 'ax_mat_02',
        titulo: 'Axioma de Conservación Funcional y Modelado de Variación',
        enunciado: 'Una función es una relación determinista que asigna a cada elemento de un dominio un único elemento de un codominio. La razón de cambio de una función describe la dinámica del fenómeno físico subyacente.',
        porQueFundamental: 'La física y la ingeniería son el estudio de cómo una magnitud cambia en respuesta a otra (velocidad, flujo, aceleración, consumo energético).',
        criteriosDominio: [
          'Puedo graficar e interpretar intuitivamente polinomios, funciones racionales, exponenciales y trigonométricas',
          'Comprendo el concepto de asíntota y discontinuidad como límites de operación física en un sistema',
          'Puedo despejar variables y modelar un problema verbal cotidiano en una ecuación matemática sin memorizar fórmulas mágicas'
        ],
        ejemploUniversal: 'La ley de enfriamiento de Newton y modelos de crecimiento logístico poblacional.',
        ejemploVenezuela: 'Modelado del caudal de descarga del Río Guarapiche en época de lluvias o la curva de caída de tensión en líneas eléctricas largas en Monagas.',
        gruposConceptosIds: ['cc_mat_02']
      }
    ],
    gruposConceptos: [
      {
        id: 'cc_mat_01',
        nombre: 'Álgebra Lineal y Sistemas Matriciales',
        axiomasPadreIds: ['ax_mat_01'],
        conceptos: [
          {
            id: 'c_mat_01',
            nombre: 'Matrices como Transformaciones Lineales',
            definicion: 'Mapeo lineal entre espacios vectoriales expresado mediante un arreglo bidimensional donde cada columna representa el vector de base transformado.',
            analogia: 'Una lente óptica que deforma, rota o refleja un rayo de luz al pasar a través de ella.'
          },
          {
            id: 'c_mat_02',
            nombre: 'Sistemas de Ecuaciones e Interpretación Geométrica',
            definicion: 'Conjunto de hiperplanos que se intersectan en un único punto (solución única), en una recta/plano (infinitas) o nunca se cruzan (inconsistente).',
            analogia: 'Dos hojas de papel que se intersectan en una línea recta en el espacio 3D.'
          }
        ],
        detalles: [
          {
            id: 'det_mat_01',
            conceptoId: 'c_mat_01',
            tipo: 'formula',
            titulo: 'Multiplicación de Matrices como Combinación Lineal',
            contenido: 'C[:, j] = sum(B[k, j] * A[:, k]) para k=1..p. La columna j del producto es una combinación lineal de las columnas de A.',
            notas: 'Clave para programación eficiente con bibliotecas numéricas como NumPy o shaders en WebGL.'
          },
          {
            id: 'det_mat_02',
            conceptoId: 'c_mat_02',
            tipo: 'procedimiento',
            titulo: 'Eliminación Gauss-Jordan por Operaciones Elementales de Fila',
            contenido: '1. Pivoteo. 2. Hacer ceros debajo y arriba del pivote. 3. Obtener la matriz en forma escalonada reducida (RREF).',
            notas: 'Algoritmo determinista base para calcular rangos, inversas de matrices y resolver circuitos eléctricos.'
          }
        ]
      },
      {
        id: 'cc_mat_02',
        nombre: 'Teoría de Funciones, Polinomios y Precálculo',
        axiomasPadreIds: ['ax_mat_02'],
        conceptos: [
          {
            id: 'c_mat_03',
            nombre: 'Comportamiento Asintótico y Límites Intuitivos',
            definicion: 'Estudio de la tendencia de una función cuando la variable independiente tiende a infinito o a puntos críticos de indeterminación.',
            analogia: 'Un vehículo acercándose a una barrera de peaje sin llegar a tocarla jamás.'
          }
        ],
        detalles: [
          {
            id: 'det_mat_03',
            conceptoId: 'c_mat_03',
            tipo: 'formula',
            titulo: 'Factorización de Polinomios y Teorema del Resto',
            contenido: 'P(x) = (x - r) · Q(x) + R. Si P(r) = 0, entonces (x - r) es factor exacto de P(x).',
            notas: 'Herramienta fundamental para simplificar expresiones racionales y encontrar polos de estabilidad en sistemas dinámicos.'
          }
        ]
      }
    ]
  },

  'SIS-ARQ': {
    materiaCodigo: 'SIS-ARQ',
    titulo: 'Programación, Arquitectura de Sistemas & Explicación Técnica',
    descripcion: 'Diseño de software desacoplado, persistencia local-first, bases de datos relacionales y comunicación técnica asertiva hacia audiencias no especializadas.',
    axiomas: [
      {
        id: 'ax_sisarq_01',
        titulo: 'Toda Computación es Mutación Determinista de Estados',
        enunciado: 'Un sistema de software no es magia: es un conjunto finito de transformaciones de datos que reciben una entrada determinista, leen/modifican un estado y generan una salida predecible.',
        porQueFundamental: 'Desmitifica la programación. Si aislas el estado del flujo de datos, el código es comprensible, testeable y resistente a fallos en cascada.',
        criteriosDominio: [
          'Puedo trazar mentalmente el ciclo de vida de los datos desde el input del usuario hasta el disco SQLite',
          'Sé estructurar aplicaciones separando lógica de negocio pura, persistencia y componentes de interfaz gráfica',
          'Entiendo la diferencia entre complejidad accidental (frameworks innecesarios) y complejidad esencial del problema'
        ],
        ejemploUniversal: 'El patrón Modelo-Vista-Controlador (MVC) y la arquitectura hexagonal o puertos y adaptadores.',
        ejemploVenezuela: 'Sistemas que almacenan censos o inventarios de repuestos en SQLite local para funcionar aunque se caiga CANTV o Movistar en Monagas.',
        gruposConceptosIds: ['cc_sisarq_01', 'cc_sisarq_02']
      },
      {
        id: 'ax_sisarq_02',
        titulo: 'La Claridad Conceptual Precede a la Jerga Tecnológica',
        enunciado: 'Si no puedes explicar una solución técnica en 60 segundos a una persona de 60 años sin usar siglas crípticas, significa que tú mismo no comprendes la arquitectura a fondo.',
        porQueFundamental: 'En el mundo real, los presupuestos, acuerdos y decisiones los toman personas no técnicas. El ingeniero que solo sabe hablar en jerga técnica es ignorado o relegado.',
        criteriosDominio: [
          'Puedo explicar qué es una base de datos relacional usando la metáfora de un archivador físico con carpetas enlazadas',
          'Sé defender una decisión tecnológica basándome en costos operativos, velocidad y resiliencia en vez de modas',
          'Puedo estructurar un pitch de arquitectura técnica en tres actos: Problema Crítico ➔ Solución Estructural ➔ Beneficio Medible'
        ],
        ejemploUniversal: 'Steve Jobs presentando el iPod: "1,000 canciones en tu bolsillo", no "un disco duro Toshiba de 5 GB con bus FireWire".',
        ejemploVenezuela: 'Explicar a un líder comunitario o político que un sistema "funciona sin internet y no depende de servidores en el extranjero", en vez de hablar de "Local-First PWA con SQLite".',
        gruposConceptosIds: ['cc_sisarq_02']
      }
    ],
    gruposConceptos: [
      {
        id: 'cc_sisarq_01',
        nombre: 'Arquitectura Local-First y Bases de Datos',
        axiomasPadreIds: ['ax_sisarq_01'],
        conceptos: [
          {
            id: 'c_sisarq_01',
            nombre: 'Persistencia Local Soberana (SQLite / File-based)',
            definicion: 'Almacenar los datos primarios en el propio dispositivo del usuario en archivos compactos y autónomos sin necesidad de conexión de red.',
            analogia: 'Llevar un cuaderno de notas físico en el bolsillo en lugar de tener que llamar por teléfono a un asistente cada vez que quieres escribir una línea.'
          },
          {
            id: 'c_sisarq_02',
            nombre: 'Separación Estricta de Responsabilidades (SoC)',
            definicion: 'Dividir el código en módulos donde los motores de cálculo no conocen el navegador ni el HTML, permitiendo reutilizarlos en CLI o pruebas automatizadas.',
            analogia: 'El motor de un tractor agrícola: funciona exactamente igual si la cabina es de lona o de metal con aire acondicionado.'
          }
        ],
        detalles: [
          {
            id: 'det_sisarq_01',
            conceptoId: 'c_sisarq_01',
            tipo: 'codigo',
            titulo: 'Esquema Relacional SQLite con Restricciones de Integridad',
            contenido: 'CREATE TABLE sesiones (id TEXT PRIMARY KEY, materia_id TEXT NOT NULL, duracion_min INTEGER CHECK(duracion_min > 0), timestamp DATETIME DEFAULT CURRENT_TIMESTAMP);',
            notas: 'Garantiza consistencia a nivel de base de datos sin depender de validaciones frágiles en el frontend.'
          }
        ]
      },
      {
        id: 'cc_sisarq_02',
        nombre: 'Pedagogía Técnica y Pitch a Decisores',
        axiomasPadreIds: ['ax_sisarq_02'],
        conceptos: [
          {
            id: 'c_sisarq_03',
            nombre: 'Traducción Semántica de Ingeniería a Negocio',
            definicion: 'Mapear conceptos abstractos de sistemas a métricas palpables: tiempo ahorrado, costo en dólares, seguridad frente a censura y facilidad de uso.',
            analogia: 'Un traductor diplomático en la ONU que traduce entre dos idiomas radicalmente distintos sin perder el mensaje central.'
          }
        ],
        detalles: [
          {
            id: 'det_sisarq_02',
            conceptoId: 'c_sisarq_03',
            tipo: 'procedimiento',
            titulo: 'Estructura de Explicación de 3 Pasos (Axiomática)',
            contenido: '1. ¿Qué dolor resuelve? (Ej: "Evitamos perder datos cuando se corta la luz"). 2. ¿Cómo lo hace? ("Guardamos todo en disco local cada segundo"). 3. ¿Qué garantía ofrece? ("Cero costos mensuales y 100% de operatividad").',
            notas: 'Plantilla universal para reuniones con directores, profesores de ingeniería o líderes políticos.'
          }
        ]
      }
    ]
  },

  'GEO-EST': {
    materiaCodigo: 'GEO-EST',
    titulo: 'Geopolítica, Guerra y Estrategia',
    descripcion: 'Doctrina de relaciones internacionales, teorías clásicas del poder territorial y principios inmutables de estrategia militar y asimetría.',
    axiomas: [
      {
        id: 'ax_geo_01',
        titulo: 'Anarquía Internacional y Búsqueda de Supervivencia (Realismo)',
        enunciado: 'En el sistema internacional no existe un gobierno supremo vinculante que proteja a los Estados. Por tanto, cada actor soberano debe maximizar su poder, disuasión y autosuficiencia para asegurar su supervivencia física.',
        porQueFundamental: 'Elimina las ilusiones de ingenuidad moral en política global. Los tratados duran mientras las correlaciones de fuerza reales los sostienen.',
        criteriosDominio: [
          'Comprendo el Dilema de Seguridad: cómo la acción defensiva de un Estado es percibida como amenaza ofensiva por sus vecinos',
          'Distingo entre Realismo Clásico (Morgenthau), Realismo Ofensivo (Mearsheimer) e Institucionalismo Liberal',
          'Puedo analizar conflictos globales (Ucrania, Taiwán, Medio Oriente) analizando intereses estratégicos y energéticos concretos, no retórica moralista'
        ],
        ejemploUniversal: 'La Guerra del Peloponeso analizada por Tucídides: "Los fuertes hacen lo que pueden y los débiles sufren lo que deben".',
        ejemploVenezuela: 'La posición geográfica de Venezuela como bisagra entre la Cuenca del Caribe y la Amazonía, y su rol como reserva petrolera frente a Washington, Pekín y Moscú.',
        gruposConceptosIds: ['cc_geo_01', 'cc_geo_02']
      },
      {
        id: 'ax_geo_02',
        titulo: 'La Guerra es la Continuación de la Política por Otros Medios (Clausewitz)',
        enunciado: 'La violencia armada o el conflicto estratégico nunca es un fin en sí mismo: es un instrumento coactivo subordinado a un objetivo político concreto. El centro de gravedad del adversario determina la victoria.',
        porQueFundamental: 'Si el objetivo político es difuso, la victoria táctica en el terreno es inútil y conduce al desgaste ruinoso.',
        criteriosDominio: [
          'Sé identificar el "Centro de Gravedad" (Schwerpunkt) de un adversario: su punto neurálgico de cohesión que si se destruye o neutraliza derrumba todo su aparato',
          'Comprendo la doctrina de guerra asimétrica de Sun Tzu: "El supremo arte de la guerra es someter al enemigo sin librar batalla"',
          'Distingo entre táctica (ganar combates), operaciones (enlazar campañas) y gran estrategia (usar todos los recursos de la nación para la paz futura)'
        ],
        ejemploUniversal: 'La campaña de Aníbal Barca en Cannas frente a la estrategia de desgaste de Fabio Máximo.',
        ejemploVenezuela: 'El control territorial de los corredores viales y petroleros en Monagas (Caripito, Temblador, Punta de Mata) como pivote de estabilidad regional.',
        gruposConceptosIds: ['cc_geo_02']
      }
    ],
    gruposConceptos: [
      {
        id: 'cc_geo_01',
        nombre: 'Geografía del Poder y Cuencas Estratégicas',
        axiomasPadreIds: ['ax_geo_01'],
        conceptos: [
          {
            id: 'c_geo_01',
            nombre: 'Teoría del Heartland y Rimland (Mackinder / Spykman)',
            definicion: 'Quien controla el corazón terrestre de Eurasia controla la Isla Mundial, pero quien domina el cinturón costero (Rimland) frena la hegemonía continental.',
            analogia: 'El control del centro del tablero en el ajedrez contra el control de las columnas abiertas laterales.'
          },
          {
            id: 'c_geo_02',
            nombre: 'Poder Marítimo y Estrangulamiento de Chokepoints (Mahan)',
            definicion: 'El dominio de los estrechos y pasos marítimos críticos (Ormuz, Malaca, Suez, Panamá) permite asfixiar el comercio y la energía de cualquier rival.',
            analogia: 'Tener una llave de paso que corta el suministro de agua a todo un edificio residencial.'
          }
        ],
        detalles: [
          {
            id: 'det_geo_01',
            conceptoId: 'c_geo_01',
            tipo: 'procedimiento',
            titulo: 'Análisis de Vulnerabilidad Geoeconómica Regional',
            contenido: 'Mapear: 1. Rutas de transporte de crudo y gas. 2. Puntos únicos de fallo en la red eléctrica troncal. 3. Dependencia de puertos de importación de alimentos.',
            notas: 'Marco analítico aplicable directamente al Estado Monagas y la fachada atlántica del Delta del Orinoco.'
          }
        ]
      },
      {
        id: 'cc_geo_02',
        nombre: 'Doctrina de Estrategia Militar y Asimetría',
        axiomasPadreIds: ['ax_geo_02'],
        conceptos: [
          {
            id: 'c_geo_03',
            nombre: 'Guerra Asimétrica y Economía de Fuerzas',
            definicion: 'Uso de tácticas indirectas, movilidad y conocimiento del terreno para neutralizar la superioridad numérica o tecnológica de un oponente masivo.',
            analogia: 'David contra Goliat: evitar el choque cuerpo a cuerpo de espadas y usar una honda a distancia precisa.'
          }
        ],
        detalles: [
          {
            id: 'det_geo_02',
            conceptoId: 'c_geo_03',
            tipo: 'formula',
            titulo: 'Tríada de Clausewitz: Pueblo, Ejército y Gobierno',
            contenido: 'La victoria requiere alineación entre las pasiones del pueblo (apoyo moral), la destreza del ejército (capacidad técnica) y la razón del gobierno (dirección política).',
            notas: 'Si cualquiera de los tres vértices colapsa, la derrota estratégica es inevitable.'
          }
        ]
      }
    ]
  },

  'ORA-CAS': {
    materiaCodigo: 'ORA-CAS',
    titulo: 'Castellano, Retórica, Monólogos y Oratoria de Pie',
    descripcion: 'Dominio de la palabra hablada, estructura argumentativa clásica de Aristóteles y Cicerón, modulación vocal y control del pánico escénico ante auditorios exigentes.',
    axiomas: [
      {
        id: 'ax_ora_01',
        titulo: 'El Trípode Retórico Aristotélico: Ethos, Pathos y Logos',
        enunciado: 'La persuasión efectiva exige un equilibrio indisoluble: Ethos (autoridad moral y credibilidad del orador), Logos (estructura lógica irrebatible y datos comprobables) y Pathos (conexión emocional y empatía con las preocupaciones del auditorio).',
        porQueFundamental: 'Tener datos (Logos) sin credibilidad (Ethos) genera desconfianza. Tener pasión (Pathos) sin rigor lógico produce fanatismo efímero. Conectar los tres es la única forma de convencer a personas mayores o adversarios.',
        criteriosDominio: [
          'Sé cómo proyectar autoridad técnica y seriedad sin arrogancia cuando me dirijo a personas de 50 o 60 años',
          'Puedo estructurar un argumento lógico que no cometa falacias ad hominem ni hombres de paja',
          'Sé cómo modular mi tono de voz para evitar la monotonía y mantener la atención activa de la sala'
        ],
        ejemploUniversal: 'La oración fúnebre de Pericles en Atenas y el discurso de Marco Antonio en el Julio César de Shakespeare.',
        ejemploVenezuela: 'Intervenciones en salas de debate político en Monagas donde un joven técnico de 22 años debe ganarse el respeto inmediato de dirigentes experimentados.',
        gruposConceptosIds: ['cc_ora_01', 'cc_ora_02']
      },
      {
        id: 'ax_ora_02',
        titulo: 'La Fisiología Gobierna la Mente: Respiración y Dominio Espacial',
        enunciado: 'El miedo a hablar en público y el bloqueo mental ("quedarse callado") es una respuesta biológica del sistema nervioso simpático (lucha o huida). Se desactiva físicamente con respiración diafragmática profunda y postura erguida.',
        porQueFundamental: 'No puedes razonar con claridad si tu cuerpo le está enviando señales de asfixia y taquicardia al cerebro. El cuerpo debe calmar a la mente antes de que las palabras salgan.',
        criteriosDominio: [
          'Practico la respiración 4x4 (box breathing) antes de hablar para bajar las pulsaciones por minuto',
          'Mantengo contacto visual rotativo de 3 segundos con personas clave de la sala en vez de mirar al suelo o al techo',
          'Sé cómo hacer pausas de silencio deliberadas de 2 segundos en lugar de llenar los vacíos con muletillas ("ehh", "este", "o sea")'
        ],
        ejemploUniversal: 'Entrenamiento de oratoria de los estadistas romanos como Cicerón practicando con piedras en la boca frente al mar.',
        ejemploVenezuela: 'Pararse frente a una asamblea o reunión de comando en Maturín con voz firme y volumen que alcance el fondo del salón sin gritar.',
        gruposConceptosIds: ['cc_ora_02']
      }
    ],
    gruposConceptos: [
      {
        id: 'cc_ora_01',
        nombre: 'Estructura Discursiva Clásica (Cicerón)',
        axiomasPadreIds: ['ax_ora_01'],
        conceptos: [
          {
            id: 'c_ora_01',
            nombre: 'Los 4 Bloques Inamovibles del Discurso',
            definicion: '1. Exordio (captar atención inmediata). 2. Narratio (exposición de los hechos claros). 3. Refutatio (anticipar y desarmar las objeciones del rival). 4. Peroratio (llamado contundente a la acción).',
            analogia: 'Un despegue de avión: carrera potente en pista, ascenso suave, atravesar la turbulencia y aterrizaje seguro en el destino.'
          }
        ],
        detalles: [
          {
            id: 'det_ora_01',
            conceptoId: 'c_ora_01',
            tipo: 'procedimiento',
            titulo: 'Técnica del Monólogo Diario de 2 Minutos en Telegram',
            contenido: '1. Escoger un tema diario. 2. Grabar nota de voz de 120 segundos sin parar. 3. Escuchar la grabación y evaluar muletillas, pausas y claridad de ideas.',
            notas: 'La mejor herramienta para vencer la timidez y crear soltura lingüística sin público que juzgue.'
          }
        ]
      },
      {
        id: 'cc_ora_02',
        nombre: 'Dicción, Caligrafía y Proyección Física',
        axiomasPadreIds: ['ax_ora_02'],
        conceptos: [
          {
            id: 'c_ora_02',
            nombre: 'Articulación Muscular y Caligrafía de Firma',
            definicion: 'El control motriz fino de la articulación bucal (consonantes nítidas) y de la mano (trazos caligráficos firmes y firma profesional) reflejan disciplina interior.',
            analogia: 'Afinar las cuerdas de una guitarra antes de dar un concierto: si las cuerdas están flojas, la música suena sucia.'
          }
        ],
        detalles: [
          {
            id: 'det_ora_02',
            conceptoId: 'c_ora_02',
            tipo: 'procedimiento',
            titulo: 'Diseño y Práctica de Firma Profesional',
            contenido: '1. Elegir un trazo base continuo con la inicial y apellido legible. 2. Repetir 50 veces seguidas en papel con bolígrafo de gel manteniendo la misma velocidad e inclinación.',
            notas: 'Construye memoria muscular y elimina la inseguridad gráfica en actas y documentos técnicos.'
          }
        ]
      }
    ]
  },

  'ING-TEC': {
    materiaCodigo: 'ING-TEC',
    titulo: 'Inglés Técnico & Inmersión Práctica',
    descripcion: 'Adquisición acelerada de lectura de documentación técnica de ingeniería, sintaxis directa y conversación práctica sin sobrecarga gramatical teórica.',
    axiomas: [
      {
        id: 'ax_ing_01',
        titulo: 'Input Comprensible: Se Adquiere por Comprensión, no por Memorización (Krashen)',
        enunciado: 'El cerebro humano no aprende idiomas memorizando listas aisladas de vocabulario o tablas gramaticales, sino procesando mensajes que comprende en un 80% con un 20% de contexto nuevo (Hipótesis i + 1).',
        porQueFundamental: 'Explica por qué años de aplicaciones como Duolingo dejan a las personas estancadas: hacer ejercicios de selección múltiple no entrena la maquinaria cerebral de procesamiento lingüístico en tiempo real.',
        criteriosDominio: [
          'Puedo leer la documentación oficial de Python, Linux man pages o especificaciones de ingeniería sin traducir palabra por palabra en la mente',
          'Entiendo la idea general de un video técnico en inglés con subtítulos en inglés a velocidad 1x',
          'Dedico al menos 15 minutos diarios a consumir contenido técnico nativo en inglés sobre sistemas o matemáticas'
        ],
        ejemploUniversal: 'Un niño que aprende su lengua materna escuchando y asociando acciones con sonidos sin saber qué es el pretérito pluscuamperfecto.',
        ejemploVenezuela: 'Leer los esquemas de circuitos, datasheets de microcontroladores y manuales de maquinaria pesada que solo vienen en inglés.',
        gruposConceptosIds: ['cc_ing_01', 'cc_ing_02']
      },
      {
        id: 'ax_ing_02',
        titulo: 'El Inglés Técnico es Ultra-Determinista: Sujeto + Verbo + Objeto (SVO)',
        enunciado: 'A diferencia del español (que permite inversiones sintácticas poéticas), el inglés técnico de ingeniería sigue una estructura geométrica rígida e invariable: Quien hace la acción (Subject) ➔ Qué hace (Verb) ➔ A qué se lo hace (Object).',
        porQueFundamental: 'Elimina el miedo a hablar. Si armas frases de 5 palabras con la fórmula Sujeto + Verbo + Objeto, el 100% de los ingenieros del mundo te entenderán perfectamente.',
        criteriosDominio: [
          'Construyo oraciones directas sin ambigüedad: "The database stores the logs locally"',
          'Domino los verbos modales clave de ingeniería: Must (obligación), Should (recomendación), May (posibilidad)',
          'No intento sonar sofisticado; priorizo la precisión milimétrica del mensaje'
        ],
        ejemploUniversal: 'La redacción de los estándares RFC de la IETF y las normas de ingeniería IEEE.',
        ejemploVenezuela: 'Escribir un issue en GitHub o reportar un bug en un software de código abierto con claridad profesional.',
        gruposConceptosIds: ['cc_ing_01']
      }
    ],
    gruposConceptos: [
      {
        id: 'cc_ing_01',
        nombre: 'Sintaxis Nuclear y Vocabulario Técnico de Ingeniería',
        axiomasPadreIds: ['ax_ing_02'],
        conceptos: [
          {
            id: 'c_ing_01',
            nombre: 'Verbos Modales y Estándares de Especificación (RFC 2119)',
            definicion: 'Uso de palabras clave precisas que delimitan requerimientos técnicos: MUST (estricto), MUST NOT, SHOULD (deseable), MAY (opcional).',
            analogia: 'Los colores de las luces de tránsito: verde, amarillo y rojo tienen significados operacionales exactos.'
          }
        ],
        detalles: [
          {
            id: 'det_ing_01',
            conceptoId: 'c_ing_01',
            tipo: 'formula',
            titulo: 'Fórmula de Pregunta Técnica en Inglés',
            contenido: 'Auxiliar (Does/Is/Can) + Sujeto + Verbo Base + Objeto? -> "Does this function handle offline errors?"',
            notas: 'Plantilla universal para interactuar con documentación técnica y LLMs en modo voz.'
          }
        ]
      },
      {
        id: 'cc_ing_02',
        nombre: 'Inmersión Práctica con Gemini Voice y Asistentes',
        axiomasPadreIds: ['ax_ing_01'],
        conceptos: [
          {
            id: 'c_ing_02',
            nombre: 'Shadowing y Práctica Conversacional Asistida por IA',
            definicion: 'Repetir en voz alta frases inmediatamente después de escucharlas para adaptar los músculos de la mandíbula y lengua a la fonética anglosajona.',
            analogia: 'Tocar una canción en guitarra imitando nota por nota al maestro mientras suena la pista de fondo.'
          }
        ],
        detalles: [
          {
            id: 'det_ing_02',
            conceptoId: 'c_ing_02',
            tipo: 'procedimiento',
            titulo: 'Rutina de 10 Minutos con Gemini Voice en el Teléfono',
            contenido: '1. Abrir app de Gemini en modo voz. 2. Dar instrucción: "Act as my English tutor for a pre-engineering student. Let\'s have a 5-minute conversation about computers. Correct my pronunciation gently." 3. Hablar 5 minutos diarios.',
            notas: 'Cero costo, disponibilidad 24/7 y sin la vergüenza de hablar con un humano al inicio.'
          }
        ]
      }
    ]
  },

  'ECO-DIG': {
    materiaCodigo: 'ECO-DIG',
    titulo: 'Economía Digital, Comercio & Criptoactivos',
    descripcion: 'Mecanismos de dinero fiduciario vs activos duros, infraestructura de pagos electrónicos, conversión de valor y logística de comercio digital en economías complejas.',
    axiomas: [
      {
        id: 'ax_eco_01',
        titulo: 'El Dinero es un Sistema de Contabilidad Social sobre la Escasez',
        enunciado: 'El dinero no tiene valor intrínseco por decreto; funciona como medio de intercambio, reserva de valor y unidad de cuenta únicamente cuando sus participantes confían en su escasez predecible y en la dificultad de falsificarlo o confiscarlo.',
        porQueFundamental: 'Permite comprender por qué las monedas fiduciarias sin respaldo sufren hiperinflación y cómo la tecnología criptográfica reintroduce la escasez digital estricta.',
        criteriosDominio: [
          'Entiendo la diferencia entre dinero respaldado por emisión estatal centralizada y redes monetarias descentralizadas basadas en consenso criptográfico',
          'Comprendo cómo la inflación funciona como un impuesto invisible sobre el ahorro que destruye la planificación a largo plazo',
          'Sé cómo funciona el arbitraje cambiario y la tasa marginal de precios en mercados libres'
        ],
        ejemploUniversal: 'La evolución desde el patrón oro hasta los acuerdos de Bretton Woods y la aparición de Bitcoin tras la crisis de 2008.',
        ejemploVenezuela: 'La historia monetaria del Bolívar frente al Dólar y la adopción masiva de USDT en plataformas P2P (Binance, El Dorado) para transacciones comerciales diarias en Monagas.',
        gruposConceptosIds: ['cc_eco_01', 'cc_eco_02']
      },
      {
        id: 'ax_eco_02',
        titulo: 'El Comercio Digital es Reducción de Fricción de Búsqueda y Confianza',
        enunciado: 'Un negocio de e-commerce exitoso no vende productos; vende conveniencia, velocidad de entrega y certidumbre en la transacción. Quien controla la pasarela de pagos y el canal de distribución captura el margen económico.',
        porQueFundamental: 'Hacer páginas web o catálogos es irrelevante si no existe un embudo de ventas que resuelva la entrega física y el cobro sin fricción.',
        criteriosDominio: [
          'Entiendo el ciclo de conversión: Tráfico ➔ Captura de Prospecto ➔ Cierre de Venta ➔ Despacho Logístico ➔ Retención',
          'Sé por qué el canal de mensajería directa (WhatsApp Business) es el rey indiscutible de las conversiones en Venezuela por encima del email marketing',
          'Puedo calcular el margen neto real deduciendo comisiones de pasarela, merma y costo logístico de última milla'
        ],
        ejemploUniversal: 'El modelo logístico de Amazon Fulfillment y las tiendas direct-to-consumer en Shopify.',
        ejemploVenezuela: 'Ventas por WhatsApp y redes sociales con entregas en Maturín mediante motorizados y cobro por Pago Móvil o Binance Pay.',
        gruposConceptosIds: ['cc_eco_02']
      }
    ],
    gruposConceptos: [
      {
        id: 'cc_eco_01',
        nombre: 'Criptoactivos y Pasarelas de Valor Soberanas',
        axiomasPadreIds: ['ax_eco_01'],
        conceptos: [
          {
            id: 'c_eco_01',
            nombre: 'Stablecoins y Mercados Peer-to-Peer (P2P)',
            definicion: 'Tokens digitales indexados al dólar estadounidense (USDT, USDC) transferidos a través de blockchains públicas, intercambiados por moneda local mediante plataformas P2P con custodia en fideicomiso (escrow).',
            analogia: 'Un intercambio de fichas de casino donde un intermediario retiene las fichas hasta que ambas partes confirman que el dinero fue depositado en el banco.'
          }
        ],
        detalles: [
          {
            id: 'det_eco_01',
            conceptoId: 'c_eco_01',
            tipo: 'procedimiento',
            titulo: 'Flujo Seguro de Liquidación P2P',
            contenido: '1. Verificar perfil con alta tasa de completitud (>98%). 2. Confirmar fondos recibidos en cuenta bancaria real ANTES de liberar los criptoactivos en la app. 3. Nunca aceptar pagos de terceros.',
            notas: 'Regla de oro para evitar bloqueos bancarios o estafas por transferencias reversibles.'
          }
        ]
      },
      {
        id: 'cc_eco_02',
        nombre: 'E-Commerce Táctico y Logística Local en Venezuela',
        axiomasPadreIds: ['ax_eco_02'],
        conceptos: [
          {
            id: 'c_eco_02',
            nombre: 'Conversión por Canales Conversacionales (Chat-Commerce)',
            definicion: 'Modelo de venta directa donde la interacción, demostración del producto, resolución de dudas y cierre del pago ocurre dentro de aplicaciones de chat en vez de carritos de compra web tradicionales.',
            analogia: 'Entrar a una tienda de barrio donde el dependiente te atiende en el mostrador personalmente en vez de navegar por un pasillo gigante con un carrito de metal.'
          }
        ],
        detalles: [
          {
            id: 'det_eco_02',
            conceptoId: 'c_eco_02',
            tipo: 'formula',
            titulo: 'Cálculo de Margen de Contribución Unitario',
            contenido: 'Margen = Precio Venta - (Costo Producto + Comisión Pasarela Pago + Costo Delivery + Empaque)',
            notas: 'Permite saber exactamente cuánta ganancia neta queda en el bolsillo por cada producto despachado.'
          }
        ]
      }
    ]
  },

  'SIS-OPSEC': {
    materiaCodigo: 'SIS-OPSEC',
    titulo: 'Arquitectura de Software y Sistemas Distribuidos Soberanos',
    descripcion: 'Diseño de software resiliente y seguro bajo primeros principios de computación.',
    axiomas: [
      {
        id: 'ax_sis_01',
        titulo: 'Toda computación es transformación de estados',
        enunciado: 'Un programa es una secuencia determinista que toma datos en un estado inicial y produce un nuevo estado mediante operaciones primitivas.',
        porQueFundamental: 'Elimina el misticismo del software. Si controlas el estado y el flujo de mutación, el sistema es 100% predecible y debuggeable.',
        criteriosDominio: [
          'Puedo explicar cómo viaja un byte desde la memoria hasta la pantalla',
          'Puedo diseñar funciones puras sin efectos secundarios inesperados',
          'Puedo modelar la arquitectura como una máquina de estados finitos'
        ],
        ejemploUniversal: 'Una función pura f(x) = y en programación funcional o el pipeline de un procesador RISC.',
        ejemploVenezuela: 'Una base de datos local SQLite que se actualiza sin conexión a internet y sincroniza con el servidor cuando regresa la luz.',
        gruposConceptosIds: ['cc_sis_01', 'cc_sis_02']
      },
      {
        id: 'ax_sis_02',
        titulo: 'La red es inherentemente no confiable (Offline-First)',
        enunciado: 'Cualquier paquete enviado a través de la red puede retrasarse, duplicarse, corromperse o no llegar nunca.',
        porQueFundamental: 'Obliga a diseñar sistemas donde el almacenamiento local es la fuente inmediata de verdad y la red es solo un canal de transporte secundario.',
        criteriosDominio: [
          'Nunca bloqueo la interfaz esperando una respuesta HTTP',
          'Diseño con persistencia local antes de llamar a APIs externas',
          'Implemento mecanismos de sincronización idempotentes'
        ],
        ejemploUniversal: 'Teorema CAP y arquitecturas Local-First con CRDTs o Event Sourcing.',
        ejemploVenezuela: 'La aplicación de campo MIGATO en Maturín: funciona en La Puente sin señal 4G y envía los reportes al reconectar.',
        gruposConceptosIds: ['cc_sis_02']
      }
    ],
    gruposConceptos: [
      {
        id: 'cc_sis_01',
        nombre: 'Arquitectura Limpia y Modularidad',
        axiomasPadreIds: ['ax_sis_01'],
        conceptos: [
          {
            id: 'c_sis_01',
            nombre: 'Separación de Responsabilidades (SoC)',
            definicion: 'Dividir el sistema en capas independientes donde la lógica de negocio no dependa del framework ni del navegador.',
            analogia: 'El motor de un vehículo funciona con los mismos principios mecánicos sin importar si el volante es de madera o de cuero.'
          },
          {
            id: 'c_sis_02',
            nombre: 'Inversión de Control y Dependencias',
            definicion: 'Los módulos de alto nivel no deben depender de los módulos de bajo nivel; ambos deben depender de abstracciones.',
            analogia: 'Un tomacorriente estándar de pared: cualquier electrodoméstico se conecta sin conocer el generador eléctrico de la ciudad.'
          }
        ],
        detalles: [
          {
            id: 'det_sis_01',
            conceptoId: 'c_sis_01',
            tipo: 'codigo',
            titulo: 'Patrón Repository en JavaScript Vanilla',
            contenido: 'const store = { get: (id) => JSON.parse(localStorage.getItem(id)), save: (id, data) => localStorage.setItem(id, JSON.stringify(data)) };',
            notas: 'Garantiza que la UI solo pida datos a "store" sin importar si detrás hay IndexedDB, SQLite o memoria.'
          },
          {
            id: 'det_sis_02',
            conceptoId: 'c_sis_02',
            tipo: 'procedimiento',
            titulo: 'Auditoría de Acoplamiento',
            contenido: 'Verificar con grep que los archivos de lógica no importen elementos del DOM ni librerías externas de UI.',
            notas: 'Permite reutilizar la lógica en Node.js o pruebas unitarias sin dependencias de navegador.'
          }
        ]
      },
      {
        id: 'cc_sis_02',
        nombre: 'Almacenamiento Local y Resiliencia Eléctrica',
        axiomasPadreIds: ['ax_sis_01', 'ax_sis_02'],
        conceptos: [
          {
            id: 'c_sis_03',
            nombre: 'Operaciones Idempotentes',
            definicion: 'Operaciones que pueden ejecutarse múltiples veces consecutivas produciendo exactamente el mismo resultado final sin duplicaciones.',
            analogia: 'El botón de ascensor: presionarlo diez veces seguidas te lleva al mismo piso sin multiplicar la acción.'
          }
        ],
        detalles: [
          {
            id: 'det_sis_03',
            conceptoId: 'c_sis_03',
            tipo: 'formula',
            titulo: 'Regla de Identificadores UUIDv4',
            contenido: 'const id = crypto.randomUUID(); // Clave primaria inmutable para sincronización asíncrona',
            notas: 'Evita colisiones de IDs autonuméricos cuando dos computadoras registran datos offline al mismo tiempo.'
          }
        ]
      }
    ]
  },

  'ECO-OBR': {
    materiaCodigo: 'ECO-OBR',
    titulo: 'Economía Política y Presupuestos de Obras Públicas',
    descripcion: 'Fundamentos económicos para la reconstrucción física de Monagas con optimización de recursos.',
    axiomas: [
      {
        id: 'ax_eco_01',
        titulo: 'La escasez es el axioma basal de toda decisión humana',
        enunciado: 'Los recursos materiales, temporales y energéticos son finitos; las necesidades y deseos humanos son ilimitados.',
        porQueFundamental: 'Toda elección implica elegir qué se hace y obligatoriamente qué se deja de hacer (Costo de Oportunidad).',
        criteriosDominio: [
          'Puedo explicar por qué "gratis" no existe en la economía real',
          'Puedo calcular el costo de oportunidad de destinar asfalto a una vía vs a otra',
          'Puedo priorizar inversiones según retorno social y económico'
        ],
        ejemploUniversal: 'La frontera de posibilidades de producción (FPP) entre bienes de consumo y bienes de capital.',
        ejemploVenezuela: 'El presupuesto municipal de Maturín: cada dólar malgastado en propaganda es un dólar menos para comprar transformadores eléctricos o asfalto en La Puente.',
        gruposConceptosIds: ['cc_eco_01']
      },
      {
        id: 'ax_eco_02',
        titulo: 'Los precios son señales de información condensada',
        enunciado: 'El precio de mercado refleja la escasez relativa de un bien y las valoraciones subjetivas de millones de personas.',
        porQueFundamental: 'Los controles artificiales de precios destruyen la información, generando desabastecimiento crónico y mercados negros.',
        criteriosDominio: [
          'Comprendo por qué los controles de precios fracasan matemáticamente',
          'Identifico cómo la inflación distorsiona el cálculo económico de obras',
          'Sé cómo dolarizar o indexar un presupuesto de obra pública para evitar quiebra'
        ],
        ejemploUniversal: 'El artículo "The Use of Knowledge in Society" de Friedrich Hayek (1945).',
        ejemploVenezuela: 'El congelamiento de tarifas eléctricas y de gasolina en Venezuela que terminó colapsando el SEN y PDVSA.',
        gruposConceptosIds: ['cc_eco_01']
      }
    ],
    gruposConceptos: [
      {
        id: 'cc_eco_01',
        nombre: 'Análisis de Precios Unitarios (APU) y Costos Viales',
        axiomasPadreIds: ['ax_eco_01', 'ax_eco_02'],
        conceptos: [
          {
            id: 'c_eco_01',
            nombre: 'Estructura de Costo Tripartita (Materiales, Equipos, Mano de Obra)',
            definicion: 'Toda partida de obra se descompone en la suma ponderada del insumo físico, la depreciación horaria de maquinaria y el costo del trabajo humano.',
            analogia: 'Preparar una arepa: la harina y el queso (materiales), el budare y el gas (equipos), y el tiempo del cocinero (mano de obra).'
          }
        ],
        detalles: [
          {
            id: 'det_eco_01',
            conceptoId: 'c_eco_01',
            tipo: 'formula',
            titulo: 'Cálculo de Toneladas de Asfalto para Bacheo',
            contenido: 'Toneladas = Superficie (m²) × Espesor (m) × Densidad (2.4 ton/m³) × Factor Compactación (1.15)',
            notas: 'Fórmula oficial de ingeniería vial para presupuestar carpetas de rodamiento en Monagas.'
          }
        ]
      }
    ]
  },

  'POL-MIG': {
    materiaCodigo: 'POL-MIG',
    titulo: 'Doctrina Política MIGATO, Liderazgo y Victoria Democrática',
    descripcion: 'Principios rectores de conducción política de José Gregorio El Gato Briceño frente al chavismo.',
    axiomas: [
      {
        id: 'ax_pol_01',
        titulo: 'El poder político emana de la confianza y el arraigo popular',
        enunciado: 'Un líder democrático se sostiene en la legitimidad de su conducta, su cercanía física con el pueblo y la palabra empeñada.',
        porQueFundamental: 'La imposición burocrática se derrumba cuando se corta el flujo de dinero o coerción; el liderazgo orgánico resiste en el exilio o bajo persecución.',
        criteriosDominio: [
          'Distingo entre movilización comprada (clientelar) y movilización por convicción cívica',
          'Sé estructurar un mensaje que apele a la dignidad de la familia monaguense',
          'Mantengo la disciplina de no utilizar jamás el vocabulario del opresor chavista'
        ],
        ejemploUniversal: 'El principio de soberanía popular en Montesquieu y la resistencia civil de Václav Havel.',
        ejemploVenezuela: 'La trayectoria de El Gato Briceño en Monagas: ganar con votos propios frente al aparato centralizador de Caracas.',
        gruposConceptosIds: ['cc_pol_01']
      },
      {
        id: 'ax_pol_02',
        titulo: 'La verdad y la infraestructura visible son el antídoto contra la propaganda',
        enunciado: 'Las obras civiles tangibles que mejoran la vida diaria de los ciudadanos no pueden ser borradas por discursos ideológicos.',
        porQueFundamental: 'El ciudadano juzga por los hechos: si hay agua en la tubería, si la carretera está asfaltada y si el hospital funciona.',
        criteriosDominio: [
          'Puedo defender con cifras y obras concretas la gestión histórica de El Gato Briceño',
          'Sé contrastar el deterioro actual del PSUV con el plan de gobierno MIGATO 2026',
          'Conozco la geografía humana de los 13 municipios de Monagas'
        ],
        ejemploUniversal: 'El principio romano de monumentalidad y obras de servicio público como base de la república.',
        ejemploVenezuela: 'Las escuelas, ambulatorios y vialidad construidas durante el mandato de El Gato Briceño que aún permanecen de pie.',
        gruposConceptosIds: ['cc_pol_01']
      }
    ],
    gruposConceptos: [
      {
        id: 'cc_pol_01',
        nombre: 'Estrategia Territorial y Comandos Gateros',
        axiomasPadreIds: ['ax_pol_01', 'ax_pol_02'],
        conceptos: [
          {
            id: 'c_pol_01',
            nombre: 'Estructura Celular y Red de Testigos Electorales',
            definicion: 'Organización de base donde cada centro de votación cuenta con defensores del voto formados y coordinados.',
            analogia: 'Un panal de abejas: cada celda tiene su función y autonomía, pero todas defienden el mismo objetivo.'
          }
        ],
        detalles: [
          {
            id: 'det_pol_01',
            conceptoId: 'c_pol_01',
            tipo: 'procedimiento',
            titulo: 'Protocolo de Resguardo de Actas de Votación',
            contenido: 'Firma digital de actas, digitalización inmediata con celular y reporte cifrado a la Sala Situacional.',
            notas: 'Garantiza la prueba material de la victoria cívica ante cualquier intento de alteración.'
          }
        ]
      }
    ]
  },

  'ORA-RET': {
    materiaCodigo: 'ORA-RET',
    titulo: 'Oratoria Clásica, Retórica y Debate Persuasivo',
    descripcion: 'Fundamentos de persuasión, estructuración del discurso y dominio escénico bajo primeros principios.',
    axiomas: [
      {
        id: 'ax_ora_01',
        titulo: 'El Trípode Aristotélico: Ethos, Pathos y Logos',
        enunciado: 'Todo acto comunicativo eficaz requiere autoridad moral (Ethos), resonancia emocional humana (Pathos) y rigor argumental lógico (Logos).',
        porQueFundamental: 'El intelecto solo acepta argumentos cuando confía en el carácter del orador y siente que el mensaje toca sus necesidades vitales.',
        criteriosDominio: [
          'Puedo identificar qué pilar falla en un discurso plano o demagógico',
          'Sé estructurar un discurso de 5 minutos con introducción empática, nudo lógico y llamada a la acción moral',
          'Domino la técnica del silencio deliberado antes de una afirmación clave'
        ],
        ejemploUniversal: 'La Retórica de Aristóteles y los discursos de Cicerón ante el Senado romano.',
        ejemploVenezuela: 'Hablarle a una comunidad en Maturín: validar su sufrimiento real (agua/luz) antes de proponer el plan técnico de solución.',
        gruposConceptosIds: ['cc_ora_01']
      },
      {
        id: 'ax_ora_02',
        titulo: 'La Claridad Estructural Precede a la Pasión',
        enunciado: 'Un discurso sin esqueleto lógico es solo ruido; la pasión conmueve pero solo la estructura convence y perdura.',
        porQueFundamental: 'La memoria de la audiencia tiene capacidad de retención limitada (regla de los 3 puntos). Sin hilo conductor, el mensaje se disipa.',
        criteriosDominio: [
          'Sé aplicar la regla de tres ideas maestras en cualquier presentación',
          'Puedo resumir la tesis de un discurso de 30 minutos en una sola oración contundente',
          'Elimino el 100% de muletillas reemplazándolas por pausas de respiración'
        ],
        ejemploUniversal: 'El sermón de Gettysburg de Lincoln (menos de 300 palabras, estructura perfecta de pasado, presente y futuro).',
        ejemploVenezuela: 'Presentación ejecutiva de obras viales ante vecinos: Estado actual del daño ➔ Solución técnica con costo ➔ Beneficio para sus hijos.',
        gruposConceptosIds: ['cc_ora_01']
      }
    ],
    gruposConceptos: [
      {
        id: 'cc_ora_01',
        nombre: 'Arquitectura del Discurso y Comunicación No Verbal',
        axiomasPadreIds: ['ax_ora_01', 'ax_ora_02'],
        conceptos: [
          {
            id: 'c_ora_01',
            nombre: 'El Exordio y la Proposición Central',
            definicion: 'Los primeros 45 segundos donde se captura la atención mediante una pregunta provocadora, una historia o un dato demoledor.',
            analogia: 'El gancho de un anzuelo: si no penetra al inicio, el pez escapa para siempre.'
          },
          {
            id: 'c_ora_02',
            nombre: 'Modulación Vocal y Lenguaje Corporal Abierto',
            definicion: 'Uso consciente del tono, cadencia, pausas y contacto visual directo para proyectar convicción inquebrantable.',
            analogia: 'Una partitura musical: el volumen no debe ser uniforme; los matices generan el clímax dramático.'
          }
        ],
        detalles: [
          {
            id: 'det_ora_01',
            conceptoId: 'c_ora_01',
            tipo: 'formula',
            titulo: 'Fórmula de Persuasión Monroe (Secuencia Motivadora)',
            contenido: '1. Atención ➔ 2. Necesidad ➔ 3. Satisfacción ➔ 4. Visualización ➔ 5. Acción Concreta.',
            notas: 'El estándar de oro para discursos cívicos y asambleas comunitarias.'
          }
        ]
      }
    ]
  },

  'ING-VIA': {
    materiaCodigo: 'ING-VIA',
    titulo: 'Vialidad y Pavimentos de Monagas',
    descripcion: 'Mecánica de pavimentos flexibles, patología de carpetas asfálticas y diseño geométrico de vías.',
    axiomas: [
      {
        id: 'ax_via_01',
        titulo: 'El Agua es el Enemigo Mortal del Pavimento',
        enunciado: 'La capacidad portante de una subrasante se degrada exponencialmente ante la presencia de humedad confinada no drenada.',
        porQueFundamental: 'El agua satura los vacíos de la base granular, genera presiones de poro bajo cargas de tráfico y rompe la cohesión del ligante asfáltico.',
        criteriosDominio: [
          'Identifico cómo un drenaje colapsado causa piel de cocodrilo y baches profundos',
          'Sé calcular la pendiente transversal de bombeo (2% estándar) para rápida evacuación pluvial',
          'Distingo fallas por subrasante blanda de fallas por fatiga de la capa asfáltica superficial'
        ],
        ejemploUniversal: 'Ecuaciones de drenaje superficial AASHTO y el método del Número de Curva.',
        ejemploVenezuela: 'La Avenida Alirio Ugarte Pelayo en Maturín: baches reiterados donde las cunetas están obstruidas con sedimentos.',
        gruposConceptosIds: ['cc_via_01']
      }
    ],
    gruposConceptos: [
      {
        id: 'cc_via_01',
        nombre: 'Mecánica de Suelos y Mezclas Asfálticas',
        axiomasPadreIds: ['ax_via_01'],
        conceptos: [
          {
            id: 'c_via_01',
            nombre: 'Distribución Piramidal de Esfuerzos (CBR)',
            definicion: 'Cómo la carga de un eje de camión de 8.2 toneladas se disipa a medida que desciende por la capa de rodamiento, base y sub-base.',
            analogia: 'Una pirámide de arena: la presión puntual en la punta se reparte en una base ancha en el fondo.'
          }
        ],
        detalles: [
          {
            id: 'det_via_01',
            conceptoId: 'c_via_01',
            tipo: 'formula',
            titulo: 'Número Estructural AASHTO (SN)',
            contenido: 'SN = a1*D1 + a2*D2*m2 + a3*D3*m3 (donde a=coeficiente estructural, D=espesor en pulgadas, m=factor de drenaje).',
            notas: 'Fórmula fundamental para dimensionar carpetas de rodamiento y bacheo intensivo.'
          }
        ]
      }
    ]
  },

  'ING-EST': {
    materiaCodigo: 'ING-EST',
    titulo: 'Estructuras e Hidráulica Aplicada',
    descripcion: 'Comportamiento de secciones estructurales, empujes hidrostáticos y flujo en canales abiertos.',
    axiomas: [
      {
        id: 'ax_est_01',
        titulo: 'Equilibrio Estático y Continuidad de Tensiones',
        enunciado: 'Para que un elemento permanezca estable, la sumatoria de fuerzas y momentos exteriores debe ser exactamente igual y contraria a sus resistencias internas.',
        porQueFundamental: 'Toda sobrecarga no equilibrada produce desplazamiento acelerado (colapso físico).',
        criteriosDominio: [
          'Sé calcular diagramas de momento flector y esfuerzo cortante en vigas isostáticas',
          'Distingo falla frágil (hormigón sin armar) de falla dúctil (acero fluyendo)',
          'Entiendo la importancia de los factores de seguridad en obras públicas'
        ],
        ejemploUniversal: 'Leyes de Newton y teoría elástica de Euler-Bernoulli.',
        ejemploVenezuela: 'Cálculo de muros de contención y puentes sobre el río Guarapiche en Monagas.',
        gruposConceptosIds: ['cc_est_01']
      }
    ],
    gruposConceptos: [
      {
        id: 'cc_est_01',
        nombre: 'Cálculo Seccional e Hidráulica de Canales',
        axiomasPadreIds: ['ax_est_01'],
        conceptos: [
          {
            id: 'c_est_01',
            nombre: 'Ecuación de Continuidad y Manning en Canales Urbanos',
            definicion: 'El caudal Q es el producto del área por la velocidad hidráulica determinada por la pendiente y rugosidad.',
            analogia: 'Una manguera de jardín: si reduces la sección, la velocidad del agua aumenta para mantener el mismo flujo.'
          }
        ],
        detalles: [
          {
            id: 'det_est_01',
            conceptoId: 'c_est_01',
            tipo: 'formula',
            titulo: 'Fórmula de Manning para Canales Abiertos',
            contenido: 'Q = (1/n) * A * (R_h)^(2/3) * S^(1/2) (n=rugosidad, A=área mojada, Rh=radio hidráulico, S=pendiente).',
            notas: 'Esencial para calcular el drenaje del caño de La Puente y evitar inundaciones en época de lluvias.'
          }
        ]
      }
    ]
  },

  'GEO-MON': {
    materiaCodigo: 'GEO-MON',
    titulo: 'Geopolítica y Territorio Monagas (13 Municipios)',
    descripcion: 'Estructura territorial, cuencas hidrográficas y potencial agroproductivo del Estado Monagas.',
    axiomas: [
      {
        id: 'ax_geo_01',
        titulo: 'La Red Fluvial Condiciona el Poblamiento y la Producción',
        enunciado: 'Los asentamientos humanos y la vocación económica de Monagas están determinados por las cuencas de los ríos Guarapiche, San Juan y Morichal Largo.',
        porQueFundamental: 'El agua dulce define la agricultura, la ganadería, el abastecimiento urbano de Maturín y la salida navegable al Océano Atlántico.',
        criteriosDominio: [
          'Conozco la ubicación y límites de los 13 municipios y 44 parroquias',
          'Entiendo la relevancia estratégica del Puerto de Caripito para la salida petrolera y comercial',
          'Sé explicar el contraste entre la sabana sur y el piedemonte de Caripe'
        ],
        ejemploUniversal: 'La geografía como destino en Fernand Braudel y la geopolítica de cuencas de Halford Mackinder.',
        ejemploVenezuela: 'El Acueducto Metropolitano de Maturín en el Bajo Guarapiche que abastece al 70% de la capital.',
        gruposConceptosIds: ['cc_geo_01']
      }
    ],
    gruposConceptos: [
      {
        id: 'cc_geo_01',
        nombre: 'Cartografía Municipal y Ejes Productivos',
        axiomasPadreIds: ['ax_geo_01'],
        conceptos: [
          {
            id: 'c_geo_01',
            nombre: 'Eje Agroindustrial Maturín - Zamora - Cedeño',
            definicion: 'Corredor cerealero, cárnico y forestal de mayor densidad poblacional y actividad comercial del estado.',
            analogia: 'La columna vertebral de Monagas: comunica el oriente con el centro del país.'
          }
        ],
        detalles: [
          {
            id: 'det_geo_01',
            conceptoId: 'c_geo_01',
            tipo: 'datos',
            titulo: 'Parroquias Clave de Mayor Población Electoral',
            contenido: 'Alto de Los Godos, Boquerón, San Simón y Las Cocuizas concentran el 68% del padrón electoral de Maturín.',
            notas: 'Fundamental para la organización territorial y despliegue de testigos.'
          }
        ]
      }
    ]
  }
};

/**
 * Funciones de Persistencia Dinámica para Materias y Guías Personalizadas
 */
export function obtenerTodasLasMaterias() {
  let custom = [];
  try {
    const data = localStorage.getItem('axiom_custom_materias');
    if (data) custom = JSON.parse(data);
  } catch {}
  const list = [...MATERIAS_CONFIG];
  if (!list.some(m => m.codigo === 'ORA-RET') && !custom.some(m => m.codigo === 'ORA-RET')) {
    list.push(MATERIA_ORATORIA_MODELO);
  }
  return [...list, ...custom];
}

export function guardarMateriaPersonalizada(nuevaMateria) {
  try {
    let custom = [];
    const data = localStorage.getItem('axiom_custom_materias');
    if (data) custom = JSON.parse(data);

    // Evitar duplicados por código
    custom = custom.filter(m => m.codigo !== nuevaMateria.codigo);
    custom.push(nuevaMateria);
    localStorage.setItem('axiom_custom_materias', JSON.stringify(custom));
    return true;
  } catch (e) {
    console.error('Error guardando materia personalizada:', e);
    return false;
  }
}

export function obtenerTodasLasGuias() {
  let customGuias = {};
  try {
    const data = localStorage.getItem('axiom_custom_guias');
    if (data) customGuias = JSON.parse(data);
  } catch {}
  return { ...GUIAS_CONOCIMIENTO_3_NIVELES, ...customGuias };
}

export function guardarGuiaPersonalizada(materiaCodigo, guia) {
  try {
    let customGuias = {};
    const data = localStorage.getItem('axiom_custom_guias');
    if (data) customGuias = JSON.parse(data);

    customGuias[materiaCodigo] = guia;
    localStorage.setItem('axiom_custom_guias', JSON.stringify(customGuias));
    return true;
  } catch (e) {
    console.error('Error guardando guía personalizada:', e);
    return false;
  }
}

export function obtenerTemariosYHerramientas() {
  let custom = {};
  try {
    const data = localStorage.getItem('axiom_custom_temarios');
    if (data) custom = JSON.parse(data);
  } catch {}
  return { ...TEMARIOS_Y_HERRAMIENTAS, ...custom };
}

export function guardarTemarioPersonalizado(materiaCodigo, temario) {
  try {
    let custom = {};
    const data = localStorage.getItem('axiom_custom_temarios');
    if (data) custom = JSON.parse(data);
    custom[materiaCodigo] = temario;
    localStorage.setItem('axiom_custom_temarios', JSON.stringify(custom));
    return true;
  } catch (e) {
    console.error('Error guardando temario personalizado:', e);
    return false;
  }
}
