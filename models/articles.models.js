const knex = require("../db/connection");

exports.selectArticles = () => {
  return knex.select("*").from("articles");
};
