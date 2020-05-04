const knex = require("../db/connection");

exports.selectTopics = () => {
  return knex("topics").select("*");
};

exports.insertTopic = (newTopic) => {
  return knex("topics")
    .insert(newTopic)
    .returning("*")
    .then(([topic]) => {
      return topic;
    });
};
