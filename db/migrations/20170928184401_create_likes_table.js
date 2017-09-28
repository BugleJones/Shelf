exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable("likes", function(table) {
      table.increments();
      table.integer("count");
      table.integer("resource_id");
      table.foreign("resource_id").references("resources.id");
      table.integer("user_id");
      table.foreign("user_id").references("users.id");
      table.timestamps(true, true);
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.dropTable("likes")]);
};
