const knex = require("../db/connection");

exports.selectUsers = () => {
  return knex("users").select("*");
};
