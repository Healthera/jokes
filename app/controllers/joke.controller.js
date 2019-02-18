Joke = require('../models/joke.model');

exports.index = (req, res) => {
  Joke.get((err, jokes) => {
    if (err) {
      res.json({
        status: 'error',
        message: err,
      });
    }
    res.json({
      status: 'success',
      message: 'Jokes retrieved successfully',
      data: jokes,
    });
  });
};

exports.new = (req, res) => {
  const joke = new Joke();
  // save the joke and check for errors
  joke.save((err) => {
    if (err) {
      res.json(err);
    }
    res.json({
      message: 'New joke created!',
      data: joke,
    });
  });
};
