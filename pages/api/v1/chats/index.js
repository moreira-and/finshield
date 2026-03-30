import { createRouter } from "next-connect";
import controller from "infra/controller.js";
import chat from "models/chat.js";

const router = createRouter();

router.post(postHandler);

export default router.handler(controller.errorHandlers);

async function postHandler(request, response) {
  const question = request.body.question;
  const chatResponse = await chat.generateAnswer(question);

  return response.status(200).json(chatResponse);
}
