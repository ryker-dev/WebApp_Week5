const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let recipeSchema = new Schema({
    name: String,
    ingredients: Array,
    instructions: Array
});

module.exports = mongoose.model("Recipe", recipeSchema);