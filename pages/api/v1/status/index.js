import database from "infra/database.js";

async function status(request, response) {
  //response.status(200).send("API com comportamento adequado");
  //.json já seta o charset utf8
  const updatedAt = new Date().toISOString();
  const versionPostgres = await database.query("SHOW server_version;");
  const versionPostgresValue = versionPostgres.rows[0].server_version;

  const databaseMaxConnectionsResult = await database.query(
    "SHOW max_connections;",
  );
  const databaseMaxConnectionsValue =
    databaseMaxConnectionsResult.rows[0].max_connections;

  const databaseName = process.env.POSTGRES_DB;

  const activeConnectionsResult = await database.query({
    text: "SELECT count(*) ::int FROM pg_stat_activity where datname = $1;",
    values: [databaseName],
  });

  const databaseOpenedConnectionsValue = activeConnectionsResult.rows[0].count;

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: versionPostgresValue,
      },
    },
    //max_connections: maxConnections,
    max_connections: parseInt(databaseMaxConnectionsValue),
    active_connections: databaseOpenedConnectionsValue,
  });
}

export default status;
