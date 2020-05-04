const commentRouter = require("express").Router();
const {
  removeComment,
  editCommentVotes,
} = require("../controllers/comments.controllers");
const { checkVotes } = require("../db/utils/utils");

commentRouter
  .route("/:comment_id")
  .delete(removeComment)
  .patch(checkVotes, editCommentVotes);

module.exports = commentRouter;
