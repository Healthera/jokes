const jokes = require('./jokes');

/**
 * Set routes for all controllers.
 *
 * Note: this is just to show how it should be done for a bigger system,
 * it is clear that it may be too much for this small example with just
 * one controller.
 *
 */
module.exports.set = (app) => {
  jokes.set(app);
};
