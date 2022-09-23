"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectionDemo = exports.pool = void 0;
const { Pool } = require('pg');
exports.pool = new Pool({
    user: process.env.USERNAME,
    database: process.env.DB,
    password: process.env.PASSWORD,
    port: process.env.DBPORT,
    host: process.env.HOST
});
async function connectionDemo() {
    const query = "SELECT * FROM answers LIMIT 2";
    const example = await exports.pool.query(query);
    console.log(example);
}
exports.connectionDemo = connectionDemo;
;
