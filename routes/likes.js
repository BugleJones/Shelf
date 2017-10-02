"use strict";

const express = require('express');
const router  = express.Router();
const dataMoversFunction = require("../lib/data-movers");

module.exports = (knex) => {

  const dataMovers = dataMoversFunction(knex);
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

 router.get("/", (request, response) => {
   // console.log(request.params.id);
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
}
