"use strict";

const bcrypt = require("bcrypt");

//Creating helper functions to bridge data to the website
module.exports = function makeDataMovers(knex) {
  return {
    getAllUserData: () => {
      return knex("users").join("resources", "resources.user_id", "users.id");
    }
  };
};
