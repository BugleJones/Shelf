"use strict";

const express = require('express');
const router  = express.Router();
const cookieSession = require('cookie-session');
const dataMoversFunction = require("../lib/resource-movers");

module.exports = (knex) => {
  const dataMovers = dataMoversFunction(knex);
 //
 // router.post("/comments", (request, response) => {
 //   knex('comments')
 //   .insert({
 //     user_id: request.body.userID,
 //     resource_id: request.body.resourceID,
 //     comment: request.body.content
 //   }).then((comment) => {
 //     response.json(comment);
 //   })
 // })

 router.post("/comments", (request, response) => {
   let content = request.body.content;
   let resource_id = request.body.resource_id;
   let user_id = request.session.user_id;

   dataMovers.createComment(content, resource_id, user_id).then((result) => {
     let commentId = result;
     let userComment = result.user_id;
     let commentContent = result.content;
   })

   response.redirect("/")
   .catch((error) => console.log(error));
 });

 return router;
}
