var MongoClient = require( 'mongodb' ).MongoClient;
var util = require('util');
const PropertiesReader = require('properties-reader');
const prop = PropertiesReader('./app.properties');
var _db;


getProperty = (pty) => {return prop.get(pty);}


var uri = util.format('mongodb://%s:%s@%s:%d/%s',
     getProperty('mongodb.username'), getProperty('mongodb.password'), getProperty('mongodb.host'), getProperty('mongodb.port'), getProperty('mongodb.databaseName'));

module.exports = {

  connectToServer: function( callback ) {
    /** Connect to the Mongo database at the URI using the client **/
    MongoClient.connect(uri, { auto_reconnect: true }, function( err, db ) {
      if (err) throw err;
      else if (!db) console.log('Unknown error connecting to database');
      else {
        console.log('Connected to MongoDB database server at:');
        console.log('\n\t%s\n', uri);
        _db = db;
      }
      return callback( err );
    } );
  },

  getDb: function() {
    return _db;
  },

  getProperty : function(pty) {
    return prop.get(pty);
  },

};
