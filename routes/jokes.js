'use strict';

const { Router } = require('express');
const { query, body } = require('express-validator/check');

const chekValidation = require('../utils/chekValidation');

module.exports = (controller) => {
  const router = Router();

  router.post('/',
    [
      body('jokeText')
        .trim()
        .escape()
        .not()
        .isEmpty()
    ],
    chekValidation,
    controller.addJoke
  );

  router.get('/', controller.getRandomJoke);

  router.get('/list',
    [
      query('limit').isInt({ min: 1, max: 1000 })
    ],
    chekValidation,
    controller.getJokes
  );

  router.delete('/:id', controller.deleteJoke);

  return router;
};
