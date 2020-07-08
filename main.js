// Package invocation
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const path = require('path');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');

// Env variable configuration
require('dotenv').config()

const app = express();

// Setup connection for mongoose
require('./app/config/database')(mongoose);

// Setup passport configuration
require('./app/config/passport')(passport);

// Setup template engine
app.set('views', path.join(__dirname, 'app', 'views'));
app.set('view engine', 'pug');

// Middlewares registration
if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined'));
} else {
  app.use(morgan('dev'));
}
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/assets', express.static(path.join(__dirname, 'app', 'assets')));

// Passport requirements
app.use(session({ secret: process.env.APP_SECRET }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Route registration
require('./app/routes')(app, passport);

// Serve app
const PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
  console.log(`Server running on port ${PORT}`);
});
