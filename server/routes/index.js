const jokeRoutes = require('./jokeRouts.js');

module.exports = function(app, db){
  jokeRoutes(app, db);
};
