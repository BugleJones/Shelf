"use strict";

const express  = require('express');
const router  = express.Router();
const cookieSession = require('cookie-session');
const dataMoversFunction = require("../lib/resource-movers");

module.exports = knex => {
  const dataMovers = dataMoversFunction(knex);

  router.get("/", (request, response) => {
      knex('resources')
        .innerJoin('resource_tags', 'resources.id', 'resource_tags.resource_id')
        .innerJoin('tags', 'tags.id', 'resource_tags.tag_id')
        .innerJoin('likes', 'resources.id', 'likes.resource_id')
        .innerJoin('comments', 'resources.id', 'comments.resource_id')
        .innerJoin('users', 'resources.user_id', 'users.id')
        .then((results) => {
          response.json(results);
      });
  })

  router.post("/new", (request, response) => {
    let title = request.body.title;
    let url = request.body.url;
    let description = request.body.description;
    let user_id = request.session.user_id;
    let name = request.body.tag.toLowerCase();

    dataMovers.createResource(title, url, description, user_id).then((result) => {
      let resourceId = result;
    })

    //TODO Alter table to disalllow the name value from being null
    // if (!name) {
    //   return null;
    // }
    dataMovers.createTag(name).then((otherResult) => {
      let tagId = otherResult;
    })

    response.redirect("/")
    .catch((error) => console.log(error));
  });
  //
  // router.get("/:resourceid", (request, response) => {
  //   dataMovers.getResources().then((result) => {
  //     res.render()
  //   })
  // })

  return router;
}
// knex.select('title', 'author', 'year').from('books')
