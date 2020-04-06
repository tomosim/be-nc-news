const { selectArticles, insertArticle } = require("../models/articles.models");

exports.sendArticles = (req, res, next) => {
  selectArticles(req.query)
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch(next);
};

exports.postArticle = (req, res, next) => {
  insertArticle(req.body).then((article) => {
    res.status(201).send({ article });
  });
};
