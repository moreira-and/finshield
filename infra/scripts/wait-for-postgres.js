const { exec } = require("node:child_process");

function checkDatabaseConnection() {
  exec("docker exec postgres-dev pg_isready --host localhost", handleReturn);
}

function handleReturn(error, stdout) {
  if (error) {
    console.log("⏳ Aguardando o banco...");
    setTimeout(checkDatabaseConnection, 1000);
    return;
  }

  if (!stdout || !stdout.includes("accepting connections")) {
    console.log("⏳ Ainda não está pronto...");
    setTimeout(checkDatabaseConnection, 1000);
    return;
  }

  console.log("✅ Postgres pronto.");
  return;
}

process.stdout.write("\n⏳ Aguardando o banco de dados ficar pronto.");
checkDatabaseConnection();
