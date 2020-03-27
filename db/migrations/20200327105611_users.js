exports.up = function(knex) {
  return knex.schema.createTable("users", table => {
    table.string("username").primary();
    table.string("name");
    table.string("avatar_url");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("users");
};
