const { selectArticles } = require("../models/articles.models");

exports.sendArticles = (req, res) => {
  selectArticles().then(articles => {
    res.status(200).send({ articles });
  });
};
