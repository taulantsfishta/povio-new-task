const dotenv = require("dotenv");
dotenv.config();
const config = {
  HOST: process.env.DB_HOST || "127.0.0.1",
  USER: process.env.DB_USER || "root",
  PASSWORD: process.env.DB_PASSWORD || "123456",
  DB: process.env.DB_NAME || "povio_db",
  port: process.env.DB_PORT || "3307",
  dialect: "mysql",
  TOKEN: "shqiprietnike--",
};

module.exports = config;
