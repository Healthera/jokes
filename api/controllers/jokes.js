const { Joke } = require('../config/database');

module.exports.set = async app => {
  app.get('/jokes', async (req, res) => {
    let jokes;
    try {
      jokes = await Joke.find({});
    } catch (err) {
      // TODO logger
      console.log(err);
      res.status(500).send();
    }
    res.send(jokes);
  });
};
