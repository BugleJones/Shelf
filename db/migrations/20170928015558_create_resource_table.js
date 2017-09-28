exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable("resources", function(table) {
      table.increments();
      table.text("url");
      table.string("title");
      table.string("description");
      table.string("thumbnail");
      table.integer("user_id");
      table.foreign("user_id").references("users.id");
      table.timestamps(true, true);
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.dropTable("resources")]);
};
