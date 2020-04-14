const articleRouter = require("express").Router();
const {
  sendArticles,
  postArticle,
  sendArticle,
  editVotes,
} = require("../controllers/articles.controllers");
const { checkBody } = require("../db/utils/utils");

articleRouter.route("/").get(sendArticles).post(postArticle);

articleRouter
  .route("/:article_id")
  .get(sendArticle)
  .patch(checkBody, editVotes);

module.exports = articleRouter;
