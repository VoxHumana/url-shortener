const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const index = require('./routes/index');
const shorten = require('./routes/shorten');
const redirect = require('./routes/redirect');

const app = express();

mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', index);
app.get('/:short_id', redirect);
app.post('/api/shorten', shorten);

module.exports = app;
