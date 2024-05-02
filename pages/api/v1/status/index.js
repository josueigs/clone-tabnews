import database from "../../../../infra/database.js";

async function status(request, response) {
  //response.status(200).send("API com comportamento adequado");
  //.json já seta o charset utf8
  const result = await database.query("SELECT 1 + 1 as sum;");
  console.log(result.rows);
  response.status(200).json({ chave: "API com configuração adequada" });
}

export default status;
