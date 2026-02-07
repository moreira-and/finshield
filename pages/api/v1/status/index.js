import database from "infra/database.js";

async function status(request, response) {
  const result = await database.query("SELECT 1+1 AS sum;");
  console.log(result.rows);
  response.status(200).json({ status: "200" });
}

export default status;
