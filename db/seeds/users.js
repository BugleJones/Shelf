exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex('users').insert({first_name: 'Alice', last_name: 'Murphy', email: 'alicemurphy@email.com', username: 'MurphysLaw', password: 'murphy'}),
        knex('users').insert({first_name: 'Bob', last_name: 'Jones', email: 'bobsojones@email.com', username: 'YoBob', password: 'jones'}),
        knex('users').insert({first_name: 'Charlie', last_name: 'Lankaster', email: 'charlie@email.com', username: 'CharlieDontSurf', password: 'lankaster'})
      ]);
    });
};
