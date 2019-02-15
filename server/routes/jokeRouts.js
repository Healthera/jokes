var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {

  // get joke list
  app.get('/jokes', (req, res) => {
    db.collection('jokes').find().toArray(function(err, result) {
      if (err) {
        res.send({ 'error' : 'An error has occurred'});
      } else {
        res.send(result);
      }
    });
  });

  //get specific joke
  app.get('/jokes/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id' : new ObjectID(id) };
    db.collection('jokes').findOne(details, (err, item) => {
      if (err) {
        res.send({'error': "can't find that one"});
      } else {
        res.send(item);
      }
    });
  });

  //create joke
  app.post('/jokes', (req, res) => {
    const joke = {
      joke: req.body.joke,
      punch_line: req.body.punch_line
    };

    db.collection('jokes').insert(joke, (err, result) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.send(result.ops[0])
      }
    });
  });

  // edit joke
  app.put('/jokes/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    const joke = {
      joke: req.body.joke,
      punch_line: req.body.punch_line
    }
    db.collection('jokes').update(details, joke, (err, result) => {
      if (err) {
          res.send({'error':'An error has occurred'});
      } else {
          res.send(joke);
      }
    });
  });

  //delete specific joke
  app.delete('/jokes/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('jokes').remove(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send('Joke ' + id + ' deleted!');
      }
    });
  });

};
