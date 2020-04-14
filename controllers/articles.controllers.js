const {
  selectArticles,
  insertArticle,
  selectArticle,
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
