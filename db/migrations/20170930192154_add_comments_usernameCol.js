
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('comments', function(table) {
    table.string("username");
    table.foreign("username").references("users.username");
    })
  ]);
};

exports.down = function(knex, Promise) {

  return Promise.all([
    knex.schema.table('comments', function (table) {
    table.dropForeign('username');
    table.dropColumn('username');
    })
  ]);
};
