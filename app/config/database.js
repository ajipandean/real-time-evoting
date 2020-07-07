module.exports = function(mongoose) {
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(function() {
      console.log('Connected to MongoDB...');
    });
};
