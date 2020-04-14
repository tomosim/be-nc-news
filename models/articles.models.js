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
    .select("articles.*")
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
    .count("comments.article_id AS comment_count")
    .leftJoin("comments", "comments.article_id", "=", "articles.article_id")
    .groupBy("articles.article_id")
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

exports.insertArticle = function (article) {
  return knex
    .insert(article)
    .into("articles")
    .returning("*")
    .then(([article]) => {
      return article;
    });
};

exports.selectArticle = (article_id) => {
  return knex
    .first("articles.*")
    .from("articles")
    .count("comments.article_id AS comment_count")
    .leftJoin("comments", "comments.article_id", "=", "articles.article_id")
    .groupBy("articles.article_id")
    .where("articles.article_id", article_id)
    .then((article) => {
      if (article === undefined) {
        return Promise.reject({ status: 404, msg: "Article not found" });
      } else return article;
    });
};

exports.updateArticle = (article_id, inc_votes) => {
  return knex("articles")
    .where({ article_id })
    .increment({ votes: inc_votes })
    .returning("*")
    .then(([article]) => {
      if (article === undefined) {
        return Promise.reject({ status: 404, msg: "Article not found" });
      } else return article;
    });
};
