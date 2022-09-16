const { Pool } = require('pg');

export const pool = new Pool({
  user: process.env.USER,
  database: process.env.DB,
  password: process.env.PASS,
  port: process.env.DBPORT,
  host: process.env.HOST
});

export async function connectionDemo() {
  const query = "SELECT * FROM answers LIMIT 2";
  const example = await pool.query(query);
  console.log(example);
};