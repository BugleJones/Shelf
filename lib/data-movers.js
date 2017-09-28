"use strict";

//Creating helper functions to bridge data to the website
module.exports = function makeDataMovers(db) {
  return {
    getAllUserFirstNames: () => {
      return db
        .select()
        .from("users");
    },
    getResource: (id) => {},
  }
}
