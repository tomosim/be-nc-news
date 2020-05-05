const knex = require("knex");
console.log(process.env.NODE_ENV);
const dbConfig = require("../knexfile");

module.exports = knex(dbConfig);
