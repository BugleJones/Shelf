let userData = [{
  first_name: 'Alice',
  last_name: 'Murphy',
  email: 'alicemurphy@email.com',
  username: 'MurphysLaw',
  password: 'murphy',
  resources: [{
    url: 'https://www.vegas.com/gaming/gaming-tips/sports-betting/',
    title: 'Your #1 resource for sports-betting',
    description: 'In-depth to all your sports-betting needs'
  }]
  },
  {
    first_name: 'Bob',
    last_name: 'Jones',
    email: 'bobsojones@email.com',
    username: 'YoBob',
    password: 'jones',
    resources: [{
      url: 'http://superstringtheory.com/basics/basic4.html',
      title: 'String Theory',
      description: 'All the basics on string theory'
    }]
  },
  {
    first_name: 'Charlie',
    last_name: 'Lankaster',
    email: 'charlie@email.com',
    username: 'CharlieDontSurf',
    password: 'lankaster',
    resources: [{
      url: 'https://www.youtube.com/watch?v=DlNWxwtqjdc',
      title: 'The Art of Building Plastic Model Airplanes',
      description: 'Part 1 of the amazing 3 part series on building plastic model airplanes'
    }]
}]

const createUser = (knex, user) => {
  return knex('users').insert({
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    username: user.username,
    password: user.password
  }, 'id')
  .then(userId => {
    let resourcePromises = [];

    user.resources.forEach(resources => {
      resourcePromises.push(
        createResource(knex, {
          url: resources.url,
          title: resources.title,
          description: resources.description,
          user_id: userId[0]
        })
      )
    });

    return Promise.all(resourcePromises);
  })
};

const createResource = (knex, resource) => {
  return knex('resources').insert(resource);
};

exports.seed = (knex, Promise) => {
  return knex('resources').del() //renews resources first
    .then(() => knex('users').del()) //renews all users next
    .then(() => {
      let userPromises = [];

      userData.forEach(user => {
        userPromises.push(
          createUser(knex, user));
      });

      return Promise.all(userPromises);
    })
};
