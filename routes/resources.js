"use strict";

const userHelper = require("../lib/data-movers");
const express = require("express");
const router = express.Router();

module.exports = function(dataMovers) {
  router.get("/", function(req, res) {
    dataMovers.getResources((err, resources) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(resources);
      }
    });
  });
};
// knex.select('title', 'author', 'year').from('books')
