test("GET to /api/v1/status should return to 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();

  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toEqual(parsedUpdatedAt);

  expect(responseBody.dependencies.database.version).toEqual("16.2");

  expect(responseBody.max_connections).toEqual(100);
  expect(responseBody.active_connections).toEqual(1);
});

/* test.only("Teste de SQL Injection", async () => {
  await fetch("http://localhost:3000/api/v1/status?databaseName=local_db");
  await fetch("http://localhost:3000/api/v1/status?databaseName=");
  await fetch("http://localhost:3000/api/v1/status?databaseName=';");
  await fetch(
    //"http://localhost:3000/api/v1/status?databaseName='; SELECT pg_sleep(4); --",
    "http://localhost:3000/api/v1/status?databaseName='; SELECT pg_sleep(4); --",
  ); 
}); */
