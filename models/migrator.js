import { resolve } from "node:path";
import migrationRunner from "node-pg-migrate";
import database from "infra/database.js";

const defaultMigrationOptions = {
  dryRun: true,
  direction: "up",
  dir: resolve("infra", "migrations"),
  verbose: false,
  migrationsTable: "pgmigrations",
};

async function listPendingMigrations() {
  const dbClient = database.getNewClient();

  try {
    await dbClient.connect();

    const migrationOptions = {
      ...defaultMigrationOptions,
      dbClient,
    };

    const pendingMigrations = await migrationRunner(migrationOptions);

    return pendingMigrations;
  } finally {
    await dbClient?.end();
  }
}

async function runPendingMigrations() {
  const dbClient = database.getNewClient();

  try {
    await dbClient.connect();

    const migrationOptions = {
      ...defaultMigrationOptions,
      dbClient,
      dryRun: false,
    };

    const pendingMigrations = await migrationRunner(migrationOptions);

    return pendingMigrations;
  } finally {
    await dbClient?.end();
  }
}

const migrator = { listPendingMigrations, runPendingMigrations };

export default migrator;
