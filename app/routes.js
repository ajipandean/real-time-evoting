module.exports = function(app, passport) {
  // Client routes
  app.get('/', function(req, res) {
    res.redirect('/admin/auth/login');
  });

  // Admin routes
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
};
