"use strict";

const express = require('express');
const router  = express.Router();
const dataMoversFunction = require("../lib/data-movers");

module.exports = (knex) => {

 const dataMovers = dataMoversFunction(knex);

 router.get("/", (request, response) => {
   dataMovers.sumLikes(request.params.id).then(result => {
     response.send(result);
   });
 });

 router.post("/", (request, response) => {
   let user_id = request.session.user.id;
   let resource_id = request.body.resource_id;
   dataMovers.likeHandler(resource_id, user_id).then(result => {
     response.redirect("/");
   });
 });
  return router;
 }
