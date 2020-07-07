// Package invocation
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const path = require('path');

// Env variable configuration
require('dotenv').config()

const app = express();

// Setup connection for mongoose
require('./app/config/database')(mongoose);

// Setup template engine
app.set('views', path.join(__dirname, 'app', 'views'));
app.set('view engine', 'pug');

// Middlewares registration
if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined'));
} else {
  app.use(morgan('dev'));
}
app.use('/assets', express.static(path.join(__dirname, 'app', 'assets')));

// Route registration
require('./app/routes')(app);

// Serve app
const PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
  console.log(`Server running on port ${PORT}`);
});
