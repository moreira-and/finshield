import { createRouter } from "next-connect";
import database from "infra/database.js";
import controller from "infra/controller.js";

const router = createRouter();

router.get(getHandler);

export default router.handler(controller.errorHandlers);

async function getHandler(request, response) {
  const queryDbVersion = "SHOW server_version;";
  const queryActiveConn = {
    text: `
      SELECT count(*)::int AS active_connections 
      FROM pg_stat_activity 
      WHERE state = 'active' 
        AND datname = $1;`,
    values: [process.env.POSTGRES_DB],
  };

  const queryMaxConn = "SHOW max_connections;";
  const currentTime = new Date().toISOString();

  const resultDbVersion = await database.query(queryDbVersion);
  const resultActiveConnections = await database.query(queryActiveConn);
  const resultMaxConnections = await database.query(queryMaxConn);

  const versionValue = resultDbVersion.rows[0].server_version;
  const activeConnectionsValue =
    resultActiveConnections.rows[0].active_connections;
  const maxConnectionsValue = parseInt(
    resultMaxConnections.rows[0].max_connections,
  );

  return response.status(200).json({
    updated_at: currentTime,
    dependences: {
      database: {
        version: versionValue,
        active_connections: activeConnectionsValue,
        max_connections: maxConnectionsValue,
      },
    },
  });
}
