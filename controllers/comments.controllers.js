const { selectComments, insertComment } = require("../models/comments.models");

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
