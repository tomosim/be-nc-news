const apiRouter = require("express").Router();
const articleRouter = require("./article.rxouter");
const commentRouter = require("./comment.router");
const topicRouter = require("./topic.router");
const userRouter = require("./user.router");

const endpoints = require("../endpoints.json");

apiRouter.get("/", endpoints);

apiRouter.use("/articles", articleRouter);
apiRouter.use("/comments", commentRouter);
apiRouter.use("/topics", topicRouter);
apiRouter.use("/users", userRouter);

module.exports = apiRouter;
