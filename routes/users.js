"use strict";

const express = require("express");
const router = express.Router();
const datamovers_function = require('../lib/data-movers');

module.exports = (knex) => {
  const datamovers = datamovers_function(knex);

  router.get("/", (request, response) => {
    datamovers.getAllUserData()
      .then(results => {
        response.json(results);
      });
  });

  return router;
};
