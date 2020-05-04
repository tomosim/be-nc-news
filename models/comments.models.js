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

exports.deleteComment = (comment_id) => {
  return knex("comments")
    .delete()
    .where({ comment_id })
    .then((rowCount) => {
      if (rowCount === 0)
        return Promise.reject({ status: 404, msg: "Comment not found" });
      else return;
    });
};

exports.updateComment = (comment_id, inc_votes) => {
  return knex("comments")
    .increment("votes", inc_votes)
    .where({ comment_id })
    .returning("*")
    .then(([comment]) => {
      if (comment === undefined) {
        return Promise.reject({ status: 404, msg: "Comment not found" });
      }
      return comment;
    });
};
