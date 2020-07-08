const User = require('../models/user');
const LocalStrategy = require('passport-local').Strategy;

module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use('local-login', new LocalStrategy(
    { passReqToCallback: true },
    function(req, username, passport, done) {
      User.findOne({ 'username': username }, function(err, user) {
        if (err) return done(err);
        if (!user) return done(null, false, req.flash('message', 'No user found.'));
        if (!user.validPassword(password)) return done(null, false, req.flash('message', 'Invalid password.'));
        return done(null, user);
      });
    },
  ));
};
