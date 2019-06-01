var express = require('express');
var router = express.Router();
const mongodb = require('.././mongodb.js');
const bodyParser= require('body-parser')

router.post('/add', (req, res) => {
  var db= mongodb.getDb();
  let database = db.db('my-database');

  database.collection('jokes').save(req.body, (err, result) => {
    if (err) return console.log(err)
    console.log('Joke added');
    database.collection('jokes').find().toArray(function(err, results) {
    res.send(results);
    })
  })
})

router.delete('/delete', (req, res) => {
  var db= mongodb.getDb();
    console.log('Joke Deleted --> ', req);
    console.log('Joke Deleted --> ', req.body);

  let database = db.db('my-database');
  database.collection('jokes').findOneAndDelete({joke: req.body.joke},
  (err, result) => {
    if (err) return res.send(500, err)
    console.log('Joke Deleted');
    database.collection('jokes').find().toArray(function(err, results) {
    res.send(results);
    })
  })
})

router.get('/', function(req, res, next){
  var db= mongodb.getDb();
  let database = db.db('my-database');
  database.collection('jokes').find().toArray(function(err, results) {
  let i = Math.floor((Math.random() * results.length));
        let response = {
           joke: results[i].joke
       }
  res.send(response);
  })
  res.set({
    'Cache-Control': 'no-cache'
  });
});


router.get('/all', function(req, res, next){
  var db= mongodb.getDb();
  let database = db.db('my-database');
  database.collection('jokes').find().toArray(function(err, results) {
  res.send(results);
  })
  res.set({
    'Cache-Control': 'no-cache'
  });
});

module.exports = router;
