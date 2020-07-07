module.exports = function(app) {
  // Client routes
  app.get('/', function(req, res) {
    res.render('index');
  });

  // Admin routes
  app.get('/admin/login', function(req, res) {
    res.render('admin/login', {
      page: 'login',
    });
  });
  app.get('/admin/dashboard', function(req, res) {
    res.render('admin/dashboard', {
      page: 'dashboard',
    });
  });
  app.get('/admin/candidates', function(req, res) {
    res.render('admin/candidates', {
      page: 'candidates',
    });
  });
};
