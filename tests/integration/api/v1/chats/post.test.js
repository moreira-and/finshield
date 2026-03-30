import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
  await orchestrator.runPendingMigrations();
});

describe("POST /api/v1/chats", () => {
  describe("Anonymous user", () => {
    test("With unique and valid data", async () => {
      const payload = {
        question: "Qual é a capital do Brasil?",
        answer: "Brasília",
      };

      const response = await fetch("http://localhost:3000/api/v1/chats", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: payload.question,
        }),
      });
      expect(response.status).toBe(200);

      const responseBody = await response.json();
      expect(responseBody.model).not.toBe(null);
      expect(responseBody.content.toLowerCase()).toContain("brasília");
    });

    test("With invalid 'question' field", async () => {
      const response = await fetch("http://localhost:3000/api/v1/chats", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: "Oi!", // Menos de 5 caracteres
        }),
      });
      expect(response.status).toBe(400);

      const responseBody = await response.json();

      expect(responseBody).toEqual({
        name: "ValidationError",
        message: "O campo question deve ter no mínimo 5 caracteres.",
        action: "Informe uma pergunta com pelo menos 5 caracteres.",
        status_code: 400,
      });
    });
  });
});
