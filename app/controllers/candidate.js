const Candidate = require('../models/candidate');

module.exports = {
  async fetch(req, res) {
    const candidates = await Candidate.find();
    res.render('admin/candidates', {
      candidates,
      page: 'candidates',
      message: req.flash('message'),
    });
  },
  async create(req, res) {
    const { president, vicePresident, vision } = req.body;
    const candidate = new Candidate({
      president,
      vicePresident,
      vision,
    });
    await candidate.save(function(err) {
      if (err) {
        console.log(err);
        req.flash('message', {
          type: 'failure',
          text: 'Failed to add new candidate.',
        });
        res.redirect('/admin/candidates');
      } else {
        req.flash('message', {
          type: 'success',
          text: 'Candidate has been successfully added.',
        });
        res.redirect('/admin/candidates');
      }
    });
  }, 
  async destroy(req, res) {
    await Candidate.findByIdAndDelete(req.params.id, function(err) {
      if (err) {
        console.log(err);
        req.flash('message', {
          type: 'failure',
          text: 'Failed to delete candidate.',
        });
        res.redirect('/admin/candidates');
      } else {
        req.flash('message', {
          type: 'success',
          text: 'Candidate has been succcessfully deleted.',
        });
        res.redirect('/admin/candidates');
      }
    });
  },

  // Client
  async home(req, res) {
    const candidates = await Candidate.find();
    res.render('client/index', {
      candidates,
      page: 'index',
      message: req.flash('message'),
    });
  },
  async vote(req, res) {
    await Candidate.findById(req.params.id, function(err, candidate) {
      if (err) {
        req.flash('message', {
          type: 'failure',
          text: 'Failed to vote candidate.',
        });
      } else {
        candidate.vote = candidate.vote + 1;
        candidate.save(function() {
          req.flash('message', {
            type: 'success',
            text: 'Candidate has been successfully voted.',
          });
          res.redirect('/');
        });
      }
    });
  },
};
