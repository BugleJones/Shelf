"use strict";

const express = require('express');
const router  = express.Router();
const dataMoversFunction = require("../lib/resource-movers");

module.exports = (knex) => {
  const dataMovers = dataMoversFunction(knex);

 router.post("/comments", (request, response) => {
   let content = request.body.title;
   let resource_id = request.body.resourceID;
   let user_id = request.session.user_id;

   dataMovers.createComment(content, resource_id, user_id).then((result) => {
     let commentId = result.id;
     let commentContent = result.content;
     let userComment = result.user_id;
   }).then((comment) => {
     response.json(comment).redirect("/");
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
