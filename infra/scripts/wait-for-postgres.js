const { exec } = require("node:child_process");

function checkDatabaseConnection() {
  exec("docker exec postgres-dev pg_isready --host localhost", handleReturn);
}

function handleReturn(stdout) {
  if (stdout.search("accepting connections") === -1) {
    process.stdout.write(".");
    setTimeout(checkDatabaseConnection, 1000); // Tenta novamente em 5 segundos
    return;
  }

  console.log("\n🟢 Banco de dados pronto e aceitando conexões!");
  return;
}

process.stdout.write("\n⏳ Aguardando o banco de dados ficar pronto.");
checkDatabaseConnection();
