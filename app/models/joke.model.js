const mongoose = require('mongoose');

const jokeSchema = mongoose.Schema({
  joke: {
    type: String,
    required: true,
  },
});

const Joke = module.exports = mongoose.model('contact', jokeSchema);

module.exports.get = function (callback, limit) {
  Joke.find(callback).limit(limit);
};
