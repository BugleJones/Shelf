"use strict";

const express = require('express');
const router  = express.Router();
const cookieSession = require('cookie-session');
const dataMoversFunction = require("../lib/resource-movers");

module.exports = (knex) => {
  const resourceMovers = dataMoversFunction(knex);
 //
 // router.post("/comments", (request, response) => {
 //   knex('comments')
 //   .insert({
 //     user_id: request.session.user_id,
 //     resource_id: request.body.resourceID,
 //     content: request.body.content
 //   }).then((result) => {
 //     response.json(result);
 //   })
 // })

 // router.post("/update", (request, response) => {
 //   let content = request.body.content;
 //   let resource_id = request.body.resource_id
 //   let user_id = request.session.user_id;
 //
 //   resourceMovers.createComment(content, user_id, resource_id).then((result) => {
 //     let commentId = result;
 //     response.redirect("/");
 //   })
 //   .catch((error) => console.log(error));
 //   })


 return router;
}
