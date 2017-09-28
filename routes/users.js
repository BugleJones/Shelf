"use strict";

const express = require("express");
const router = express.Router();
const dm_fn = require('../lib/data-movers');

module.exports = (knex) => {
  const dm = dm_fn(knex);


  router.get("/", (request, response) => {
    dm.getAllUserFirstNames()
      .then(results => {
        response.json(results);
      });
  });

  return router;
};
