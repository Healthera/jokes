const express = require('express');
const fs = require('fs');

const app = express();
const parse = require('csv-parse');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const apiRoutes = require('./app/routes/api-routes');

mongoose.connect('mongodb://localhost/jokesapi', { useNewUrlParser: true });
const db = mongoose.connection;

app.use(bodyParser.urlencoded({
  extended: true,
}));

app.use(bodyParser.json());

app.use('/api', apiRoutes);

fs.readFile('jokes.csv', (err, data) => {
  parse(data, {}, (err, jokes) => {
    app.get('/', (req, res) => {
      const i = Math.floor((Math.random() * jokes.length));
      const response = {
        joke: jokes[i][0],
      };
      res.json(response);
    });
  });
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000.');
});
