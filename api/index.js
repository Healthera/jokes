const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const http = require('http');
const controllers = require('./controllers');

// Create the express application and set middleware
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Set endpoints
controllers.set(app);

// Start listening for incoming connections
const server = http.createServer(app);
server.listen(3000, () => {
  console.log('app listening on port 3000!');
});
