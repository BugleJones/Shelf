
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table("resources", function(table) {
      table.dropColumn('thumbnail');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table("resources", function(table) {
      table.string('thumbnail');
    })
  ]);
};
