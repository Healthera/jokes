# Healthera jokes API

Extracts relevant data from ticket website and stores in a CSV file.

## Getting Started

Clone this repo and enter the directory:

```
$ git clone + SSH Key
$ cd jokes
```
### Prerequisites

This app requires MongoDB. To install, follow the instructions[here](https://docs.mongodb.com/manual/installation/).

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

Screenshot

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
