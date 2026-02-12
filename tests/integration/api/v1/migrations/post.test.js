import database from "infra/database.js";

beforeAll(async () => {
  await cleanDatabase();
});

async function cleanDatabase() {
  await database.query("drop schema public cascade; create schema public;");
}

test("POST to /api/v1/migrations should return 200", async () => {
  // firstResponse
  const firstResponse = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });
  expect(firstResponse.status).toBe(201);
  const fisrtResponseBody = await firstResponse.json();
  expect(Array.isArray(fisrtResponseBody)).toBe(true);
  expect(fisrtResponseBody.length).toBeGreaterThan(0);

  // secoundResponse
  const secoundResponse = await fetch(
    "http://localhost:3000/api/v1/migrations",
    {
      method: "POST",
    },
  );
  expect(secoundResponse.status).toBe(200);
  const secoundResponseBody = await secoundResponse.json();
  expect(Array.isArray(secoundResponseBody)).toBe(true);
  expect(secoundResponseBody.length).toBe(0);
});
