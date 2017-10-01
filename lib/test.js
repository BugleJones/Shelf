var knex = require('knex')({

  client: 'postgresql',
  connection: {
    host: 'localhost',
    user: 'labber',
    password: 'labber',
    database: 'midterm',
    port: 5432
  }
});

loadResources();

function loadResources() {
    return knex
    .select().from('resources')
    //.join('resource_tags', 'resource_id', 'resource_tags.resource_id')
    // .join('tags', 'tags.id', 'resource_tags.tag_id')
    // .join('users', 'user_id', 'resources.user_id')
    // .join('likes', 'resource_id', 'likes.resource_id')
    // .join('comments', 'resource_id', 'comments.resource_id')
    .then((rows) =>{
      // console.log(rows);
      var promises = []
      rows.forEach(function(row){
       let a = knex.select('id', 'username').from('users').where('id', row.user_id).then((user)=>{
          // console.log(user);
          row.user = user[0];
        })
       promises.push(a);
       let b = knex.select('comments.content as message', 'comments.created_at', 'users.username').from('comments').join('users', 'comments.user_id', 'users.id').where('comments.resource_id', row.id).then((comments)=>{
          // console.log(comments);
          row.comments = comments;
       })
       promises.push(b);
     })
     return Promise.all(promises).then(()=>{
        return rows;
      })
    });
  }
// 'resources.id', 'resources.title', 'resources.description', 'resources.url',

// 'tags.name','users.id', 'users.username', 'likes.count', 'comments.user_id', 'comments.content'

/*
{
      id: id,
      title: "Cool Resource Title " + id,
      description: "this is a resource" + id,
      url: "http://example.com",
      created_at: 12248134314 + id,
      tags: ["good", "cool", "funny"],
      user: {
        id: id,
        username: "YoBob"
      },
      likes: [id],
      isLiked: true,
      comments: [
        {
          username: "AMurph",
          message: "Great resource!",
          created_at: 12248134314 + id
        },
        {
          username: "CharlieDontSurf",
          message: "This is dumb.",
          created_at: 122481343454 + id
        }
      ]
    };
    */
