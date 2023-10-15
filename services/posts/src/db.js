import pg from "pg";
const { Pool } = pg;

const pool = new Pool({
  connectionString:
    process.env.PG_CONNECTION_STRING ??
    "postgres://postgres:postgrespassword@localhost:7432/postgres",
  min: 10,
  max: 50,
});

export default pool;
