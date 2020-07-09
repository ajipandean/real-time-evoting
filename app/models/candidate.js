const mongoose = require('mongoose');

const candidateSchema = mongoose.Schema({
  president: String,
  vicePresident: String,
  vision: String,
  vote: {
    type: Number,
    default: 0,
    min: 0,
  },
});

module.exports = mongoose.model('Candidate', candidateSchema);
