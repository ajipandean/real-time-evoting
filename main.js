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
const socketio = require('socket.io');

// Models
const Candidate = require('./app/models/candidate');

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

// Socket middleware
app.use(function(req, res, next) {
  req.io = io;
  next();
});

// Static assets registration
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
const server = app.listen(PORT, function() {
  console.log(`Server running on port ${PORT}`);
});

// Socket requirements
const io = socketio(server);

io.on('connection', function(socket) {
  console.log('Socket connected...');
  socket.on('vote', function(id) {
    Candidate.findById(id, function(err, candidate) {
      if (err) {
        console.log(err);
      } else {
        candidate.vote = candidate.vote + 1;
        candidate.save(async function() {
          console.log('Candidate voted.');
          const candidates = await Candidate.find({}, {
            _id: 0,
            __v: 0,
            vision: 0,
          });
          io.emit('vote', candidates);
        });
      }
    });
  });
  socket.on('disconnect', function() {
    console.log('Socket disconnected...');
  });
});
