import migrationRunner from "node-pg-migrate";
import { join } from "node:path";
import database from "infra/database";

export default async function migrations(request, response) {
  const allowedMethods = ["GET", "POST"];
  if (!allowedMethods.includes(request.method)) {
    return response
      .status(405)
      .json({ error: `Method ${request.method} Not Allowed` });
  }

  const dbClient = database.getNewClient();

  try {
    await dbClient.connect();

    const defaultMigrationOptions = {
      dbClient: dbClient,
      dryRun: true,
      direction: "up",
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
  } catch (error) {
    console.error(error);
    return response.status(500).json({ error: "Internal Server Error" });
  } finally {
    await dbClient.end();
  }
}
