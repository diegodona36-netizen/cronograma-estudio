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
