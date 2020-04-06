const express = require("express");
const apiRouter = require("./routes/api.router");
const { handleCustomErrors, handlePSQLErrors } = require("./errors");

const app = express();
app.use(express.json());

app.use("/api", apiRouter);

app.use(handleCustomErrors);
app.use(handlePSQLErrors);

module.exports = app;
