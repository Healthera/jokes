const express = require("express");
const fs = require("fs");
const parse = require("csv-parse");
const path = require("path");
const app = express();

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect - cross-origin HTTP request (CORS) rules
    res.setHeader("Access-Control-Allow-Origin", "*"); // Allow all access

    // Request methods you wish to allow:  create, read, update, and delete (or CRUD)
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");

    // Request headers you wish to allow
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type");

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader("Access-Control-Allow-Credentials", true);

    // Pass to next layer of middleware
    next();
});

// Serving static files - copy with typescript compilation
app.use("/jokesApp", express.static(path.join(__dirname, "jokesApp")));

// Error handler
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Error: " + err +
    "; in: " + (req && req.baseurl) || "N/A");
});

fs.readFile("jokes.csv", (err, data) => {
  parse(data, {}, (err, jokes) => {
    // POST method
    app.post("/:createJoke", function (req, res) {
      console.log("createJoke: " +
        (req.query == undefined ? "N/A" : JSON.stringify(req.query)));
      let response = {
        joke: (req.query.joke || undefined),
        category: (req.query.category || undefined),
        index: (req.query.index || undefined),
        status: "OK",
      };
      res.json(response);
    });

    // GET methods
    app.get("/getJoke", function (req, res) {
      let i = Math.floor((Math.random() * jokes.length));
      let response = {
        joke: jokes[i][0]
      };
      console.log("getJoke [" + i + "]: " + jokes[i][0]);
      res.json(response);
    });

    app.get("/getJokes", function (req, res) {
      console.log("getJokes");
      res.json(jokes);
    });

    // PUT method
    app.put("/:updateJoke", function (req, res) {
      console.log("updateJoke: " +
        (req.query == undefined ? "N/A" : JSON.stringify(req.query)));
      let response = {
        joke: (req.query.joke || undefined),
        category: (req.query.category || undefined),
        index: (req.query.index || undefined),
        status: "OK",
      };
      res.json(response);
    });

    // DELETE method
    app.delete("/:deleteJoke", function (req, res) {
      console.log("deleteJoke: " +
        (req.query == undefined ? "N/A" : JSON.stringify(req.query)));
      let response = {
        joke: (req.query.joke || undefined),
        category: (req.query.category || undefined),
        index: (req.query.index || undefined),
        status: "OK",
      };
      res.json(response);
    });

    // 404 handler
    app.use(function (req, res, next) {
      res.status(404).send("Cannot find: " + ((req && req.path) || "N/A"));
    });

  });

});

app.listen(3050, function () {
  console.log("Example app listening on port 3050.");
});
