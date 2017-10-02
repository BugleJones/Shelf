"use strict";

const express = require("express");
const router = express.Router();
const cookieSession = require('cookie-session');
const dataMoversFunction = require("../lib/data-movers");

module.exports = knex => {
  const dataMovers = dataMoversFunction(knex);

  router.get("/", (request, response) => {
    // console.log(request.params.id);
    dataMovers.sumLikes(request.params.id).then(result => {
      response.send(result);
    });
  });

  router.post("/", (request, response) => {
    let user_id = request.session.user.id;
    // console.log(request.params.resourceID);
    dataMovers.likeHandler(request.params.resourceID, user_id).then(result => {
      response.send(result);
    });
  });


  return router;
};
