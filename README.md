# Healthera jokes API

Extracts relevant data from ticket website and stores in a CSV file.

## Getting Started

Clone this repo and enter the directory:

```
$ git clone + SSH Key
$ cd jokes
```
### Prerequisites

This app requires MongoDB. To install, follow the instructions [here](https://docs.mongodb.com/manual/installation/).

Install dependencies:
```
$ npm install
```

### Testing

This was tested with Mocha and Chai. To run,  enter:
```
$ npm test
```

Run linter:
```
$ npm eslint folder/file.js
```

I manually checked the server output using Postman, as can be seen here:

![screenshot 2019-02-18 at 13 06 47](https://user-images.githubusercontent.com/41509062/52954593-81535d00-3382-11e9-8f4c-77849920350e.png)


To install Postman, follow the instructions [here](https://www.getpostman.com/downloads/).


### Usage

To start the server:

```
npm start
```

### Things I would do if I had more time:

- Import CSV into MongoDB database.
- TDD the frontend portal, using React.
- Introduce a joke filter

## Built With

Node.js
