"use strict";

const bcrypt = require('bcrypt');

//Creating helper functions to bridge data to the website
module.exports = function makeResourceMovers(knex) {

  //Find ID of resource on login
  function findResourceId(id) {
    return knex('resource')
      .select('*')
      .where({id})
      .limit(1)
      .then(([resource]) => resource);
  }

  function createResource(title, url, description) {
    return knex('users').insert({
      title: title,
      url: url,
      description: description,
    }).returning('id');
  .catch((error) => console.log("Invalid register", error))
  }

  return {
    findResourceId,
    createResource,
  };
}
