const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

const port = process.env.PORT || '3000';

/* GET home page. */
/* 
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
}); */

/* GET recipe */
router.get('/', function(req, res, next) {
  /*const recipename = "pizza";
  fetch(`http://localhost:${port}/recipe/${recipename}`)
  .then((response) => response.json())
  .then((data) => {
    res.render('index', { title: recipename, name: recipename, ingredients: data.ingredients, instructions: data.instructions});
    res.send.json()
  });*/
});

module.exports = router;
