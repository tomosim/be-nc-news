const express = require("express");
const apiRouter = require("./routes/api.router");
const { handleCustomErrors } = require("./errors");

const app = express();

app.use("/api", apiRouter);

app.use(handleCustomErrors);

module.exports = app;
