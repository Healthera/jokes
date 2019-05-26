const users = require('./users');
const jokes = require('./jokes');

const routes = {
    users,
    jokes,
};

module.exports = app => Object.keys(routes).forEach(route => {
    app.use(`/api/${route}`, routes[route]);
});