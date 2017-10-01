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
    return knex('resources').insert({
      title: title,
      url: url,
      description: description,
      user_id: user_id,
    }).returning('id')
    .then((id)=> {
      return id;
    })
  .catch((error) => console.log("Invalid resource creation", error))
  }

  function createTag(name) {
    return knex('tags').notNullable('name').insert({
      name: name,
    }).returning('id')
    .then((id)=> {
      return id;
    })
  .catch((error) => console.log("Invalid resource creation", error))
  }

  return {
    findResourceId,
    createResource,
    createTag,
  };
}
