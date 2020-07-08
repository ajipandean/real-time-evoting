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
    function(req, username, password, done) {
      User.findOne({ 'username': username }, function(err, user) {
        if (err) return done(err);
        if (!user) return done(null, false, req.flash('message', 'No user found.'));
        if (!user.validPassword(password)) return done(null, false, req.flash('message', 'Invalid password.'));
        return done(null, user);
      });
    },
  ));

  passport.use('local-register', new LocalStrategy(
    { passReqToCallback: true },
    function(req, username, password, done) {
      process.nextTick(function() {
        User.findOne({ 'username': username }, function(err, user) {
          if (err) return done(err);
          if (user) return done(null, false, req.flash('message', 'This email or username has already taken.'));

          const newUser = new User();
          newUser.username = username;
          newUser.password = newUser.generateHash(password);
          newUser.save(function(err) {
            if (err) throw err;
            return done(null, newUser);
          });
        });
      });
    },
  ));
};
