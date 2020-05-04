const apiRouter = require("express").Router();
const articleRouter = require("./article.router");
const commentRouter = require("./comment.router");
const topicRouter = require("./topic.router");

apiRouter.use("/articles", articleRouter);
apiRouter.use("/comments", commentRouter);
apiRouter.use("/topics", topicRouter);

module.exports = apiRouter;
