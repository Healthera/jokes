const express = require('express');
const fs = require('fs');
const app = express();
const exphbs = require('express-handlebars');
const parse = require('csv-parse');
const sqlServer = require("msnodesqlv8");
const promise = require('bluebird');


//Setup Handlebars:
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use('/', express.static('./public'));

//Render Portal Home Page:
app.get('/', function(req,res){
  res.render('home');
});


//----------------------------------------------------------
// DATABASE:
//----------------------------------------------------------
/*Declarations: */
const connectionString = 'Driver={SQL Server Native Client 11.0};Server=(localdb)\\Projectsv13;Database=jokedatabase;Uid=;Pwd=;';

//Need to add in creation of database if database does not exist
//CREATE DATABASE:
var createDatabaseQuery = "IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'jokelist') BEGIN \
CREATE TABLE [jokelist] (\
  [id] INT IDENTITY, \
  [joke] NVARCHAR(255), \
  [keyword] NVARCHAR(64),\
  PRIMARY KEY ([id])) \
END ELSE BEGIN SELECT COUNT(*) AS [no_of_jokes] FROM [jokelist] END";

sqlServer.query(connectionString, createDatabaseQuery, function(err, result){
  if(err){
    console.log('Error: ' + err);
  } else {
    if(result.length == 0 || result[0].no_of_jokes == 0){
      //Need to add in importation of CSV jokes into database if database length is 0 (empty database)
      //IMPORT CSV:
      fs.readFile('jokes.csv', (err, data) => {
        parse(data, {}, (err, jokes) => {
          for(let i=0; i < jokes.length; ++i){
            createNewJoke(jokes[i][0], '');
          }
        });
      });
    } else{
      console.log('Result: ' + result[0].no_of_jokes);
    }
  }
})

//----------------------------------------------------------
// Database promises & functions:
//----------------------------------------------------------
/*Promisify basic query */
function dbQuery(myQuery) {
  return new promise(function (resolve, reject) {
      sqlServer['query'](connectionString, myQuery, function (err, rows) {
          if (err) {
              console.error(err);
              reject(err);
          }
          else {
              console.log(rows);
              resolve(rows);
          }
      });
  });
};

function dbInsertQuery(myQuery, myValues){
  return new promise(function (resolve, reject) {
    sqlServer['query'](connectionString, myQuery, myValues, function(err, rows) {
      if (err) {
        console.error(err);
        reject(err);
      }
      else {
          console.log(rows);
          resolve(rows);
      }
    })
  })
}

//returns first row of database query as object, else returns null
function dbQuerySingle(myQuery) {
  return dbQuery(myQuery)
      .then(function (result) {
      if (result.length > 0) {
          return promise.resolve(result[0]);
      }
      else {
          return promise.resolve(null);
      }
  });
};

//Create New Joke
function createNewJoke (joke, keyword) {
  return dbInsertQuery(createJokeQuery(), [joke, keyword]);
}

//Find Existing Joke in Database
function findExistingJoke(jokeID) { //returns result or null
  return dbQuerySingle(findJokeQuery(jokeID));
};

//Update Existing Joke (text) in Database
function updateExistingJokeText(joke, id) {
  return dbQuery(updateJokeTextQuery(joke, id));
};

//Update Existing Joke (keyword) in Database
function updateExistingKeyword(keyword, id) {
  return dbQuery(updateKeywordQuery(keyword, id));
};

//Update Joke in Database
function updateJoke(updateID, newjoke, newkeyword) {
  let oldjoke = '';
  return findExistingJoke(updateID)
    .then(function (result) {
      if (result === null) {
        console.error('Joke ID: ' + updateID + '. Does not exist.');
        return promise.resolve(null);
      } else {
        oldjoke = result.joke;
        //Always update keywords
        return updateExistingKeyword(newkeyword, updateID)
        .then(function (result) {
          if(newjoke !== oldjoke){ //don't update joke if no change
            return updateExistingJokeText(newjoke, updateID);
          } else {
            return promise.resolve(result);
          }
        });
      }
    });
}

//Read all Jokes
function readAllJokes () {
  return dbQuery(allJokesQuery());
}

//Delete Joke 
function deleteExistingJoke(jokeID) {
  return dbQuery(deleteJokeQuery(jokeID));
};

//Delete A Joke in Database:
function deleteJoke(jokeID) {
  return findExistingJoke(joke)
    .then(function (result) {
      if (result === null) {
        console.error('Joke: ' + joke + '. Does not exist.');
        return promise.resolve(null);
      } else {
        console.log('Joke Found:' + joke);
        return deleteExistingJoke(joke);
      }
    });
}


//----------------------------------------------------------
// Queries:
//----------------------------------------------------------
//Query for creating new joke:
function createJokeQuery(joke, keyword) {
  return "INSERT INTO [jokelist]([joke], [keyword]) VALUES (?, ?)";
};

//Query for finding existing joke:
function findJokeQuery(jokeID) {
  return "SELECT * FROM [jokelist] WHERE [jokelist].[id] = '" + jokeID + "' ";
};
//Query for reading all jokes:
function allJokesQuery(){
  return "SELECT * FROM [jokelist]";
}
//Query for updating existing joke (joke text):
function updateJokeTextQuery(joke, id) {
  return "UPDATE [jokelist] SET [jokelist].[joke] = '" + joke + "' WHERE [jokelist].[id] = '" + id + "'";
};
//Query for updating existing joke (keyword text):
function updateKeywordQuery(keyword, id) {
  return "UPDATE [jokelist] SET [jokelist].[keyword] = '" + keyword + "' WHERE [jokelist].[id] = '" + id + "'";
};
//Query for deleting existing joke:
function deleteJokeQuery(jokeID) {
  return "DELETE FROM [jokelist] WHERE [jokelist].[id] = " + jokeID + " ";
};

//----------------------------------------------------------
// APIs
//----------------------------------------------------------

/*-----------------------------------------------------------
Will need to reuse the jokes data but don't
 want to re-read the file each time so will separate
 out the original tell a joke api from the readfile call
 *will need to convert these to use database rather than file later.
------------------------------------------------------------*/
//let alljokes = [];
// fs.readFile('jokes.csv', (err, data) => {
//   parse(data, {}, (err, jokes) => {
//       alljokes = jokes;
//   });
// });
//Original API: get random joke
// app.get('/random-joke', function (req, res) {
//   let i = Math.floor((Math.random() * alljokes.length));
//   let response = {
//     joke: alljokes[i][0]
//   }
//   res.json(response);
// });

//API: get random joke (using database)
app.get('/random-joke', function (req, res) {
  readAllJokes().then(function (result){
    let i = Math.floor((Math.random() * result.length));
    let response = {
      joke: result[i]['joke']
    }
    res.json(response);
  })
});

//Create Joke: Add a new joke to the database
app.post('/create-joke', function (req, res) {
  let newjoke = {
    joke: req.query.newjoke,
    keywords: req.query.tags
  };
  //Check joke field is not empty:
  if(!(newjoke.joke === "")){
    return createNewJoke(newjoke.joke, newjoke.keywords)
    .then(function(result) {
      if(result){
        res.json({success: true, message: 'New Joke submitted successfully!'});
      } else {
        res.json({success: false, message: 'error'});
      }
    })
  } else {
    res.json({success:false, message: 'Please enter a joke'}); //If empty prompt for joke
  }

});

//Read Jokes: Return all jokes
app.get('/read-joke', function (req, res) {
  //Read database - obtain list of jokes as array then return array
  readAllJokes().then(function (result){
    let allJokes = []
    for(let i=0; i < result.length; i++ ){
      allJokes.push({
        id: result[i]['id'],
        joke: result[i]['joke'],
        keywords: result[i]['keyword']
        })
    }
    res.json(allJokes);
  })
});

//Update Joke:
app.put('/update-joke', function (req, res) {
  let updateID = req.query.update_id;
  let updatejoke = {
    joke: req.query.update_joke,
    keywords: req.query.update_tags
  };
  //Check joke field is not empty:
  if(!(updatejoke.joke === "")){
    return updateJoke(updateID, updatejoke.joke, updatejoke.keywords)
    .then(function(result) {
      if(result){
        res.json({success: true, message: ' Joke Updated successfully!'});
      } else {
        res.json({success: false, message: 'error'});
      }
    })
  } else {
    res.json({success:false, message: 'Please enter a joke'}); //If empty prompt for joke
  }
});

//Delete Joke: delete selected joke
app.delete('/delete-joke', function (req, res) {
  //obtain selected joke
  let jokeID = req.query.joke_id;
  //delete from database
  deleteExistingJoke(jokeID)
  .then(function(result){
    res.json({success: true, message: 'Joke deleted successfully!'});
  })
  let joke = {
    id: req.query.id,
    joke: req.query.joke
  }
  //Add confirmation step: ask are you sure?
});


app.listen(3050, function () {
  console.log('Example app listening on port 3050.');
});
