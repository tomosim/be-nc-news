const articleRouter = require("express").Router();
const {
  sendArticles,
  postArticle,
  sendArticle,
} = require("../controllers/articles.controllers");

articleRouter.route("/").get(sendArticles).post(postArticle);

articleRouter.route("/:article_id").get(sendArticle);

module.exports = articleRouter;
