const knex = require("../db/connection");

exports.checkExists = (table, column, value) => {
  return knex
    .select("*")
    .from(table)
    .where({ [column]: value })
    .then((result) => {
      if (result.length === 0) {
        const resource = table[0].toUpperCase() + table.slice(1, -1);
        return Promise.reject({ status: 404, msg: `${resource} not found` });
      } else return [];
    });
};
