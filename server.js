const express = require("express");
const cors = require("cors");
const apiRouter = require("./routes/api.router");
const {
  handleCustomErrors,
  handlePSQLErrors,
  handle500s,
} = require("./errors");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", apiRouter);

app.use(handlePSQLErrors);
app.use(handleCustomErrors);
app.use(handle500s);

module.exports = app;
