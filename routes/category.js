var express = require('express');
const mongoose = require("mongoose");
const Category = require("../models/Category");
var router = express.Router();

/* GET recipe json. */
router.get('/', function(req, res, next) {
    //const food = req.params.food;
    Category.find( {}, (err, categories) => {
      if(err) {
        /*
          if (err.name === "CastError") {
              return res.status(404).send(`Could not fetch categories`);
          }*/
          return next(err);
      }
      if(categories) {
          return res.send(categories);
      }
      else {
          return res.status(404).send(`Could not fetch categories`);
      }
  })

});

module.exports = router;