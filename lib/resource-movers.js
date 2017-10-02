"use strict";

const bcrypt = require('bcrypt');

//Creating helper functions to bridge data to the website
module.exports = function makeResourceMovers(knex) {

  //Find ID of resource on login
  function findResourceId(id) {
    return knex('resources')
      .select('*')
      .where({id})
      .limit(1)
      .then(([resource]) => resource);
  }

  function createResource(title, url, description, user_id) {
    console.log('Create Resource', title, url, description, user_id);
    return knex('resources').insert({
      title: title,
      url: url,
      description: description,
      user_id: user_id,
    }).returning('id')
    .catch((error) => console.log("Invalid resource creation", error))
  }

  function createComment(content, user_id, resource_id) {
    return knex('comments').insert({
      content: content,
      user_id: user_id,
      resource_id: resource_id,
    }).returning('id')
    .then((id)=> {
      return id;
    })
  .catch((error) => console.log("Invalid comment creation", error))
  }

  function createTag(name, resource_id) {
    return knex('tags').insert({
      name: name,
    }).returning('id')
    .then((id)=> {
      return knex('resource_tags').insert({
        resource_id: resource_id,
        tag_id: id[0],
      }).returning("id")
    })
    .catch((error) => console.log("Invalid tag creation", error))
  }

  return {
    findResourceId,
    createResource,
    createComment,
    createTag,
  };
}
