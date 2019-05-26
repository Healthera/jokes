# Jokes System

## Getting started

* cd into backend folder
* run `npm install`
* add your `.env` file, check `.env.example` for more info, and change the dotenv path from `backend/app.js` to `.env`
* run `npm start`

* cd into frontend folder
* run `npm install`
* change proxy in `package.json` file to your backend endpoint `ex: localhost:5000`
* run `npm start`

## Joke APIs
The API documentation can be found here: http://localhost:5000/api-docs

It is also possible to try out the APIs at this location also: https://healthera.herokuapp.com

## Application
The main application runs at: http://localhost:3000/

## Features:
1. Users can Register, Login with supported JWT tokens
2. Users can add jokes and Edit/Delete their own jokes.
3. Everone can view jokes.
4. You can apply filters and search in Portal

## Technologies
Node.js, Express, JWT, MongoDB, React, Redux, Axios, Swagger