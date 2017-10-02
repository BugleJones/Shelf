"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  // router.post("/", (req, res) => {
  //   knex('likes')
  //   .returning('*')
  //   .insert({
  //     user_id: req.body.userID,
  //     resource_id: req.body.resourceID
  //   })
  //   .then( (result) => {
  //     res.json(result);
  //   })
  // })
  // return router;
 //
 //  router.post("/new", (request, response) => {
 //    let content = request.body.content;
 //    let user_id = request.session.user_id;
 //
 //    resourceMovers.createComment(content, user_id).then((result) => {
 //      let commentId = result;
 //      response.redirect("/")
 //    })
 //     .catch((error) => console.log(error));
 //    })
 //
  return router;
 }
