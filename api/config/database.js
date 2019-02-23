const mongoose = require('mongoose');

mongoose.connect('mongodb://db:27017/jokesDb');
module.exports.Joke = mongoose.model('Joke', { text: String });
