"use strict";

const express = require("express");
const router = express.Router();
const cookieSession = require('cookie-session');
const dataMoversFunction = require("../lib/data-movers");

module.exports = knex => {
  const dataMovers = dataMoversFunction(knex);

  router.get("/", (request, response) => {
    dataMovers.umLikes(req.body);
  });

  router.post("/", (request, response) => {
    let user_id = request.session.user.id;
    dataMovers.likeHandler(req.body, user_id);
    dataMovers.sumLikes(req.body).then((result) => {

    })
  });


  return router;
};
