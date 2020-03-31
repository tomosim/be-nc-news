const knex = require("../db/connection");
const { checkExists } = require("./utils.models");

exports.selectArticles = ({ topic }) => {
  return knex
    .select("*")
    .from("articles")
    .modify(queryBuilder => {
      if (topic !== undefined) {
        queryBuilder.where({ topic });
      }
    })
    .then(articles => {
      if (topic !== undefined && articles.length === 0)
        return checkExists("topics", "slug", topic);
      return articles;
    });
};
