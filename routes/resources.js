"use strict";

const userHelper = require("../lib/data-movers")
const express  = require('express');
const resourcesRoutes  = express.Router();

module.exports = function(dataMovers) {

  resourcesRoutes.get("/", function(req, res) {
    dataMovers.getResources((err, resources) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(resources);
      }
    });
  });

// knex.select('title', 'author', 'year').from('books')
