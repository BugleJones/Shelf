"use strict";

const express = require('express');
const router  = express.Router();
const dataMoversFunction = require("../lib/resource-movers");

module.exports = (knex) => {
  const dataMovers = dataMoversFunction(knex);

 router.post("/comments", (request, response) => {
   knex('comments')
   .insert({
     user_id: request.body.userID,
     resource_id: request.body.resourceID,
     comment: request.body.content
   }).then((comment) => {
     response.json(comment);
   })
 })

 //   knex('comments')
 //   .insert({
 //     user_id: req.session.user_id,
 //     resource_id: req.body.resource_id,
 //     content: req.body.content
 //   })
 //   .then( (result) => {
 //     res.json(result);
 //   })
 // })
 return router;
}
