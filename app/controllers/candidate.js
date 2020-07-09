const Candidate = require('../models/candidate');

module.exports = {
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
      } else {
        req.flash('message', {
          type: 'success',
          text: 'Candidate has been successfully added.',
        });
        res.redirect('/admin/candidates');
      }
    });
  },
};
