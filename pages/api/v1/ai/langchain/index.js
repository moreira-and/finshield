import { createRouter } from "next-connect";
import controller from "infra/controller.js";
import config from "infra/config.js";

const router = createRouter();

router.post(postHandler);

export default router.handler(controller.errorHandlers);

async function postHandler(req, res) {
  const { prompt } = req.body;

  const { LangChainAgent } = await import("../../../../src/ai/langchain/agent.js");

  const agent = new LangChainAgent(config.llmConfig.ApiKey);

  const result = await agent.run(prompt);

  return res.status(200).json({
    data: result,
  });
}
