"use strict";

//Creating helper functions to bridge data to the website
module.exports = function makeDataMovers(db) {
  return {
    getAllUserData: () => {
      return db
        .select()
        .from('users')
        .join('resources', 'resources.user_id', 'users.id');
    },
  }
}
