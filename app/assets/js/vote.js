const socket = io();

function emitVote(id) {
  socket.emit('vote', id);
}
