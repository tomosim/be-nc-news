const { selectArticles } = require("../models/articles.models");

exports.sendArticles = async (req, res, next) => {
  selectArticles(req.query)
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch(next);
};
