const mongoose = require('mongoose');

mongoose.connect('mongodb://db:27017/jokesDb', { useNewUrlParser: true });

const jokeSchema = new mongoose.Schema({ text: String });
module.exports.Joke = mongoose.model('Joke', jokeSchema);
