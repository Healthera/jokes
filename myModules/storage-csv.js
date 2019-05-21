const parse = require('csv-parse/lib/index');
const fs = require('fs');
const JokeC = require('./class_joke.js');
const path = require('path');

//Old file based joke storage

let csvFilepath = path.join(__dirname, '../data/jokes.csv');

var _storage = {
    admin: { //move admin user to env or use defaults
        username: 'admin',
        password: 'admin'
    },
    jokes: [],
    total: 0,
    server: {},
    init: (server, callback) => {
        _storage.server = server;
        fs.readFile(csvFilepath, (err, data) => {
            parse(data, {}, (err, jokes) => {
                if (err) {
                    throw new Error(err);
                }
                //clean joke data
                let cleanJokes = [];
                let jokeId = 0;
                for(let i=0; i<jokes.length; i++) {
                    let joke = jokes[i];
                    if (!joke) continue;
                    if (typeof joke === 'string' && joke !== '') {
                        jokeId++;
                        clearnJokes.push(JokeC({id: jokeId, text: joke}));
                    } else {
                        //assume array item
                        let _joke = joke[0];
                        if (_joke !== '') {
                            jokeId++;
                            cleanJokes.push(JokeC({id: jokeId, text: _joke}));
                        }
                    }
                }
                _storage.jokes = cleanJokes;
                _storage.total = _storage.jokes.length;
                if (typeof callback === 'function') {
                    callback();
                }
            });
        });
    },
    getRandom: () => {
        let i = Math.floor((Math.random() * _storage.total));
        return {joke: _storage.jokes[i]};
    },
    containsFilter: function(items, fieldName, containsValue) {
        let results = [];
        let _containsValue = containsValue.toLowerCase();
        for(let i=0; i<items.length; i++) {
            let item = items[i];
            if (item[fieldName] && item[fieldName].toLowerCase().indexOf(_containsValue) !== -1) {
                results.push(item);
            }
        }
        return results;
    },
    get: (request) => {
        let id = request.params.jokeNumber;
        if (id && id.toLowerCase() !== 'all') {
            _storage.server.log.info(`Joke number requested ${id}`);
            let idNumber = Number(id);
            let joke = '';
            if (_storage.exists(idNumber)) {
                joke = _storage.jokes[idNumber] || '';
            }
            if (joke !== '') {
                return {joke: joke};
            } else {
                return {error: 'Joke does not exist!'};
            }
        } else {
            //fetch all rows
            //check for filters in request (text, category)
            let filterText = request.query.text || '';
            let filterCategory = request.query.category || '';
            let jokes = _storage.jokes;
            if (filterText !== '') {
                jokes = _storage.containsFilter(jokes, 'text', filterText);
            }
            if (filterCategory !== '') {
                jokes = _storage.containsFilter(jokes, 'category', filterCategory);
            }
            return { jokes : jokes };
        }
    },
    exists: (id) => {
        let result = false;
        if (id=>0 && id<_storage.total) {
            result = true;
        }
        return result;
    },
    add: (joke) => {
        //not used in CSV storage
        throw new Error('Not implemented');
    },
    addOrUpdate: (joke, id) => {
        //not used in CSV storage
        throw new Error('Not implemented');
    },
    delete: (id) => {
        //not used in CSV storage
        throw new Error('Not implemented');
    }
};

module.exports = _storage;