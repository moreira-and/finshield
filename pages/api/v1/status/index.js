import { createRouter } from "next-connect";
import database from "infra/database.js";
import { InternalServerError, MethodNotAllowedError } from "infra/errors.js";

const router = createRouter();

router.get(getHandler);

export default router.handler({
  onNoMatch: onNoMatchHandler,
  onError: onErrorHandler,
});

function onErrorHandler(error, request, response) {
  const publicErrorObject = new InternalServerError({
    cause: error,
  });
  console.info("Error dentro do catch do next-connect.");
  console.error("Error fetching /api/v1/status:", publicErrorObject);
  return response.status(publicErrorObject.status_code).json(publicErrorObject);
}

function onNoMatchHandler(request, response) {
  const publicErrorObject = new MethodNotAllowedError();
  return response.status(publicErrorObject.status_code).json(publicErrorObject);
}

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
