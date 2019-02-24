const jokes = require('./jokes');

/**
 * Set routes for all controllers.
 *
 */
module.exports.set = (app) => {
  jokes.set(app);
};
