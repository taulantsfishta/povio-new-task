const express = require("express");
const config = require("./configs/config");
const index = require("./routes/index");
require("dotenv").config();
const app = express();
const PORT = process.env.NODE_DOCKER_PORT || 3001;
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(index);
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${3001}`);
  });
}

module.exports = app;
