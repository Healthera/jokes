const express = require('express');
const fs = require('fs');
const app = express();
const parse = require('csv-parse');
const mongodb = require('./mongodb.js');
const bodyParser= require('body-parser')
var path = require('path');
var jokesRouter = require('./routes/jokes');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/jokes', jokesRouter);

mongodb.connectToServer( function( err ) {
  app.listen(3050, function() {
     console.log('Example app listening on port 3050.');
     db = mongodb.getDb();
  })
});
