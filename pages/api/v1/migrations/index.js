import migrationRunner from "node-pg-migrate";
import { join } from "node:path";

export default async function migrations(request, response) {
  console.log("Received request:", request.method, request.url);

  const defaultMigrationOptions = {
    dryRun: true,
    direction: "up",
    databaseUrl: process.env.DATABASE_URL,
    dir: join("infra", "migrations"),
    verbose: false,
    migrationsTable: "pgmigrations",
  };

  if (request.method === "GET") {
    const pendingMigrations = await migrationRunner(defaultMigrationOptions);

    return response.status(200).json(pendingMigrations);
  }

  if (request.method === "POST") {
    const migratedMigrations = await migrationRunner({
      ...defaultMigrationOptions,
      dryRun: false,
    });

    if (migratedMigrations.length === 0) {
      return response.status(200).json(migratedMigrations);
    }

    return response.status(201).json(migratedMigrations);
  }

  return response.status(405).json({ error: "Method Not Allowed" });
}
