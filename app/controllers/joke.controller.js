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
