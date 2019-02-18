const express = require('express');
const fs = require('fs');

const app = express();
const parse = require('csv-parse');

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

app.listen(3050, () => {
  console.log('Example app listening on port 3050.');
});
