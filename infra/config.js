console.assert(
  process.env.OPENROUTER_API_KEY,
  "OPENROUTER_API_KEY environment variable is not set. Please set it to your OpenRouter API key.",
);

const llmConfig = {
  ApiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": "finshield.com.br", // Optional. Site URL for rankings on openrouter.ai.
    "X-OpenRouter-Title": "SmartModelRouterGateway", // Optional. Site title for rankings on openrouter.ai.
  },
  port: process.env.PORT || 3000,
  stream: process.env.STREAM === "true",
  models: [
    "liquid/lfm-2.5-1.2b-thinking:free",
    "nvidia/nemotron-3-nano-30b-a3b:free",
  ],
  temperature: 0.1,
  maxTokens: 50,
  systemPrompt: "Você é um assistente útil e prestativo.",

  provider: {
    sort: {
      //by: "price",
      //by: "throughput",
      by: "latency",
      partition: "none",
    },
  },
};

const config = { llmConfig };

export default config;
