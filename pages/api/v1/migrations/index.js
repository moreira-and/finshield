import migrationRunner from "node-pg-migrate";
import { join } from "node:path";

export default async function migrations(request, response) {
  return response.status(405).json({ error: "Method not allowed" });

  console.log("Received request:", request.method, request.url);
  if (request.method === "GET") {
    const migrations = await migrationRunner({
      dryRun: true,
      direction: "up",
      databaseUrl: process.env.DATABASE_URL,
      dir: join("infra", "migrations"),
      verbose: true,
      migrationsTable: "pgmigrations",
    });
    return response.status(200).json(migrations);
  }

  if (request.method === "POST") {
    const migrations = await migrationRunner({
      dryRun: false,
      direction: "up",
      databaseUrl: process.env.DATABASE_URL,
      dir: join("infra", "migrations"),
      verbose: true,
      migrationsTable: "pgmigrations",
    });
    return response.status(200).json(migrations);
  }
}
