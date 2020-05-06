const knex = require("knex");
const dbConfig = require("../knexfile");
console.log(dbConfig);

module.exports = knex(dbConfig);
