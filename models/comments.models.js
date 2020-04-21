const knex = require("../db/connection");

const { checkExists } = require("./utils.models");

exports.selectComments = (article_id, { sort_by = "created_at", order }) => {
  order = order === "desc" || order === "asc" ? order : "desc";
  return knex("comments")
    .select("*")
    .where({ article_id })
    .orderBy(sort_by, order)
    .then((comments) => {
      if (comments.length === 0) {
        return checkExists("articles", "article_id", article_id);
      } else return comments;
    });
};

exports.insertComment = (article_id, newComment) => {
  return knex("comments")
    .insert({ article_id, ...newComment })
    .returning("*")
    .then(([comment]) => {
      return comment;
    });
};
