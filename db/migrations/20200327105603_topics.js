exports.up = function(knex) {
  return knex.schema.createTable("topics", table => {
    table.increments("id");
    table.string("description");
    table.string("slug");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("topics");
};
