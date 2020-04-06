const knex = require("../db/connection");
const { checkExists } = require("./utils.models");

exports.selectArticles = ({ topic, author }) => {
  return knex
    .select("*")
    .from("articles")
    .modify((queryBuilder) => {
      if (topic !== undefined) {
        queryBuilder.where({ topic });
      }
    })
    .modify((queryBuilder) => {
      if (author !== undefined) {
        queryBuilder.where({ author });
      }
    })
    .then((articles) => {
      if (topic !== undefined && articles.length === 0) {
        return checkExists("topics", "slug", topic);
      }
      if (author !== undefined && articles.length === 0) {
        return checkExists("users", "username", author);
      }
      return articles;
    });
};
