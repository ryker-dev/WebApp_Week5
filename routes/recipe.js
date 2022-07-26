var express = require('express');
const mongoose = require("mongoose");
const Recipe = require("../models/Recipe");
var router = express.Router();

/* GET recipe json. */
router.get('/:food', function(req, res, next) {
    const food = req.params.food;
    Recipe.findOne( {name: new RegExp(food, "i")}, (err, recipe) => {
      if(err) {
          if (err.name === "CastError") {
              return res.status(404).send(`Recipe with name '${food}' not found`);
          }
          return next(err);
      }
      if(recipe) {
          return res.send(recipe);
      }
      else {
          return res.status(404).send(`Recipe with name '${food}' not found`);
      }
  })

});

router.post('/', function(req, res, next) {
  console.log(req.body);

  Recipe.findOne({name: req.body.name}, (err, recipe) => {
    if (err) return next(err);
    if(!recipe) {
      new Recipe({
        name: req.body.name,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions
      }).save((err) => {
        if(err) return next(err);
        return res.send(req.body);
      });
    } else {
      return res.status(403).send("Recipe already exists!");
    }
  })
});

module.exports = router;
