
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', function (table){
      table.increments();
      table.string('first_name');
      table.string('last_name');
      table.string('email');
      table.string('username');
      table.string('password');
      table.timestamps(true, true);
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
  knex.schema.dropTable('users')
  ])
};
