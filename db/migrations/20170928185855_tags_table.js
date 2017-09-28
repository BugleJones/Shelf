exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable("tags", function(table) {
      table.increments();
      table.string("name");
      table.timestamps(true, true);
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.dropTable("tags")]);
};
