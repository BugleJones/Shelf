"use strict";

//Creating helper functions to bridge data to the website
module.exports = function makeDataMovers(knex) {


   function getResources() {
    return knex('resources')
      .join('users', 'resources.user_id', 'users.id');
    }
}
