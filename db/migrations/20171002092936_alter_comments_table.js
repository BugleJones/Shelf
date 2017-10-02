
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table("comments", function(table) {
      table.dropColumn('username');
      table.dropForeign('username');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
  knex.schema.table('comments', function(table) {
    table.string("username");
    table.foreign("username").references("users.username");
    })
  ]);
};
