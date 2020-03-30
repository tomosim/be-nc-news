exports.up = function(knex) {
  return knex.schema.createTable("comments", table => {
    table.increments("comment_id").primary();
    table.string("body");
    table
      .integer("article_id")
      .references("article_id")
      .inTable("articles");
    table
      .string("username")
      .references("username")
      .inTable("users");
    table.integer("votes").defaultsTo(0);
    table.timestamp("created_at").defaultsTo(knex.fn.now(6));
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("comments");
};
