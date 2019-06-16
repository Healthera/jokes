const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const routes = require('./routes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.use('/jokes', routes.jokes)

app.listen(3050, function () {
  console.log('Example app listening on port 3050.');
});