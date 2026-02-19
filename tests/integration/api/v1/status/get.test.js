import orchestrator from "tests/orchestrator";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  // RESPONSE BODY
  const responseBody = await response.json();
  expect(responseBody.updated_at).toBeDefined();
  const parsetUpdatedAt = new Date(responseBody.updated_at).toISOString();
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

  expect();
});
