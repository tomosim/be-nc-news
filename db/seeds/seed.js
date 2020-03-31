const {
  usersData,
  topicsData,
  articlesData,
  commentsData
} = require("../data");

const {
  formatUsers,
  formatDates,
  makeRefObj,
  formatComments,
  formatLikes
} = require("../utils/utils");
exports.seed = function(knex) {
  return knex.migrate
    .rollback()
    .then(() => {
      return knex.migrate.latest();
    })
    .then(() => {
      const usersPromise = knex.insert(formatUsers(usersData)).into("users");
      const topicsPromise = knex.insert(topicsData).into("topics");
      return Promise.all([topicsPromise, usersPromise]);
    })
    .then(() => {
      return knex
        .insert(formatDates(articlesData))
        .into("articles")
        .returning("*");
    })
    .then(articleRows => {
      const articleRefObj = makeRefObj(articleRows);
      const commentsWithDates = formatDates(commentsData);
      const reformattedComments = formatComments(
        commentsWithDates,
        articleRefObj
      );
      const commentsPromise = knex.insert(reformattedComments).into("comments");

      const formattedLikes = formatLikes(usersData, articleRefObj);
      const likesPromise = knex.insert(formattedLikes).into("likes");
      return Promise.all([commentsPromise, likesPromise]);
    });
};
