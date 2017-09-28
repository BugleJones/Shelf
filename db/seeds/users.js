exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(() => knex('resources').del())
    .then(function () {
      return Promise.all([
        //Knex for users table
        knex('users').insert({first_name: 'Alice', last_name: 'Murphy', email: 'alicemurphy@email.com', username: 'MurphysLaw', password: 'murphy'}),
        knex('users').insert({first_name: 'Bob', last_name: 'Jones', email: 'bobsojones@email.com', username: 'YoBob', password: 'jones'}),
        knex('users').insert({first_name: 'Charlie', last_name: 'Lankaster', email: 'charlie@email.com', username: 'CharlieDontSurf', password: 'lankaster'})
        .returning('id')
        .then((id)=>{
          return knex('resources').insert([
            //Knex for resources table
            {url: 'https://www.vegas.com/gaming/gaming-tips/sports-betting/', title: 'Your #1 resource for sports-betting', description: 'In-depth to all your sports-betting needs', user_id: id[0]}
            // {url: 'http://superstringtheory.com/basics/basic4.html', title: 'String Theory', description: 'All the basics on string theory', user_id: id[0]},
            // {url: 'https://www.youtube.com/watch?v=DlNWxwtqjdc', title: 'The Art of Building Plastic Model Airplanes', description: 'Part 1 of the amazing 3 part series on building plastic model airplanes', user_id: id[0]}
          ])
        })
      ])
    });
};
