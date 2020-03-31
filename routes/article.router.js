const articleRouter = require("express").Router();
const { sendArticles } = require("../controllers/articles.controllers");

articleRouter.get("/", sendArticles);

module.exports = articleRouter;
