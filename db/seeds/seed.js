const {
  usersData,
  topicsData,
  articlesData,
  commentsData
} = require("../data");

const { formatUsers, formatDates } = require("../utils/utils");
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
    .then(console.log);
};
