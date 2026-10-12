/**
 * MIGATO • Servicio de Tutoría IA Gemini y Generador Axiomático
 * Soporte dual: Modo Online con Gemini API + Respaldo Offline Soberano
 * Conducción: José Gregorio 'El Gato' Briceño | Comisión Técnica MIGATO
 */

import { GUIAS_CONOCIMIENTO_3_NIVELES } from './estudioData.js';

// Base de preguntas socráticas pre-calculadas para funcionamiento 100% OFFLINE (sin internet en cortes)
const BANCO_SOCRATICO_OFFLINE = {
  ax_sis_01: [
    {
      pregunta: 'Si un programa falla intermitentemente y no logras reproducirlo, ¿cuál de los tres elementos del axioma (estado inicial, operaciones primitivas o estado final) no estás observando con rigor?',
      pistas: 'Piensa en variables globales mutadas fuera de orden o dependencias del reloj del sistema.',
      conclusion: 'Exacto. La falta de determinismo siempre se reduce a estado no controlado.'
    },
    {
      pregunta: '¿Cómo aplicarías este axioma de "transformación de estados" al diseñar un sistema de conteo de votos para el Movimiento MIGATO?',
      pistas: 'Considera cada acta como una entrada inmutable y el total parroquial como la reducción de estados.',
      conclusion: 'Brillante. Las actas inmutables garantizan que el estado final sea auditable y matemáticamente incontrovertible.'
    }
  ],
  ax_eco_01: [
    {
      pregunta: 'Un político promete asfalto gratuito para los 13 municipios sin aumentar ingresos ni reasignar partidas. Desde el axioma de la escasez, ¿qué mentira matemática está cometiendo?',
      pistas: 'Recuerda que los recursos materiales y la maquinaria son finitos.',
      conclusion: 'Así es. Si no hay presupuesto real, o la obra no se hace o se imprime dinero sin respaldo generando inflación.'
    },
    {
      pregunta: 'Si el Estado decide congelar el precio de la gasolina a 0 bolívares, ¿cuál es el costo de oportunidad que pagará la sociedad a largo plazo?',
      pistas: 'Mantenimiento de refinerías, inversión en salud y colas de 12 horas.',
      conclusion: 'Correcto. La destrucción de la infraestructura energética venezolana fue el costo oculto de ignorar la escasez.'
    }
  ],
  ax_pol_01: [
    {
      pregunta: '¿Por qué un liderazgo construido sobre la base de dádivas o amenazas colapsa cuando se apaga el aparato del Estado, mientras que el liderazgo orgánico de El Gato Briceño perdura en el tiempo?',
      pistas: 'Distingue entre sumisión por conveniencia y lealtad por convicción moral.',
      conclusion: 'Totalmente. La confianza no se compra con una bolsa de comida; se gana con hechos y coherencia.'
    }
  ]
};

const QUIZZES_OFFLINE = {
  ax_sis_01: {
    titulo: 'Quiz Rápido: Computación y Estados',
    preguntas: [
      {
        pregunta: '¿Cuál es la principal ventaja de estructurar una aplicación como una máquina de estados determinista?',
        opciones: [
          'A) La interfaz corre con gráficos 3D más rápido.',
          'B) Es 100% predecible, reproducible y resistente a fallos inesperados.',
          'C) No necesita usar memoria RAM.',
          'D) Se conecta automáticamente a cualquier base de datos.'
        ],
        correcta: 1,
        explicacion: 'El determinismo garantiza que ante las mismas entradas y estado inicial, el resultado es siempre idéntico, facilitando la auditoría y depuración.'
      }
    ]
  },
  ax_eco_01: {
    titulo: 'Quiz Rápido: Escasez y Costo de Oportunidad',
    preguntas: [
      {
        pregunta: 'Si el municipio dispone de 100 toneladas de asfalto y decide usarlas en una plaza en vez de la Troncal 10, ¿cuál es el costo de oportunidad?',
        opciones: [
          'A) El dinero gastado en la factura del proveedor.',
          'B) Los camiones que transportaron el asfalto.',
          'C) La reparación de los baches de la Troncal 10 que se dejó de ejecutar.',
          'D) La ganancia que obtendrá la alcaldía.'
        ],
        correcta: 2,
        explicacion: 'El costo de oportunidad es el valor de la mejor alternativa a la que se renuncia al tomar una decisión económica.'
      }
    ]
  }
};

export class GeminiTutorService {
  constructor() {
    this.apiKey = localStorage.getItem('migato_gemini_api_key') || '';
    this.modelo = 'gemini-2.5-flash';
    this.historialChat = [];
  }

  setApiKey(key) {
    this.apiKey = (key || '').trim();
    localStorage.setItem('migato_gemini_api_key', this.apiKey);
  }

  hasApiKey() {
    return Boolean(this.apiKey && this.apiKey.length > 10);
  }

  /**
   * Genera diálogo socrático para un axioma
   */
  async dialogarSocratico(axiomaId, axiomaTitulo, mensajeUsuario = null) {
    // Si no hay API Key o falla la red, recurrir al banco socrático offline
    if (!this.hasApiKey() || !navigator.onLine) {
      const preguntas = BANCO_SOCRATICO_OFFLINE[axiomaId] || BANCO_SOCRATICO_OFFLINE['ax_sis_01'];
      const rand = preguntas[Math.floor(Math.random() * preguntas.length)];
      return {
        modo: 'offline',
        emisor: 'Sócrates (Modo Offline Soberano)',
        pregunta: rand.pregunta,
        pista: rand.pistas,
        conclusion: rand.conclusion,
        timestamp: new Date().toLocaleTimeString()
      };
    }

    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${this.modelo}:generateContent?key=${this.apiKey}`;
      const prompt = `
Actúa como Sócrates, el filósofo y pedagogo de primeros principios.
Estamos estudiando el axioma: "${axiomaTitulo}".
Contexto: Estudiante venezolano preparándose en ingeniería, economía y política para reconstruir el Estado Monagas.
${mensajeUsuario ? `El estudiante dice: "${mensajeUsuario}"` : `Inicia haciéndole una pregunta profunda para validar si realmente entiende el axioma o solo lo memorizó de paporroteo.`}

Reglas estrictas:
1. No le des la respuesta masticada.
2. Hazle una sola pregunta clara y punzante que lo obligue a pensar en causas y consecuencias reales.
3. Conecta el axioma con un ejemplo cotidiano o de la realidad de Monagas/Venezuela cuando sea oportuno.
4. Tono: Respetuoso, exigente, estimulante, formal y pedagógico.
`;

      const resp = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.3, maxOutputTokens: 600 }
        })
      });

      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      const data = await resp.json();
      const texto = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Reflexiona sobre cómo este axioma se sostiene en la práctica.';

      return {
        modo: 'online_gemini',
        emisor: 'Sócrates (Gemini AI)',
        pregunta: texto,
        timestamp: new Date().toLocaleTimeString()
      };
    } catch (err) {
      console.warn('Fallo llamada Gemini, cayendo en modo offline:', err);
      const fallback = BANCO_SOCRATICO_OFFLINE[axiomaId] || BANCO_SOCRATICO_OFFLINE['ax_sis_01'];
      return {
        modo: 'offline_fallback',
        emisor: 'Sócrates (Modo Local Offline)',
        pregunta: fallback[0].pregunta,
        pista: fallback[0].pistas,
        timestamp: new Date().toLocaleTimeString()
      };
    }
  }

  /**
   * Obtiene o genera un quiz relámpago de active recall
   */
  async obtenerQuizAxioma(axiomaId, axiomaTitulo) {
    if (QUIZZES_OFFLINE[axiomaId]) {
      return QUIZZES_OFFLINE[axiomaId];
    }

    return {
      titulo: `Evaluación de Comprensión: ${axiomaTitulo}`,
      preguntas: [
        {
          pregunta: `¿Cómo demostrarías que dominas el axioma "${axiomaTitulo}" en una situación de campo?`,
          opciones: [
            'A) Repitiendo la definición de memoria sin alterarla.',
            'B) Aplicándolo para resolver un problema práctico y explicando el costo de oportunidad a alguien sin formación técnica.',
            'C) Esperando que un profesor o jefe me diga qué hacer.',
            'D) Guardando el apunte en un archivo sin volver a leerlo.'
          ],
          correcta: 1,
          explicacion: 'El dominio de un axioma se comprueba cuando eres capaz de explicarlo con tus propias palabras y aplicarlo para tomar mejores decisiones en la realidad.'
        }
      ]
    };
  }

  /**
   * Genera un árbol de axiomas completo para un tema nuevo
   */
  async generarArbolNuevoTema(materiaCodigo, temaNombre) {
    if (!this.hasApiKey() || !navigator.onLine) {
      return {
        ok: false,
        mensaje: 'Para estructurar un tema nuevo desde cero con IA se requiere conexión a internet y configurar tu Gemini API Key en el menú de opciones.'
      };
    }

    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${this.modelo}:generateContent?key=${this.apiKey}`;
      const prompt = `
Genera un árbol de estudio en formato JSON estructurado bajo la metodología de Primeros Principios para la materia "${materiaCodigo}" sobre el tema: "${temaNombre}".

Estructura requerida estricta:
{
  "axiomas": [
    {
      "id": "ax_gen_01",
      "titulo": "Título del axioma",
      "enunciado": "Verdad fundamental en 1 frase",
      "porQueFundamental": "Por qué es irreducible",
      "criteriosDominio": ["criterio 1", "criterio 2"],
      "ejemploUniversal": "Ejemplo internacional",
      "ejemploVenezuela": "Ejemplo en Venezuela o Monagas"
    }
  ],
  "gruposConceptos": [
    {
      "id": "cc_gen_01",
      "nombre": "Nombre del grupo conceptual",
      "conceptos": [
        { "id": "c_gen_01", "nombre": "Concepto clave", "definicion": "Definición rigurosa", "analogia": "Analogía cotidiana" }
      ],
      "detalles": [
        { "id": "d_gen_01", "tipo": "formula|codigo|procedimiento", "titulo": "Detalle técnico", "contenido": "Detalle concreto" }
      ]
    }
  ]
}
Responde ÚNICAMENTE con el objeto JSON válido.
`;

      const resp = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { responseMimeType: 'application/json' }
        })
      });

      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      const data = await resp.json();
      const jsonText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      const parseado = JSON.parse(jsonText);

      return {
        ok: true,
        datos: parseado
      };
    } catch (err) {
      return {
        ok: false,
        error: err.message
      };
    }
  }
}

export const geminiTutor = new GeminiTutorService();
