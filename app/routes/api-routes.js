const router = require('express').Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API works!',
  });
});

const jokeController = require('../controllers/joke.controller');

router.route('/jokes')
  .get(jokeController.index)
  .post(jokeController.new);
router.route('/jokes/:joke_id')
  .get(jokeController.view)
  .patch(jokeController.update)
  .put(jokeController.update)
  .delete(jokeController.delete);

module.exports = router;
