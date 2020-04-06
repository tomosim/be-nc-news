const knex = require("../db/connection");
const { checkExists } = require("./utils.models");

exports.selectArticles = ({
  topic,
  author,
  liked,
  sort_by = "created_at",
  order,
}) => {
  order = order === "desc" || order === "asc" ? order : "desc";
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
    .modify((queryBuilder) => {
      if (liked !== undefined) {
        queryBuilder
          .join("likes", "articles.article_id", "likes.article_id")
          .join("users", "likes.username", "users.username")
          .where("users.username", liked);
      }
    })
    .orderBy(sort_by, order)
    .then((articles) => {
      if (topic !== undefined && articles.length === 0) {
        return checkExists("topics", "slug", topic);
      }
      if (author !== undefined && articles.length === 0) {
        return checkExists("users", "username", author);
      }
      if (liked !== undefined && articles.length === 0) {
        return checkExists("users", "username", liked);
      }
      return articles;
    });
};
