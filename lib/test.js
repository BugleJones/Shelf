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

module.exports = function makeSpecResourceMovers(knex) {

function loadResources() {
    return knex
    .select().from('resources')

    .then((rows) =>{
      // console.log(rows);
      var promises = []
      rows.forEach(function(row) {
       let a = knex.select('id', 'users.username').from('users').where('id', row.user_id).then((user)=>{
          // console.log(user);
          row.user = user[0];
        })
       promises.push(a);
       let b = knex.select('comments.content as message', 'comments.created_at', 'users.username').from('comments').join('users', 'comments.user_id', 'users.id').where('comments.resource_id', row.id).then((comments)=>{
          // console.log(comments);
          row.comments = comments;
       })
       promises.push(b);
       let c = knex.select('tags.name').from('tags').join('resource_tags', 'resource_tags.tag_id', 'tags.id').where('resource_tags.resource_id', row.id).then((tags)=>{
         //console.log(tags);
          row.tags = tags;
       })
       promises.push(c);
     })
     return Promise.all(promises).then(()=>{
        console.log(rows)
        return rows;
      })
    });
  }
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
