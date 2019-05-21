const low = require('lowdb');
const lodashId = require('lodash-id');
const FileSync = require('lowdb/adapters/FileSync');
const JokeC = require('./class_joke.js');
const path = require('path');

//Local Database approach (not scalable, only for simplicity)

//Data file paths
let dbFilepath = path.join(__dirname, '../data/jokesDb.json');
let csvFilepath = path.join(__dirname, '../data/jokes.csv'); //required to automatically create the db

const adapter = new FileSync(dbFilepath); //move filename to config
const db = low(adapter);

//custom id handler
db._.mixin(lodashId);

//custom 'contains' query
db._.mixin({
    contains: function(items, fieldName, containsValue) {
        let results = [];
        let _containsValue = containsValue.toLowerCase();
        for(let i=0; i<items.length; i++) {
            let item = items[i];
            if (item[fieldName] && item[fieldName].toLowerCase().indexOf(_containsValue) !== -1) {
                results.push(item);
            }
        }
        return results;
    }
});

//setup a default json database (db) if it doesn't exists already
db.defaults({ admin: { username: 'admin', password: 'admin' }, count: 0, jokes: [] }).write();

var _storage = {
    admin: {
        username: '',
        password: ''
    },
    total: 0,
    server: {},
    init: (server, callback) => {
        _storage.server = server;
        _storage.admin = db.get('admin').value();
        _storage.total = db.get('count').value();
        _storage.server.log.info(`Found ${_storage.total} jokes`);
        if (_storage.total === 0) {
            _storage.server.log.info(`Importing demo jokes`);
            _storage.importFromCsv(() => {
                _storage.server.log.info(`Found ${_storage.total} jokes`);
            });
        }
        if (typeof callback === 'function') {
            callback();
        }
    },
    getRandom: () => {
        let i = Math.floor((Math.random() * _storage.total));
        return {joke: db.get(`jokes[${i}]`)};
    },
    get: (request) => {
        let id = request.params.jokeNumber;
        if (id && id.toLowerCase() !== 'all') {
            _storage.server.log.info(`Joke id requested ${id}`);
            let joke = '';
            if (_storage.exists(id)) {
                joke = db.get('jokes').find({ id: id }).value();
            }
            if (joke !== '') {
                return {joke: joke};
            } else {
                return {error: 'Joke does not exist!'};
            }
        } else {
            //fetch all rows
            //check for filters in request (text, category)
            let jokes = db.get('jokes');
            let filterText = request.query.text || '';
            let filterCategory = request.query.category || '';
            if (filterText !== '') {
                jokes = jokes.contains('text', filterText);
            }
            if (filterCategory !== '') {
                jokes = jokes.contains('category', filterCategory);
            }
            return { jokes : jokes.value() };
        }
    },
    exists: (id) => {
        let result = false;
        if (db.get('jokes').getById(id).value()) {
            result = true;
        }
        return result;
    },
    add: (joke) => {
        let _joke = JokeC(joke);
        if (_joke.text === '') {
            throw new Error('Joke should contain \'text\' field');
        }
        let newJoke = db.get('jokes').insert(_joke).write();
        db.update('count', i => i + 1).write(); //consider using db.get('jokes').size().value();
        _storage.total = db.get('count').value();
        return newJoke;
    },
    addOrUpdate: (joke) => {
        let _joke = JokeC(joke);
        //check if id exists and update or add
        let id = _joke.id;
        if (id !== 0 && _storage.exists(id)) {
            //update existing joke
            let _jokeRecordObj = db.get('jokes').getById(id);
            let _jokeRecord = JokeC(_jokeRecordObj.value());
            if (_joke.text !== '') {
                _jokeRecord.text = _joke.text;
            }
            if (_joke.category !== '') {
                _jokeRecord.category = _joke.category;
            }
            return _jokeRecordObj.assign(_jokeRecord).write();
        } else {
            //new joke
            if (_joke.text === '') {
                throw new Error('Joke should contain \'text\' field');
            }
            return _storage.add(joke);
        }
    },
    delete: (id) => {
        let result = false;
        if (_storage.exists(id)) {
            db.get('jokes').remove({id: id}).write();
            db.update('count', i => i - 1).write();
            _storage.total = db.get('count').value();
            result = true;
        }
        return {deleted: result, id: id};
    },
    importFromCsv: (callback) => {
        let parse = require('csv-parse');
        let fs = require('fs');
        fs.readFile(csvFilepath, (err, data) => {
            parse(data, {}, (err, jokes) => {
                if (err) {
                    throw new Error(err);
                }
                //clean joke data
                for(let i=0; i<jokes.length; i++) {
                    let joke = jokes[i];
                    if (!joke) continue;
                    let _joke = JokeC();
                    if (typeof joke === 'string' && joke !== '') {
                        _joke.text = joke;
                    } else {
                        //assume array item
                        _joke.text = joke[0];
                    }
                    _storage.add(_joke);
                }

                if (typeof callback === 'function') {
                    callback();
                }

            });
        });
    }
};

module.exports = _storage;