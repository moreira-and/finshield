import { Client } from "pg";

async function query(queryObject) {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
  });

  let result;

  try {
    await client.connect();
    await client.query("BEGIN TRANSACTION;");
    result = await client.query(queryObject);
    await client.query("COMMIT TRANSACTION;");
  } catch (error) {
    console.error("Error executing query:", error);
    await client.query("ROLLBACK TRANSACTION;");
    throw error;
  } finally {
    await client.end();
  }

  return result;
}

export default {
  query: query,
};
