exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable("resource_tags", function(table) {
      table.increments();
      table.integer("resource_id");
      table.foreign("resource_id").references("resources.id");
      table.integer("tag_id");
      table.foreign("tag_id").references("tags.id");
      table.timestamps(true, true);
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.dropTable("resource_tags")]);
};
