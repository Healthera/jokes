const express = require('express');
const fs = require('fs');
const parse = require('csv-parse');

const app = express();

fs.readFile('jokes.csv', (err, data) => {
  parse(data, {}, (err, jokes) => {
    app.get('/', function (req, res) {
      let i = Math.floor((Math.random() * jokes.length));
      let response = {
        joke: jokes[i][0]
      }
      res.json(response);
    });
  });
});

app.listen(3050, function () {
  console.log('Example app listening on port 3050.');
});
