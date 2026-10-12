/**
 * MIGATO • Módulo de Estudio Inteligente (SIGAEE • AXIOM)
 * Base de Datos y Catálogo de Asignaturas, Horarios y Árboles Epistémicos
 * Conducción: José Gregorio 'El Gato' Briceño | Comisión Técnica MIGATO
 */

export const MATERIAS_CONFIG = [
  {
    codigo: 'MAT-ING',
    nombre: 'Matemáticas Pre-Ingeniería (Álgebra, Matrices & Funciones)',
    categoria: 'ingenieria',
    metaSemanalHoras: 4.5,
    colorHex: '#06b6d4', // Cyan
    colorBg: 'rgba(6, 182, 212, 0.12)',
    colorBorder: 'rgba(6, 182, 212, 0.4)',
    icono: 'layers',
    demandaCognitiva: 'heavy',
    descripcion: 'Fundamentos de álgebra universitaria, polinomios, matrices, transformaciones lineales, funciones y precálculo.'
  },
  {
    codigo: 'SIS-ARQ',
    nombre: 'Programación, Arquitectura & Explicación Técnica',
    categoria: 'programacion',
    metaSemanalHoras: 4.5,
    colorHex: '#38bdf8', // Sky
    colorBg: 'rgba(56, 189, 248, 0.12)',
    colorBorder: 'rgba(56, 189, 248, 0.4)',
    icono: 'terminal',
    demandaCognitiva: 'heavy',
    descripcion: 'Dominio profundo de módulos de código, persistencia SQLite local, arquitectura cliente-servidor y técnica de pitch técnico.'
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
    nombre: 'Castellano, Retórica y Monólogos',
    categoria: 'comunicacion',
    metaSemanalHoras: 2.5,
    colorHex: '#f59e0b', // Ámbar
    colorBg: 'rgba(245, 158, 11, 0.12)',
    colorBorder: 'rgba(245, 158, 11, 0.4)',
    icono: 'mic',
    demandaCognitiva: 'medium',
    descripcion: 'Estructura retórica clásica (exordio, narratio, refutatio), dicción, conectores argumentativos y práctica de monólogos en Telegram.'
  },
  {
    codigo: 'ING-TEC',
    nombre: 'Inglés Técnico & Inmersión',
    categoria: 'idiomas',
    metaSemanalHoras: 2.0,
    colorHex: '#10b981', // Esmeralda
    colorBg: 'rgba(16, 185, 129, 0.12)',
    colorBorder: 'rgba(16, 185, 129, 0.4)',
    icono: 'globe',
    demandaCognitiva: 'light',
    descripcion: 'Hábito diario de Duolingo (15 min), lectura de documentación técnica oficial e inmersión en video con subtítulos en inglés.'
  },
  {
    codigo: 'ECO-DIG',
    nombre: 'E-Commerce Realista & Negocios en Venezuela',
    categoria: 'economia',
    metaSemanalHoras: 2.0,
    colorHex: '#22c55e', // Verde
    colorBg: 'rgba(34, 197, 94, 0.12)',
    colorBorder: 'rgba(34, 197, 94, 0.4)',
    icono: 'dollar-sign',
    demandaCognitiva: 'light',
    descripcion: 'Comercio digital en contexto venezolano: WhatsApp CRM, catálogos móviles, pasarelas multimoneda (Zelle, Pago Móvil, USDT) y logística local.'
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
    nombre: 'Ocio, Videojuegos & Tiempo Libre',
    categoria: 'ocio',
    metaSemanalHoras: 6.0,
    colorHex: '#ec4899', // Rosa
    colorBg: 'rgba(236, 72, 153, 0.12)',
    colorBorder: 'rgba(236, 72, 153, 0.4)',
    icono: 'smile',
    demandaCognitiva: 'ocio',
    descripcion: 'Espacio diario garantizado para videojuegos (Play, emuladores), desconexión mental y esparcimiento sin culpa.'
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
  { id: 'f1', inicio: '08:30', fin: '10:30', duracionHoras: 2.0, tipo: 'matutina', label: 'Mañana 1' },
  { id: 'f2', inicio: '10:45', fin: '12:15', duracionHoras: 1.5, tipo: 'matutina', label: 'Mañana 2' },
  { id: 'f3', inicio: '14:00', fin: '16:00', duracionHoras: 2.0, tipo: 'vespertina', label: 'Tarde 1' },
  { id: 'f4', inicio: '16:15', fin: '17:45', duracionHoras: 1.5, tipo: 'vespertina', label: 'Tarde 2' },
  { id: 'f5', inicio: '19:30', fin: '21:00', duracionHoras: 1.5, tipo: 'nocturna', label: 'Noche' }
];

/**
 * Itinerario Semanal Base (Lunes a Sábado) pre-configurado
 */
export const ITINERARIO_BASE_SEMANAL = {
  lunes: [
    { id: 'b_lun_1', materiaCodigo: 'MAT-ING', inicio: '08:30', fin: '10:00', duracion: 1.5, tema: 'Álgebra Universitaria: Leyes de Exponentes y Polinomios', completado: false },
    { id: 'b_lun_2', materiaCodigo: 'ING-TEC', inicio: '10:00', fin: '10:30', duracion: 0.5, tema: 'Duolingo Hábitos + Vocabulario Técnico en Inglés', completado: false },
    { id: 'b_lun_3', materiaCodigo: 'SIS-ARQ', inicio: '10:30', fin: '12:00', duracion: 1.5, tema: 'Arquitectura de Software: Flujo Cliente-Servidor y Módulos', completado: false },
    { id: 'b_lun_4', materiaCodigo: 'GEO-EST', inicio: '14:30', fin: '16:00', duracion: 1.5, tema: 'Teoría de las Relaciones Internacionales y Dilema de Seguridad', completado: false },
    { id: 'b_lun_5', materiaCodigo: 'OCI-LIB', inicio: '16:00', fin: '17:00', duracion: 1.0, tema: 'Tiempo Libre y Videojuegos (Desconexión Mental)', completado: false },
    { id: 'b_lun_6', materiaCodigo: 'GIM-FIT', inicio: '17:00', fin: '18:30', duracion: 1.5, tema: 'Gimnasio: Tren Superior (Pecho, Hombro y Tríceps)', completado: false }
  ],
  martes: [
    { id: 'b_mar_1', materiaCodigo: 'MAT-ING', inicio: '08:30', fin: '10:00', duracion: 1.5, tema: 'Concepto Riguroso de Función: Dominio, Rango y Composición', completado: false },
    { id: 'b_mar_2', materiaCodigo: 'ING-TEC', inicio: '10:00', fin: '10:30', duracion: 0.5, tema: 'Lectura de Documentación Oficial en Inglés', completado: false },
    { id: 'b_mar_3', materiaCodigo: 'SIS-ARQ', inicio: '10:30', fin: '12:00', duracion: 1.5, tema: 'Defensa Técnica: Cómo Explicar un Módulo a Terceros (Pitch)', completado: false },
    { id: 'b_mar_4', materiaCodigo: 'ORA-CAS', inicio: '14:30', fin: '16:00', duracion: 1.5, tema: 'Retórica Clásica: Exordio, Narratio y Monólogo en Telegram', completado: false },
    { id: 'b_mar_5', materiaCodigo: 'OCI-LIB', inicio: '16:00', fin: '17:00', duracion: 1.0, tema: 'Tiempo Libre y Videojuegos', completado: false },
    { id: 'b_mar_6', materiaCodigo: 'GIM-FIT', inicio: '17:00', fin: '18:30', duracion: 1.5, tema: 'Gimnasio: Tren Inferior (Pierna, Gemelos y Core)', completado: false }
  ],
  miercoles: [
    { id: 'b_mie_1', materiaCodigo: 'MAT-ING', inicio: '08:30', fin: '10:00', duracion: 1.5, tema: 'Sistemas de Ecuaciones Lineales y Método de Gauss', completado: false },
    { id: 'b_mie_2', materiaCodigo: 'ING-TEC', inicio: '10:00', fin: '10:30', duracion: 0.5, tema: 'Duolingo Hábitos + Audio Inmersivo en Inglés', completado: false },
    { id: 'b_mie_3', materiaCodigo: 'SIS-ARQ', inicio: '10:30', fin: '12:00', duracion: 1.5, tema: 'Bases de Datos Locales: SQLite y Persistencia Offline-First', completado: false },
    { id: 'b_mie_4', materiaCodigo: 'ECO-DIG', inicio: '14:30', fin: '16:00', duracion: 1.5, tema: 'E-Commerce en Venezuela: WhatsApp Business CRM y Catálogos', completado: false },
    { id: 'b_mie_5', materiaCodigo: 'OCI-LIB', inicio: '16:00', fin: '17:30', duracion: 1.5, tema: 'Ocio Extendido / Día de Descanso Físico', completado: false }
  ],
  jueves: [
    { id: 'b_jue_1', materiaCodigo: 'MAT-ING', inicio: '08:30', fin: '10:00', duracion: 1.5, tema: 'Álgebra Lineal: Matrices, Multiplicación y Determinantes', completado: false },
    { id: 'b_jue_2', materiaCodigo: 'ING-TEC', inicio: '10:00', fin: '10:30', duracion: 0.5, tema: 'Práctica Dialéctica en Inglés con Sócrates', completado: false },
    { id: 'b_jue_3', materiaCodigo: 'SIS-ARQ', inicio: '10:30', fin: '12:00', duracion: 1.5, tema: 'Simulacro de Exposición Técnica: Arquitectura de Software', completado: false },
    { id: 'b_jue_4', materiaCodigo: 'GEO-EST', inicio: '14:30', fin: '16:00', duracion: 1.5, tema: 'Doctrina de la Guerra (Clausewitz y Sun Tzu) y Chokepoints', completado: false },
    { id: 'b_jue_5', materiaCodigo: 'OCI-LIB', inicio: '16:00', fin: '17:00', duracion: 1.0, tema: 'Tiempo Libre y Videojuegos', completado: false },
    { id: 'b_jue_6', materiaCodigo: 'GIM-FIT', inicio: '17:00', fin: '18:30', duracion: 1.5, tema: 'Gimnasio: Tracción (Espalda, Hombro Posterior y Bíceps)', completado: false }
  ],
  viernes: [
    { id: 'b_vie_1', materiaCodigo: 'MAT-ING', inicio: '08:30', fin: '10:00', duracion: 1.5, tema: 'Taller de Ejercicios Matemáticos: Resolución y Autoevaluación', completado: false },
    { id: 'b_vie_2', materiaCodigo: 'ING-TEC', inicio: '10:00', fin: '10:30', duracion: 0.5, tema: 'Duolingo Hábitos + Vocabulario Técnico', completado: false },
    { id: 'b_vie_3', materiaCodigo: 'SIS-ARQ', inicio: '10:30', fin: '12:00', duracion: 1.5, tema: 'Revisión y Refactorización de Módulos Operativos', completado: false },
    { id: 'b_vie_4', materiaCodigo: 'ORA-CAS', inicio: '14:30', fin: '15:30', duracion: 1.0, tema: 'Monólogo de Cierre Semanal: Síntesis Oral en Telegram', completado: false },
    { id: 'b_vie_5', materiaCodigo: 'OCI-LIB', inicio: '15:30', fin: '17:00', duracion: 1.5, tema: 'Tarde Libre y Espacio de Juegos', completado: false },
    { id: 'b_vie_6', materiaCodigo: 'GIM-FIT', inicio: '17:00', fin: '18:30', duracion: 1.5, tema: 'Gimnasio: Fullbody / Acondicionamiento Físico', completado: false }
  ],
  sabado: [
    { id: 'b_sab_1', materiaCodigo: 'ECO-DIG', inicio: '09:30', fin: '10:30', duracion: 1.0, tema: 'Logística de Pagos Multimoneda y Envíos en Venezuela', completado: false },
    { id: 'b_sab_2', materiaCodigo: 'ING-TEC', inicio: '10:30', fin: '11:30', duracion: 1.0, tema: 'Inmersión en Video de Ingeniería y Tecnología en Inglés', completado: false }
    // Tarde: Colchón Antifrágil (Buffer libre para absorber cortes de luz o descanso puro)
  ]
};

/**
 * Árboles Epistémicos de Conocimiento en 3 Niveles:
 * Nivel 1: Axiomas (Fundamentos Basales)
 * Nivel 2: Grupos de Conceptos (Estructura y Relaciones)
 * Nivel 3: Detalles (Fórmulas, Sintaxis, Casos Prácticos de Monagas/Venezuela)
 */
export const GUIAS_CONOCIMIENTO_3_NIVELES = {
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
