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
    const candidate = await Candidate.findByIdAndDelete(req.params.id, function(err) {
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
};
