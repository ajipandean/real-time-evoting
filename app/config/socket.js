const socketIo = require('socket.io');
const Candidate = require('../models/candidate');

module.exports = function(server) {
  const io = socketIo(server);

  io.on('connection', function(socket) {
    socket.on('vote', async function(id) {
      await Candidate.findById(id, function(err, candidate) {
        if (err) {
          console.log(err);
        } else {
          candidate.vote = candidate.vote + 1;
          candidate.save(async function() {
            const candidates = await Candidate.find({}, {
              _id: 0,
              __v: 0,
              vision: 0,
              president: 0,
              vicePresident: 0,
            });
            io.emit('vote', candidates);
          });
        }
      });
    });
    socket.on('disconnect', function() {
      console.log('Socket disconnected...');
    });
  });
};
