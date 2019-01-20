'use strict';

const { validationResult } = require('express-validator/check');

module.exports = function chekValidation(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.error('validation error', { errors: errors.array() });

    return res.status(422).json({ errors: errors.array() });
  }
  next();
};
