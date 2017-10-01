"use strict";

const express  = require('express');
const router  = express.Router();
const cookieSession = require('cookie-session');
const dataMoversFunction = require("../lib/resource-movers");

module.exports = knex => {
  const dataMovers = dataMoversFunction(knex);

  router.get("/", function(request, response) {
    dataMovers.getResources((error, resources) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(resources);
      }
    });
  });

  router.get("/"), function(request, response) {
    dataMovers.getTags((error, response) => {
      if (err) {
        response.status(500).json({ error: err.message });
      } else {
        response.json(tags);
      }
    });
  };

  router.post("/new", (request, response, next) => {
    let title = request.body.title;
    let url = request.body.url;
    let description = request.body.description;
    let user_id = request.session.user_id;
    let name = request.body.tag;

    dataMovers.createResource(title, url, description, user_id).then((result) => {
      let resourceId = result;
    })

    //TODO Alter table to disalllow the name value from being null
    if (!name) {
      return null;
    }
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
