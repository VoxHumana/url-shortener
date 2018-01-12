const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const index = require('./routes/index');
const shorten = require('./routes/shorten');
const redirect = require('./routes/redirect');

const app = express();

mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;
const db = mongoose.connection;

db.on('connected', () => {
  console.log(`Mongoose connection success - ${process.env.MONGODB_URI}`);
});
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
app.set('views', './views');
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', index);
app.get('/s/:suffix', redirect);
app.post('/api/shorten', shorten);

module.exports = app;
