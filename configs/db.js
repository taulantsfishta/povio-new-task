const mysql = require("mysql");
const config = require("./config");
//Connect to DB
const pool = mysql.createPool({
  connectionLimit: 1000,
  connectTimeout: 60 * 60 * 1000,
  acquireTimeout: 60 * 60 * 1000,
  timeout: 60 * 60 * 1000,
  host: config.HOST,
  port: config.port,
  user: config.USER,
  password: config.PASSWORD,
  database: config.DB,
});

module.exports = pool;
