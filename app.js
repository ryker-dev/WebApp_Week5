const express = require('express');
const path = require('path');
const mongoose = require("mongoose")
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const recipeRouter = require('./routes/recipe');
const imageRouter = require('./routes/images');

const app = express();

const mongoDB = "mongodb://localhost:27017/testdb";
mongoose.connect(mongoDB);
mongoose.Promise = Promise;
const db = mongoose.connection;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/recipe', recipeRouter);
app.use('/images', imageRouter);

module.exports = app;
