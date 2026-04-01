const fs = require("node:fs");
const path = require("node:path");
const dotenv = require("dotenv");
const dotenvExpand = require("dotenv-expand");

const envFileNames = [
  ".env",
  ".env.local",
  ".env.development",
  ".env.test",
  ".env.production",
];

function loadEnvFileIfExists(fileName) {
  const filePath = path.resolve(process.cwd(), fileName);

  if (!fs.existsSync(filePath)) {
    return;
  }

  const result = dotenv.config({
    path: filePath,
    override: false,
  });

  dotenvExpand.expand(result);
}

for (const envFileName of envFileNames) {
  loadEnvFileIfExists(envFileName);
}

process.env.POSTGRES_HOST ??= "localhost";
process.env.POSTGRES_USER ??= "localuser";
process.env.POSTGRES_PASSWORD ??= "localpassword";
process.env.POSTGRES_DB ??= "localdb";
process.env.POSTGRES_PORT ??= "5432";
process.env.PEPPER ??= "PEPPER";
process.env.DATABASE_URL ??=
  `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}` +
  `@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`;
