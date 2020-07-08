// Helpers invocation
const isLoggedin = require('./helpers/is-loggedin');

module.exports = function(app, passport) {
  // Client routes
  app.get('/', function(req, res) {
    res.redirect('/admin/auth/login');
  });

  // Admin routes
  app.get('/admin/dashboard', isLoggedin, function(req, res) {
    res.render('admin/dashboard', {
      page: 'dashboard',
    });
  });

  app.get('/admin/auth/login', function(req, res) {
    res.render('admin/login', {
      page: 'login',
      message: req.flash('message'),
    });
  });
  app.post('/admin/auth/login', passport.authenticate('local-login', {
    successRedirect: '/admin/dashboard',
    failureRedirect: '/admin/auth/login',
    failureFlash: true,
  }))

  app.get('/admin/auth/register', function(req, res) {
    res.render('admin/register', {
      page: 'register',
      message: req.flash('message'),
    });
  });
  app.post('/admin/auth/register', passport.authenticate('local-register', {
    successRedirect: '/admin/auth/login',
    failureRedirect: '/admin/auth/register',
    failureFlash: true,
  }));
};
