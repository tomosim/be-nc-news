const articleRouter = require("express").Router();
const {
  sendArticles,
  postArticle,
} = require("../controllers/articles.controllers");

articleRouter.route("/").get(sendArticles).post(postArticle);

module.exports = articleRouter;
