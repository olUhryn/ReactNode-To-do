import pg from "pg";
const { Pool } = pg;
// move to env
let localPoolConfig = {
  user: "postgres",
  password: "1",
  host: "localhost",
  port: "5432",
  database: "tododb",
};

const poolConfig = process.env.DATABASE_URL
  ? {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    }
  : localPoolConfig;

const pool = new Pool(poolConfig);

export default pool;
