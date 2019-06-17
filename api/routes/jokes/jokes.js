const express = require('express')
const router = express.Router()
const db = require('../../services/db.service.js');

router.get('/', function (req, res) {
    let response;
    let jokes = db.get('jokes').value();

    if (req.query.filter) {
        jokes = jokes.filter(joke => joke.type === req.query.filter);
    }

    if (req.query.random) {
        let i = Math.floor((Math.random() * jokes.length));
        response = jokes[i];
        res.status(200).json(response);
        return;
    }

    response = jokes;
    res.status(200).json(response);
});

router.post('/', function (req, res) {
    let jokes = db.get('jokes');
    if (jokes.findIndex({ joke: req.body.joke }).value() > 0) {
        res.status(409).json({ error: 'This joke already exists in database' });
        return;
    }
    let response = jokes.insert({ joke: req.body.joke, type: req.body.type })
        .write();
    res.status(201).json(response);
});

router.put('/', function (req, res) {
    let jokes = db.get('jokes');
    let response = jokes.find({ id: req.body.id }).assign(req.body)
        .write();
    res.status(200).json(response);
});

router.delete('/', function (req, res) {
    let jokes = db.get('jokes');
    let response = jokes.remove({ id: req.query.id })
        .write();
    res.status(200).json(response);
});

module.exports = router;