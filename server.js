const express = require("express");
const config = require("./configs/config");
const index = require("./routes/index");
const app = express();
// const PORT = 3000;
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(index);
app.listen(config.SERVER_PORT, () => {
  console.log(
    `⚡️[server]: Server is running at https://localhost:${config.SERVER_PORT}`
  );
});
