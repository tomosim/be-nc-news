const {
  selectComments,
  insertComment,
  deleteComment,
  updateComment,
} = require("../models/comments.models");

exports.sendComments = (req, res, next) => {
  const { article_id } = req.params;
  selectComments(article_id, req.query)
    .then((comments) => {
      res.send({ comments });
    })
    .catch(next);
};

exports.postComment = (req, res, next) => {
  const { article_id } = req.params;
  insertComment(article_id, req.body)
    .then((comment) => {
      res.status(201).send({ comment });
    })
    .catch(next);
};

exports.removeComment = (req, res, next) => {
  const { comment_id } = req.params;
  deleteComment(comment_id)
    .then(() => {
      res.status(204).send();
    })
    .catch(next);
};

exports.editCommentVotes = (req, res, next) => {
  const { comment_id } = req.params;
  const { inc_votes } = req.body;
  updateComment(comment_id)
    .then((comment) => {
      res.send({ comment });
    })
    .catch(next);
};
