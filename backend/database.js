const mysql = require("mysql2");
require("dotenv").config();
console.log();
const db = mysql.createConnection({
  host: process.env.MYSQLHOST,
  port: process.env.MYSQLPORT,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASS,
  database: process.env.MYSQLDB,
});

module.exports = db;
