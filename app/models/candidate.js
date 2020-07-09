const mongoose = require('mongoose');

const candidateSchema = mongoose.Schema({
  president: String,
  vicePresident: String,
  vision: String,
});

module.exports = mongoose.model('Candidate', candidateSchema);
