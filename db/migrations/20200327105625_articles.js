exports.up = function(knex) {
  return knex.schema.createTable("articles", table => {
    table.increments("article_id");
    table.string("title");
    table.string("body", 2000);
    table
      .string("author")
      .references("username")
      .inTable("users");
    table
      .string("topic")
      .references("slug")
      .inTable("topics");
    table.integer("votes").defaultsTo(0);
    table.timestamp("created_at").defaultsTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("articles");
};
