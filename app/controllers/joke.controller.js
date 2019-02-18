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

exports.view = (req, res) => {
  Joke.findById(req.params.joke_id, (err, joke) => {
    if (err) res.send(err);
    res.json({
      message: 'Joke details loading...',
      data: joke,
    });
  });
};

exports.update = (req, res) => {
  Joke.findById(req.params.joke_id, (err, joke) => {
    if (err) res.send(err);
    joke.save((err) => {
      if (err) res.json(err);
      res.json({
        message: 'Joke Info updated',
        data: joke,
      });
    });
  });
};

exports.delete = (req, res) => {
  Joke.remove({ _id: req.params.joke_id, }, (err, joke) => {
    if (err) res.send(err);
    res.json({
      status: 'success',
      message: 'Joke deleted',
    });
  });
};
