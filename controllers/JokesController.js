'use strict';

module.exports = class JokesController {
  constructor(jokeModel, sequelize) {
    this.jokeModel = jokeModel;
    this.sequelize = sequelize;

    this.addJoke = this.addJoke.bind(this);
    this.deleteJoke = this.deleteJoke.bind(this);
    this.getRandomJoke = this.getRandomJoke.bind(this);
    this.getJokes = this.getJokes.bind(this);
  }

  async addJoke(req, res) {
    const { jokeText } = req.body;

    try {
      const newJoke = await this.jokeModel.create({ joke: jokeText });

      res.json({ id: newJoke.id });
    } catch (error) {
      console.error('add joke', { error: error.message, jokeText });
      res.status(500).send(error.message);
    }
  }

  async deleteJoke(req, res) {
    const { id } = req.params;

    try {
      const joke = await this.jokeModel.findById(id);

      if (!joke) res.status(500).send(`There is no joke with id: ${id}`);

      await joke.destroy();

      res.send();
    } catch (error) {
      console.error('remove joke', { error: error.message, id });
      res.status(500).send(error.message);
    }
  }

  async getRandomJoke(req, res) {
    try {
      const joke = await this.sequelize
        .query(
          'SELECT joke FROM public.jokes OFFSET FLOOR(random() * (SELECT count(*) FROM public.jokes)) LIMIT 1;',
          { type: this.sequelize.QueryTypes.SELECT }
        );

      res.json(joke[0]);
    } catch (error) {
      console.error('get random joke', { error: error.message });
      res.status(500).send(error.message);
    }
  }

  async getJokes(req, res) {
    const { offset, limit } = req.query;

    try {
      const jokes = await this.jokeModel.findAndCountAll({
        offset,
        limit,
        order: [['id']]
      });

      res.send(jokes);
    } catch (error) {
      console.error('get jokes', { error: error.message });
      res.status(500).send(error.message);
    }
  }
};
