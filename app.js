const express = require('express');
const path = require('path');
const mongoose = require("mongoose")
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const recipeRouter = require('./routes/recipe');
const imageRouter = require('./routes/images');
const categoryRouter = require('./routes/category');

const app = express();

const mongoDB = process.env.MONGO_URL || "mongodb://localhost:27017/testdb";
mongoose.connect(mongoDB);
mongoose.Promise = Promise;
const db = mongoose.connection;

/*
const Category = require("./models/Category");
new Category({name: "Gluten-free"}).save();
new Category({name: "vegan"}).save();
new Category({name: "Ovo"}).save();
*/

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/recipe', recipeRouter);
app.use('/images', imageRouter);
app.use('/category', categoryRouter);

module.exports = app;
