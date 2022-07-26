var express = require('express');
const mongoose = require("mongoose");
const Recipe = require("../models/Recipe");
var router = express.Router();

/* GET recipe json. */
router.get('/:food', function(req, res, next) {
    const food = req.params.food;
  res.json({
    name: food,
    instructions: ["Prep ingredients", "Mix ingredients", "???", "Profit"],
    ingredients: ["Water", "Salt", "Flour"]
  });
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
