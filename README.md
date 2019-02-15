# Ryan's Healthera Tech Test
---------------------

## Overview

  This is my attempt at a joke tech Test for Healthera. I will try to complete this in 3 hours or less.
  This app is a work in progress and I did not get to implement all the features I wanted. I completed this in 1h 56m

  The App is as modular as possible and was created with repurpose in mind.

  I repurposed an earlier mongoDB backend that I had made a few weeks prior and adapted it to this challenge.

  The feature testing and the webpage layout was all TDD
  The model testing was done manually and with postman

------------
## Installation

* clone this repository
```
$ git clone https://github.com/RyanWolfen7/jokes.git
```
* cd into the server
```
$ cd server
```
* install the package.json
```
$ yarn install
```
* Create a mlab account
```
https://mlab.com
```
* Create a new data base
* create a jokes collection
* add your mlab url to server/config/db.js
```
// example in server/config/db.js
  module.exports = {
      url: 'mongodb://USERNAME:PASWORD@ds135255.mlab.com:35255/healthera_jokes'
};
```
* Start the server
```
$ yarn start
```
* leave server folder and head into the client folder
```
$ cd ..
$ cd client
```
* install the package.json
```
$ yarn install
```
* run the client
```
yarn start
```
* because I didn't finish my testing you have to create a joke on your local host web page
```
// just copy the text
Joke: Why'd the angular dev get ran over by a car?
Punchline: He couldn't React fast enough"
```
* leave client and run cypress
```
$ cd ..
$ yarn run cypress open
```
