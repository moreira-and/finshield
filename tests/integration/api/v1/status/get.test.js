import orchestrator from "tests/orchestrator";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

describe("GET /api/v1/status", () => {
  describe("Anonymous user", () => {
    test("Retrieving current system status", async () => {
      const response = await fetch("http://localhost:3000/api/v1/status");
      const responseBody = await response.json();
      const parsetUpdatedAt = new Date(responseBody.updated_at).toISOString();

      // STATUS
      expect(response.status).toBe(200);
      expect(responseBody.updated_at).toBeDefined();
      expect(responseBody.updated_at).toBe(parsetUpdatedAt);

      // DEPENDENCES
      expect(responseBody.dependences).toBeDefined();

      // DATABASE
      expect(responseBody.dependences.database).toBeDefined();
      expect(responseBody.dependences.database.version).toMatch(/^16\./);
      expect(responseBody.dependences.database.active_connections).toEqual(1);
      expect(
        responseBody.dependences.database.max_connections,
      ).toBeGreaterThanOrEqual(99);
    });
  });
});
