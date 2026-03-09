import { createRouter } from "next-connect";
import { resolve } from "node:path";
import migrationRunner from "node-pg-migrate";
import controller from "infra/controller.js";
import database from "infra/database.js";

const router = createRouter();

router.get(getHandler);
router.post(postHandler);

export default router.handler(controller.errorHandlers);

const defaultMigrationOptions = {
  dryRun: true,
  direction: "up",
  dir: resolve("infra", "migrations"),
  verbose: false,
  migrationsTable: "pgmigrations",
};

async function getHandler(request, response) {
  const dbClient = database.getNewClient();

  try {
    await dbClient.connect();

    const migrationOptions = {
      ...defaultMigrationOptions,
      dbClient,
    };

    const pendingMigrations = await migrationRunner(migrationOptions);
    return response.status(200).json(pendingMigrations);
  } finally {
    await dbClient.end();
  }
}

async function postHandler(request, response) {
  const dbClient = database.getNewClient();

  try {
    await dbClient.connect();

    const migrationOptions = {
      ...defaultMigrationOptions,
      dbClient,
      dryRun: false,
    };

    const migratedMigrations = await migrationRunner(migrationOptions);

    if (migratedMigrations.length === 0) {
      return response.status(200).json(migratedMigrations);
    }

    return response.status(201).json(migratedMigrations);
  } finally {
    await dbClient.end();
  }
}
