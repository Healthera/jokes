const express = require("express");
const fs = require("fs");
const parse = require("csv-parse");
const path = require("path");

import Joke from "./database/Joke";
import JokesMssql from "./database/JokesMssql";
import JokeUpdate from "./database/JokeUpdate";

// It would have been beeter to create a service object to wrap app and the
// HTTP methods
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
    res.status(500).send("Error: " + err +
        "; in: " + (req && req.baseurl) || "N/A");
});

fs.readFile("jokes.csv", (err, data) => {
    parse(data, {}, (err, jokes: string[]) => {

        let jokesMssql = new JokesMssql(); // The handles all database CRUD

        // Change these to the SQL server database of choice.
        // user needs create table privilege
        let pHostname: string = "localhost";
        let pDatabase: string = "sahsuland";
        let pUser: string = "peter";
        let pPassword: string = "retep";

        jokesMssql.dbSetup(jokes, // Connect and create/populate table if required
            pHostname, pDatabase, pUser, pPassword).then(
            function success() {

                // POST method
                app.post("/:createJoke", function (req, res) {
                    console.log("createJoke: " +
                        (req.query === undefined ? "N/A" : JSON.stringify(req.query)));

                    let joke: Joke = {
                        category: (req.query.category || "Funny"),
                        index: (req.query.index || undefined),
                        joke: (req.query.joke || "")
                    };
                    jokesMssql.createJoke(joke).then(
                        function success() {
                            let response = {
                                joke,
                                status: "OK",
                            };
                            res.json(response);
                        },
                        function fail(err) {
                            res.status(500).send("Error: " + err +
                                "; in: " + (req && req.baseurl) || "N/A");
                        });
                });

                // GET methods
                app.get("/getJoke", function (req, res) {
                    let i = Math.floor((Math.random() * jokes.length));
//                    let response = {
//                        joke: jokes[i][0]
//                    };

                    jokesMssql.getJoke().then(
                        function success(dbJoke: Joke) {
                        console.log("getJoke [" + i + "]: " + JSON.stringify(dbJoke));
                        res.json(dbJoke);
                        },
                        function fail(err) {
                            res.status(500).send("Error: " + err +
                                "; in: " + (req && req.baseurl) || "N/A");
                        });
                });

                app.get("/getJokes", function (req, res) {
                    console.log("getJokes");
//                    res.json(jokes);

                    jokesMssql.getJokes().then(
                        function success(dbJokes: Joke[]) {
                            console.log("getJokes: " + dbJokes.length +
                                "1: " + JSON.stringify(dbJokes[0]));
                            res.json(dbJokes);
                        },
                        function fail(err) {
                            res.status(500).send("Error: " + err +
                                "; in: " + (req && req.baseurl) || "N/A");
                        });
                });

                // PUT method
                app.put("/:updateJoke", function (req, res) {
                    console.log("updateJoke: " +
                        (req.query === undefined ? "N/A" : JSON.stringify(req.query)));

                    let jokeUpdate: JokeUpdate = {
                        column: req.query.column, ,
                        index: req.query.index
                        newValue: req.query.newValue
                    };
                    jokesMssql.updateJoke(jokeUpdate).then(
                        function success() {
                            let response = {
                                jokeUpdate,
                                status: "OK",
                            };
                            res.json(response);
                        },
                        function fail(err) {
                            res.status(500).send("Error: " + err +
                                "; in: " + (req && req.baseurl) || "N/A");
                        });
                });

                // DELETE method
                app.delete("/:deleteJoke", function (req, res) {
                    console.log("deleteJoke: " +
                        (req.query === undefined ? "N/A" : JSON.stringify(req.query)));
                    let joke: Joke = {
                        category: (req.query.category || "Funny"),
                        index: (req.query.index || undefined),
                        joke: (req.query.joke || "")
                    };
                    jokesMssql.deleteJoke(joke).then(
                        function success() {
                            let response = {
                                joke,
                                status: "OK"
                            };
                            res.json(response);
                        },
                        function fail(err) {
                            res.status(500).send("Error: " + err +
                                "; in: " + (req && req.baseurl) || "N/A");
                        });
                    });

                // 404 handler
                app.use(function (req, res, next) {
                    res.status(404).send("Cannot find: " + ((req && req.path) || "N/A"));
                });

                app.listen(3050, function () {
                  console.log("Example app listening on port 3050.");
                });

            });

    });

});
