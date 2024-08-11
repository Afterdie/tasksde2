const mysql = require("mysql2");
require("dotenv").config();
console.log();
const db = mysql.createConnection({
  host: process.env.MYSQLHOST,
  user: "root",
  password: process.env.MYSQLPASS,
  database: "world",
});

module.exports = db;
