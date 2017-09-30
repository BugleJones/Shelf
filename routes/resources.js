"use strict";

const express  = require('express');
const router  = express.Router();
const datamoversFunction = require("../lib/resource-movers");

module.exports = knex => {
  const datamovers = datamoversFunction(knex);

  router.get("/", function(request, response) {
    dataMovers.getResources((error, resources) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(resources);
      }
    });
  });

  router.post("/new", (request, response) => {
    let title = request.body.title;
    let url = request.body.url;
    let description = request.body.email;

    dataMovers.addResource(title, url, description).then((result) => {
      let user_id = request.session.user_id;
      response.redirect("/")
    }
    .catch((error) => console.log(error));
  });

  router.get("/:resourceid", (request, response) => {
    dataMovers.getResources().then((result) => {
      res.render()
    }
  }

  return router;
}
// knex.select('title', 'author', 'year').from('books')
