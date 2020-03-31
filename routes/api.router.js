const apiRouter = require("express").Router();
const articleRouter = require("./article.router");

apiRouter.use("/articles", articleRouter);

module.exports = apiRouter;
