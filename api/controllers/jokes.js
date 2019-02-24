const {Joke} = require('../config/database');

module.exports.set = async app => {
  app.get('/jokes', async (req, res) => {
    let jokes;
    try {
      jokes = await Joke.find({}).sort({_id: -1});
    } catch (err) {
      // TODO logger
      console.log(err);
      res.status(500).send();
    }
    res.send(jokes);
  });

  app.post('/jokes', async (req, res) => {
    try {
      await Joke.create({text: req.body.joke});
    } catch (err) {
      // TODO logger
      console.log(err);
      res.status(500).send();
    }
    res.status(200).send();
  });

  app.post('/jokes/:jokeId', async (req, res) => {
    try {
      await Joke.update({_id: req.params.jokeId}, {text: req.body.text});
    } catch (err) {
      // TODO logger
      console.log(err);
      res.status(500).send();
    }
    res.status(200).send();
  });

  app.delete('/jokes/:jokeId', async (req, res) => {
    try {
      await Joke.deleteOne({_id: req.params.jokeId});
    } catch (err) {
      // TODO logger
      console.log(err);
      res.status(500).send();
    }
    res.status(200).send();
  });
};
