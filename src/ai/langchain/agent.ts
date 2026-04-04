import { ChatOpenAI } from "@langchain/openai";

export class LangChainAgent {
  private model: ChatOpenAI;

  constructor(apiKey: string) {
    this.model = new ChatOpenAI({
      openAIApiKey: apiKey,
      temperature: 0.1,
    });
  }

  async run(prompt: string) {
    const response = await this.model.invoke(prompt);
    return response;
  }
}
