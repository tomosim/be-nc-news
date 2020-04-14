const {
  selectArticles,
  insertArticle,
  selectArticle,
  updateArticle,
  deleteArticle,
} = require("../models/articles.models");

exports.sendArticles = (req, res, next) => {
  selectArticles(req.query)
    .then((articles) => {
      res.send({ articles });
    })
    .catch(next);
};

exports.postArticle = (req, res, next) => {
  insertArticle(req.body)
    .then((article) => {
      res.status(201).send({ article });
    })
    .catch(next);
};

exports.sendArticle = (req, res, next) => {
  const { article_id } = req.params;
  selectArticle(article_id)
    .then((article) => {
      res.send({ article });
    })
    .catch(next);
};

exports.editVotes = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;
  updateArticle(article_id, inc_votes)
    .then((article) => {
      res.send({ article });
    })
    .catch(next);
};

exports.removeArticle = (req, res, next) => {
  const { article_id } = req.params;
  deleteArticle(article_id)
    .then(() => {
      res.status(204).send();
    })
    .catch(next);
};
