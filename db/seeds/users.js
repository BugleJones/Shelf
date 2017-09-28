let userData = [
  {
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
      description: 'All the basics on string theory',
      likes: {
        'MurphysLaw': 5,
        'CharlieDontSurf': 1,
      }
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
  }
];

const weLikeLikes = [
  {
    username: 'CharlieDontSurf',
    res_title: 'String Theory',
    count: 9001,
  },
];

const weHasComments = [
  {
    username: 'YoBob',
    res_title: 'String Theory',
    content: 'incroyable',
  },
];


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

const makeAuxilliary = (knex, likeThing, tableName, third_column) => {
  let user_id;   // yes that's undefined.  only read inside .then callbacks!
  return knex('users').select('id').where('username', likeThing.username)
  .then(user_ids => {
    if (user_ids.length !== 1) { throw "why in the sam h*ck is this non-unique?"; }
    user_id = user_ids[0].id; // write into enclosed wider-scope nonsense
    return knex('resources').select('id').where('title', likeThing.res_title);
  })
  .then(ids => {
    if (ids.length !== 1) { throw "why in the sam h*ck is this non-unique?"; }
    return knex(tableName).insert({
      [third_column]: likeThing[third_column],
      user_id: user_id,   // more blasphemous reading of the enclosed variable
      resource_id: ids[0].id
    });
  })
}

exports.seed = (knex, Promise) => {
  return knex('likes').del()              // eliminate leaves first
    .then(() => knex('comments').del())
    .then(() => knex('resources').del())
    .then(() => knex('users').del())      // eliminate root last
    .then(() => {
      let userPromises = userData.map(user => createUser(knex, user));
      return Promise.all(userPromises);
    })
    .then(() => {
      let likerPromises = weLikeLikes.map(like => makeAuxilliary(knex, like, 'likes', 'count'));
      return Promise.all(likerPromises);
    })
    .then(() => {
      let commentPromises = weHasComments.map(comment => makeAuxilliary(knex, comment, 'comments', 'content'));
      return Promise.all(commentPromises);
    })
};
