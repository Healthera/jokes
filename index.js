'use strict';

const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

const models = require('./models');
const jokesRoutes = require('./routes/jokes');
const JokesController = require('./controllers/JokesController');

const app = express();

dotenv.load();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', jokesRoutes(new JokesController(models.joke, models.sequelize)));

app.listen(Number(process.env.PORT), process.env.URI, function () {
  console.log(`Example app listening on http://${process.env.URI}:${process.env.PORT}.`);
});
