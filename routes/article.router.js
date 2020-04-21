const articleRouter = require("express").Router();
const {
  sendArticles,
  postArticle,
  sendArticle,
  editVotes,
  removeArticle,
} = require("../controllers/articles.controllers");
const {
  sendComments,
  postComment,
} = require("../controllers/comments.controllers");
const { checkBody } = require("../db/utils/utils");

articleRouter.route("/").get(sendArticles).post(postArticle);

articleRouter
  .route("/:article_id")
  .get(sendArticle)
  .patch(checkBody, editVotes)
  .delete(removeArticle);

articleRouter
  .route("/:article_id/comments")
  .get(sendComments)
  .post(postComment);

module.exports = articleRouter;
