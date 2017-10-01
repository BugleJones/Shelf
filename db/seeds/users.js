const bcrypt = require("bcrypt");

const userData = [
  {
    first_name: 'Alice',
    last_name: 'Murphy',
    email: 'alicemurphy@email.com',
    username: 'MurphysLaw',
    password: bcrypt.hashSync('murphy', 10),
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
    password: bcrypt.hashSync('jones', 10),
    resources: [{
      url: 'http://superstringtheory.com/basics/basic4.html',
      title: 'String Theory',
      description: 'All the basics on string theory',
    }]
  },
  {
    first_name: 'Charlie',
    last_name: 'Lankaster',
    email: 'charlie@email.com',
    username: 'CharlieDontSurf',
    password: bcrypt.hashSync('lankaster', 10),
    resources: [{
      url: 'https://www.youtube.com/watch?v=DlNWxwtqjdc',
      title: 'The Art of Building Plastic Model Airplanes',
      description: 'Part 1 of the amazing 3 part series on building plastic model airplanes'
    }]
  }
];


//Seeded Tag Table Data
const tagData = [
  {
    name: 'physics'
  },
  {
    name: 'planes'
  },
  {
    name: 'gambling'
  },
  {
    name: 'cool'
  },
  {
    name: 'fun'
  },
  {
    name: 'trendy'
  },
  {
    name: 'hipster'
  },
  {
    name: 'lit'
  },
  {
    name: 'games'
  },
  {
    name: 'basketball'
  },
  {
    name: 'sports'
  },
  {
    name: 'spicy'
  },
  {
    name: 'yum'
  },
  {
    name: 'books'
  },
  {
    name: 'math'
  },
  {
    name: 'sharks'
  },
  {
    name: 'archery tag'
  },
  {
    name: 'wiki'
  },
  {
    name: 'diy'
  },
  {
    name: 'brain food'
  },
];

//Seeded combined resource and tag table
const resourceTags = [
  {
    tag_name: 'physics',
    res_title: 'String Theory'
  },
  {
    tag_name: 'planes',
    res_title: 'The Art of Building Plastic Model Airplanes',
  },
  {
    tag_name: 'gambling',
    res_title: 'Your #1 resource for sports-betting',
  }
];

//Seeded likes table
const userLikes = [
  {
    username: 'CharlieDontSurf',
    res_title: 'String Theory',
    count: 9001,
  },
  {
    username: 'YoBob',
    res_title: 'String Theory',
    count: 1,
  },
  {
    username: 'CharlieDontSurf',
    res_title: 'The Art of Building Plastic Model Airplanes',
    count: 1,
  },
];

//Seeded comments table
const userComments = [
  {
    username: 'YoBob',
    res_title: 'String Theory',
    content: 'Incroyable!',
  },
  {
    username: 'MurphysLaw',
    res_title: 'The Art of Building Plastic Model Airplanes',
    content: 'Sorry, I prefer sports-betting exclusively',
  },
  {
    username: 'MurphysLaw',
    res_title: 'String Theory',
    content: 'Sorry, I prefer sports-betting exclusively',
  },
];


//Function that takes care of users and resources tables
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

//Starter resource seeding table
const createResource = (knex, resource) => {
  return knex('resources').insert(resource);
};

//Starter tags seeding table
const createTag = (knex, tag) => {
  return knex('tags').insert({
    name: tag.name
  }, 'id')
};

//Create resource_tags seeded table
const makeTag = (knex, tag, tableName) => {
  let tag_id;
  return knex('tags').select('id').where('name', tag.tag_name)
  .then(tag_ids => {
    tag_id = tag_ids[0].id;
    return knex('resources').select('id').where('title', tag.res_title);
  })
  .then(ids => {
    return knex(tableName).insert({
      tag_id: tag_id,
      resource_id: ids[0].id
    });
  })
}

//Create likes and comments table connected
const makeAuxilliary = (knex, auxilliary, tableName, third_column) => {
  let user_id;   // Only read inside .then callbacks
  return knex('users').select('id').where('username', auxilliary.username)
  .then(user_ids => {
    if (user_ids.length !== 1) { throw "Unable to complete function user auxilliary"; }
    user_id = user_ids[0].id; // Write into enclosed wider-scope
    return knex('resources').select('id').where('title', auxilliary.res_title);
  })
  .then(ids => {
    if (ids.length !== 1) { throw "Unable to complete function resources in makeAuxilliary"; }
    return knex(tableName).insert({
      [third_column]: auxilliary[third_column],
      user_id: user_id,   // Further reading of the enclosed variable
      resource_id: ids[0].id
    });
  })
}

exports.seed = (knex, Promise) => {
  return knex('likes').del()              // delete like seeds first
    .then(() => knex('comments').del())
    .then(() => knex('resource_tags').del())
    .then(() => knex('tags').del())
    .then(() => knex('resources').del())
    .then(() => knex('users').del())      // eliminate user seeds last
    .then(() => {
      let userPromises = userData.map(user => createUser(knex, user));
      return Promise.all(userPromises);
    })
    .then(() => {
      let likePromises = userLikes.map(like => makeAuxilliary(knex, like, 'likes', 'count'));
      return Promise.all(likePromises);
    })
    .then(() => {
      let commentPromises = userComments.map(comment => makeAuxilliary(knex, comment, 'comments', 'content'));
      return Promise.all(commentPromises);
    })
    .then(() => {
      let tagPromises = tagData.map(tag => createTag(knex, tag));
      return Promise.all(tagPromises);
    })
    .then(() =>{
      let tagPromises = resourceTags.map(tag => makeTag(knex, tag, 'resource_tags'));
      return Promise.all(tagPromises);
    })
};
