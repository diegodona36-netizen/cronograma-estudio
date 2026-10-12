/**
 * AXIOM • Adaptador Universal de Modelos de Inteligencia Artificial (LLM Provider Service)
 * Soporte Dual: Google Gemini API (Gratis) & OpenRouter (LLaMA 3.3 / DeepSeek)
 * Capacidad de Function Calling (Tool Calling) para Acciones Agénticas
 */

export class LLMProviderService {
  constructor() {
    this.proveedor = this.cargarConfig('axiom_llm_provider', 'gemini'); // 'gemini' | 'openrouter'
    this.geminiApiKey = this.cargarConfig('axiom_gemini_api_key', '');
    this.openrouterApiKey = this.cargarConfig('axiom_openrouter_api_key', '');
    this.geminiModel = this.cargarConfig('axiom_gemini_model', 'gemini-flash-latest');
    this.openrouterModel = this.cargarConfig('axiom_openrouter_model', 'meta-llama/llama-3.3-70b-instruct');
  }

  cargarConfig(clave, valorPorDefecto) {
    try {
      if (typeof localStorage === 'undefined') return valorPorDefecto;
      const v = localStorage.getItem(clave);
      return v !== null && v !== undefined && v !== '' ? v : valorPorDefecto;
    } catch {
      return valorPorDefecto;
    }
  }

  guardarConfig(clave, valor) {
    try {
      if (typeof localStorage === 'undefined') return;
      localStorage.setItem(clave, valor);
    } catch (e) {
      console.warn('Error guardando config LLM:', e);
    }
  }

  setProveedor(nuevoProveedor) {
    if (['gemini', 'openrouter'].includes(nuevoProveedor)) {
      this.proveedor = nuevoProveedor;
      this.guardarConfig('axiom_llm_provider', nuevoProveedor);
    }
  }

  setGeminiApiKey(key) {
    this.geminiApiKey = (key || '').trim();
    this.guardarConfig('axiom_gemini_api_key', this.geminiApiKey);
  }

  setOpenRouterApiKey(key) {
    this.openrouterApiKey = (key || '').trim();
    this.guardarConfig('axiom_openrouter_api_key', this.openrouterApiKey);
  }

  setOpenRouterModel(model) {
    this.openrouterModel = (model || '').trim();
    this.guardarConfig('axiom_openrouter_model', this.openrouterModel);
  }

  getTieneApiKey() {
    if (this.proveedor === 'gemini') return Boolean(this.geminiApiKey);
    if (this.proveedor === 'openrouter') return Boolean(this.openrouterApiKey);
    return false;
  }

  /**
   * Envía un mensaje con historial y herramientas al proveedor activo
   */
  async enviarMensaje({ systemPrompt, historial = [], mensajeUsuario, herramientas = [] }) {
    if (!this.getTieneApiKey()) {
      return this.generarRespuestaOffline({ mensajeUsuario, herramientas });
    }

    try {
      if (this.proveedor === 'gemini') {
        return await this.invocarGemini({ systemPrompt, historial, mensajeUsuario, herramientas });
      } else {
        return await this.invocarOpenRouter({ systemPrompt, historial, mensajeUsuario, herramientas });
      }
    } catch (error) {
      console.error(`Error invocando proveedor ${this.proveedor}:`, error);
      // Fallback gracioso con aviso
      return {
        texto: `⚠️ Error de comunicación con ${this.proveedor === 'gemini' ? 'Google Gemini' : 'OpenRouter'}: ${error.message}. Activando modo heurístico local.`,
        llamadasHerramientas: [],
        proveedor: 'offline_fallback',
        error: true
      };
    }
  }

  /**
   * Implementación de Google Gemini API con Function Calling nativo
   */
  async invocarGemini({ systemPrompt, historial, mensajeUsuario, herramientas }) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${this.geminiModel}:generateContent?key=${this.geminiApiKey}`;

    // Mapear historial al formato de Gemini (user / model)
    const contents = [];
    historial.forEach(h => {
      contents.push({
        role: h.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: h.content }]
      });
    });

    contents.push({
      role: 'user',
      parts: [{ text: mensajeUsuario }]
    });

    // Mapear herramientas a FunctionDeclarations de Gemini
    let tools = undefined;
    if (herramientas && herramientas.length > 0) {
      const functionDeclarations = herramientas.map(h => ({
        name: h.name,
        description: h.description,
        parameters: {
          type: 'OBJECT',
          properties: h.parameters.properties,
          required: h.parameters.required || []
        }
      }));
      tools = [{ functionDeclarations }];
    }

    const payload = {
      systemInstruction: {
        parts: [{ text: systemPrompt }]
      },
      contents,
      generationConfig: {
        temperature: 0.2,
        maxOutputTokens: 2048
      }
    };

    if (tools) payload.tools = tools;

    const resp = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!resp.ok) {
      const errData = await resp.json().catch(() => ({}));
      throw new Error(errData.error?.message || `HTTP ${resp.status} ${resp.statusText}`);
    }

    const data = await resp.json();
    const candidate = data.candidates?.[0];
    const parts = candidate?.content?.parts || [];

    let textoRespuesta = '';
    const llamadasHerramientas = [];

    parts.forEach(p => {
      if (p.text) textoRespuesta += p.text;
      if (p.functionCall) {
        llamadasHerramientas.push({
          nombre: p.functionCall.name,
          argumentos: p.functionCall.args || {}
        });
      }
    });

    return {
      texto: textoRespuesta.trim(),
      llamadasHerramientas,
      proveedor: 'gemini',
      modelo: this.geminiModel
    };
  }

  /**
   * Implementación de OpenRouter API (OpenAI Tools Format)
   */
  async invocarOpenRouter({ systemPrompt, historial, mensajeUsuario, herramientas }) {
    const url = 'https://openrouter.ai/api/v1/chat/completions';

    const messages = [
      { role: 'system', content: systemPrompt }
    ];

    historial.forEach(h => {
      messages.push({ role: h.role, content: h.content });
    });

    messages.push({ role: 'user', content: mensajeUsuario });

    let tools = undefined;
    if (herramientas && herramientas.length > 0) {
      tools = herramientas.map(h => ({
        type: 'function',
        function: {
          name: h.name,
          description: h.description,
          parameters: h.parameters
        }
      }));
    }

    const payload = {
      model: this.openrouterModel,
      messages,
      temperature: 0.2,
      max_tokens: 2048
    };

    if (tools) {
      payload.tools = tools;
      payload.tool_choice = 'auto';
    }

    const resp = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.openrouterApiKey}`,
        'HTTP-Referer': window.location.origin || 'http://localhost:8000',
        'X-Title': 'AXIOM Estudio Inteligente'
      },
      body: JSON.stringify(payload)
    });

    if (!resp.ok) {
      const errData = await resp.json().catch(() => ({}));
      throw new Error(errData.error?.message || `HTTP ${resp.status} ${resp.statusText}`);
    }

    const data = await resp.json();
    const choice = data.choices?.[0];
    const msg = choice?.message;

    let textoRespuesta = msg?.content || '';
    const llamadasHerramientas = [];

    if (msg?.tool_calls && Array.isArray(msg.tool_calls)) {
      msg.tool_calls.forEach(tc => {
        if (tc.type === 'function' && tc.function) {
          let args = {};
          try {
            args = JSON.parse(tc.function.arguments);
          } catch {
            args = {};
          }
          llamadasHerramientas.push({
            nombre: tc.function.name,
            argumentos: args
          });
        }
      });
    }

    return {
      texto: textoRespuesta.trim(),
      llamadasHerramientas,
      proveedor: 'openrouter',
      modelo: this.openrouterModel
    };
  }

  /**
   * Motor heurístico local cuando no hay API Key configurada (Modo Offline Autónomo)
   */
  generarRespuestaOffline({ mensajeUsuario, herramientas }) {
    const texto = (mensajeUsuario || '').toLowerCase();
    const llamadas = [];

    // Detección heurística de corte de luz o imprevisto
    if (texto.includes('luz') || texto.includes('corte') || texto.includes('apagon') || texto.includes('imprevisto') || texto.includes('salida')) {
      let dia = 'lunes';
      const dias = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];
      for (const d of dias) {
        if (texto.includes(d)) { dia = d; break; }
      }

      // Buscar horas en formato HH:MM o números
      let horaIni = '12:00';
      let horaFin = '18:00';
      const matchRango = texto.match(/(\d{1,2})(?::(\d{2}))?\s*(?:a|hasta|-)\s*(\d{1,2})(?::(\d{2}))?/);
      if (matchRango) {
        let h1 = parseInt(matchRango[1], 10);
        const m1 = matchRango[2] || '00';
        let h2 = parseInt(matchRango[3], 10);
        const m2 = matchRango[4] || '00';

        const esTarde = texto.includes('pm') || texto.includes('tarde') || (h1 < 8 && h2 <= 11);
        if (esTarde) {
          if (h1 < 12) h1 += 12;
          if (h2 < 12) h2 += 12;
        }

        horaIni = `${String(h1).padStart(2, '0')}:${m1}`;
        horaFin = `${String(h2).padStart(2, '0')}:${m2}`;
      }

      llamadas.push({
        nombre: 'reestructurar_horario',
        argumentos: {
          dia,
          hora_inicio: horaIni,
          hora_fin: horaFin,
          motivo: texto.includes('luz') ? 'Corte Eléctrico' : 'Imprevisto Personal'
        }
      });

      return {
        texto: `Entendido. Detecté una interrupción de horario (${horaIni} a ${horaFin} el día ${dia}). Ejecutando rebalanceo automático antifrágil...`,
        llamadasHerramientas: llamadas,
        proveedor: 'offline_local'
      };
    }

    // Detección heurística de creación o estudio de nueva materia (ej. Oratoria)
    if (texto.includes('oratoria') || texto.includes('investigar') || texto.includes('estudiar')) {
      if (texto.includes('oratoria')) {
        llamadas.push({
          nombre: 'investigar_y_crear_materia',
          argumentos: {
            nombre_materia: 'Oratoria y Argumentación Retórica',
            codigo: 'ORA-RET',
            meta_semanal_horas: 2.0,
            enfoque: 'Elocuencia, estructura del discurso persuasivo, modulación vocal y retórica clásica'
          }
        });

        return {
          texto: `Excelente iniciativa. He investigado la disciplina de **Oratoria y Argumentación Retórica** bajo primeros principios (3 axiomas basales, grupos de conceptos y técnicas de entrega). La he incorporado a tu catálogo y guías de estudio.`,
          llamadasHerramientas: llamadas,
          proveedor: 'offline_local'
        };
      }
    }

    return {
      texto: `Hola, Compañero. Estoy listo para ayudarte con tu estudio. Puedes pedirme:
1. «Se me fue la luz de 2 a 6 pm hoy lunes, reorganízame la semana»
2. «Quiero estudiar Oratoria, investígamela y crea la guía»
3. «Agrégate un bloque de estudio mañana a las 10 am»
4. «Mándame un recordatorio al teléfono»

*(Para respuestas ilimitadas con IA generativa, puedes ingresar tu API Key gratuita de Gemini o de OpenRouter en los ajustes).*`,
      llamadasHerramientas: [],
      proveedor: 'offline_local'
    };
  }
}

export const llmProvider = new LLMProviderService();
