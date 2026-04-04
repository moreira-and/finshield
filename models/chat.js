import { ValidationError } from "infra/errors.js";
import llm from "infra/llm.js";

async function generateAnswer(question) {
  const validQuestion = validateQuestion(question);

  const llmResponse = await llm.default.generate(validQuestion);

  return llmResponse;
}

function validateQuestion(question) {
  if (typeof question !== "string") {
    throw new ValidationError({
      message: "O campo question deve ser uma string.",
      action: "Envie o campo question como texto.",
    });
  }

  const normalizedQuestion = question.trim();

  if (normalizedQuestion.length < 5) {
    throw new ValidationError({
      message: "O campo question deve ter no mínimo 5 caracteres.",
      action: "Informe uma pergunta com pelo menos 5 caracteres.",
    });
  }

  return normalizedQuestion;
}

const chat = {
  generateAnswer,
};

export default chat;
