"use strict";

const express = require('express');
const router  = express.Router();
const cookieSession = require('cookie-session');
const dataMoversFunction = require("../lib/resource-movers");

module.exports = knex => {
  const resourceMovers = dataMoversFunction(knex);

  router.get("/", (request, response) => {
    knex
    .select().from('resources')

    .then((rows) =>{
      var promises = []
      rows.forEach(function(row){
       let a = knex.select('id', 'users.username').from('users').where('id', row.user_id).then((user)=>{
          row.user = user[0];
        })
       promises.push(a);
       let b = knex.select('comments.content as message', 'comments.created_at', 'users.username').from('comments').join('users', 'comments.user_id', 'users.id').where('comments.resource_id', row.id).then((comments)=>{
          row.comments = comments;
       })
       promises.push(b);
       let c = knex.select('tags.name').from('tags').join('resource_tags', 'resource_tags.tag_id', 'tags.id').where('resource_tags.resource_id', row.id).then((tags)=>{
          row.tags = tags;
       })
       promises.push(c);
       let d = knex('likes').count('id').where('resource_id', row.id).then((likes)=>{
         row.likes = likes;
         console.log(likes);
       })
        promises.push(d);
     })
     return Promise.all(promises).then(()=>{
        return rows;
      })
    })
    .then((result) => {
      response.json(result);
    });
  })

  router.post("/new", (request, response) => {
    let title = request.body.title;
    let url = request.body.url;
    let description = request.body.description;
    let user_id = Number(request.session.user.id) || null;
    let name = request.body.tag.toLowerCase();

    resourceMovers.createResource(title, url, description, user_id).then((result) => {
      let resource_id = Number(result[0]) || 0;
      resourceMovers.createTag(name, resource_id).then((otherResult) => {
        let tagId = Number(otherResult[0]);
      })
    })

    //TODO Alter table to disalllow the name value from being null
    // if (!name) {
    //   return null;
    // }

    .catch((error) => console.log(error));
    response.redirect("/")
  })

  router.post("/comments/:user_id", (request, response) => {
    let content = request.body.content;
    let user_id = request.session.user.id;
    let resource_id = Number(request.body.resource_id);
    // let created_at = Date.now();

    resourceMovers.createComment(content, user_id, resource_id).then((furtherResult) => {
      let commentId = furtherResult[0];
    })
     .catch((error) => console.log(error));
     response.redirect("/")
  })

  return router;
}
