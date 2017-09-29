"use strict";

//Creating helper functions to bridge data to the website
module.exports = function makeDataMovers(knex) {
  return {
    getAllUserData: () => {
      return knex
        .select()
        .from('users')
        .join('resources', 'resources.user_id', 'users.id');
    },
  }
}
