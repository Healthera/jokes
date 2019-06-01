# Steps to run an application

1. Move to `backend` directory and execute command
```
npm install
npm start
```

Above command will start node server on port `3050`

2. Move to `client` directory and execute command
```
npm install
npm start
```

Above command will start UI on port `3000`


# Import Data from CSV to MongoDB

```
mongoimport -h ds261486.mlab.com:61486 -u arpitaggarwal -p ******  -d my-database -c jokes --file jokes.csv --fields joke --type csv
```

# CLI

## Create Joke

```
$ curl -H "Content-Type: application/json" -X POST -d '{"joke": "Two donkeys are standing at a roadside"}' http://localhost:3050/jokes/add
```

## Get Joke

```
$ curl -X GET http://localhost:3050/jokes
```

## Delete Joke

```
$ curl -H "Content-Type: application/json" -X DELETE -d '{"joke": "Two donkeys are standing at a roadside"}' http://localhost:3050/jokes/delete
```
