const Candidate = require('../models/candidate');

module.exports = {
  async fetch(req, res) {
    const candidates = await Candidate.find({}, {
      _id: 0,
      __v: 0,
      vision: 0,
    });
    res.render('admin/dashboard', {
      page: 'dashboard',
      candidates: JSON.stringify(candidates),
      candidatesCount: candidates.length,
    });
  },
};
