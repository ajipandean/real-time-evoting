// Controllers invocation
const DashboardController = require('./controllers/dashboard');
const CandidateController = require('./controllers/candidate');

// Helpers invocation
const isLoggedin = require('./helpers/is-loggedin');

module.exports = function(app, passport) {
  // Client routes
  app.get('/', CandidateController.home);
  app.post('/candidates/:id/vote', CandidateController.vote);

  // Admin routes
  app.get('/admin/dashboard', isLoggedin, DashboardController.fetch);
  app.get('/admin/candidates', isLoggedin, CandidateController.fetch);
  app.post('/admin/candidates', isLoggedin, CandidateController.create);
  app.post('/admin/candidates/:id', isLoggedin, CandidateController.destroy);

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

  app.get('/admin/auth/logout', function(req, res) {
    req.logout();
    res.redirect('/admin/auth/login');
  });
};
