exports.up = function (knex) {
  return knex.schema.createTable("likes", (table) => {
    table.increments("like_id");
    table.string("username").references("username").inTable("users");
    table
      .integer("article_id")
      .references("article_id")
      .inTable("articles")
      .onDelete("CASCADE");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("likes");
};
