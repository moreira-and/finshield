import { OpenRouter } from "@openrouter/sdk";
import config from "./config.js";
import { ServiceError } from "./errors.js";

export class LLMService {
  constructor(configOverride) {
    this._config = configOverride || config.llmConfig;
    this._client = new OpenRouter({
      apiKey: this._config.apiKey,
      defaultHeaders: { ...this._config.defaultHeaders },
    });
  }

  async generate(prompt) {
    try {
      const response = await this._client.chat.send({
        models: this._config.models, // suporta array ou string
        messages: [
          { role: "system", content: this._config.systemPrompt },
          { role: "user", content: prompt },
        ],
        stream: this._config.stream, // evita quebrar leitura de choices
        temperature: this._config.temperature,
        max_tokens: this._config.maxTokens,
        provider: this._config.provider,
      });

      const content = response?.choices?.[0]?.message?.content;

      if (!content) {
        throw new Error("Resposta do LLM sem conteúdo válido");
      }

      return {
        model: response.model,
        content,
      };
    } catch (error) {
      throw new ServiceError({
        cause: error,
        message: error?.message || "Erro ao gerar resposta do LLM.",
      });
    }
  }
}

const llm = {
  default: new LLMService(),
};

export default llm;
