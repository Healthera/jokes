const mongoose = require('mongoose');

const jokeSchema = mongoose.Schema({
  joke: {
    type: String,
    required: true,
  },
});

const Joke = module.exports = mongoose.model('jokes', jokeSchema);

module.exports.get = (callback, limit) => {
  Joke.find(callback).limit(limit);
};
