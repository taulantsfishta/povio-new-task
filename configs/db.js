const mysql = require("mysql");
const config = require("./config");
//Connect to DB
const pool = mysql.createPool({
  connectionLimit: 10,
  host: config.DB_HOST,
  port: config.DB_PORT,
  user: config.DB_USER,
  password: "",
  database: config.MYSQL_DB,
});
module.exports = pool;
