module.exports = function(app) {
  // Client routes
  app.get('/', function(req, res) {
    res.redirect('/admin/auth/login');
  });

  // Admin routes
  app.get('/admin/auth/login', function(req, res) {
    res.render('admin/login', {
      page: 'login',
    });
  });
};
