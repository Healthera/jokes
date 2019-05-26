const express = require('express');
const router = express.Router();
const passport = require('passport');
const validateJokeInput = require('../validation/joke');
const _ = require('lodash');

const Joke = require('../models/Joke');
const User = require('../models/User');

/**
 * @swagger
 * 
 * /jokes:
 *    post:
 *      tags:
 *      - "jokes"
 *      summary: "Add a new joke"
 *      description: "add joke"
 *      operationId: "addJoke"
 *      produces:
 *      - "application/json"
 *      parameters:
 *      - in: "body"
 *        name: "body"
 *        description: "full name of the joke and type"
 *        required: true
 *        schema:
 *          type: "object"
 *          example: {
 *            name: "joke1",
 *            types: {
 *              cute: false,
 *              dark: true
 *            }
 *          }
 *      responses:
 *        200:
 *          description: "success"
 *        400:
 *          description: "Invalid Joke"
 */
router.post('/', passport.authenticate('jwt', { session: false }), function (req, res) {

    const { errors, isValid } = validateJokeInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }
    const newJoke = new Joke({
        name: req.body.name,
        types: req.body.types,
        created_by: req.user._id,
        updated_by: req.user._id,
    });

    newJoke
        .save()
        .then(joke => {
            res.json(_.pick(joke, ['name', 'types', 'date', 'id']));
        });
});

/**
 * @swagger
 *
 * /jokes:
 *    get:
 *      tags:
 *      - "jokes"
 *      summary: "Returns a list of jokes in descending order"
 *      description: "Returns a list of jokes"
 *      operationId: "getJokes"
 *      produces:
 *      - "application/json"
 *      parameters: []
 *      responses:
 *        200:
 *          description: "success"
 *          schema:
 *            type: "array"
 *            example: {
 *            created_by: {
 *              avatar: "//www.gravatar.com/avatar/d9d6413146c1dba0cdb4619d0bd75267?s=200&r=pg&d=mm",
 *              name: "Ahmad Al-Hasan",
 *              _id: "5ce9330073666e33cd9ff648"
 *            },
 *            date: "2019-05-25T23:37:29.294Z",
 *            id: "5ce9d1b94daa3a57c25b8f95",
 *            name: "joke1",
 *            types: {
 *              cute: false,
 *              dark: true
 *            }
 *          }
 *        400:
 *          description: "Bad DB response"
 */
router.get('/', (req, res) => {
    Joke
        .find({})
        .sort([['date', -1]])
        .then(async jokes => {
            const users = await Promise.all(jokes.map(joke => {
                return User.findById(joke.created_by);
            }));
            return res.json(
                jokes
                    .map((joke, i) => ({
                        ..._.pick(joke, ['name', 'types', 'date', 'id']),
                        created_by: _.pick(users[i], ['avatar', 'name', '_id'])
                    }))
            );
        })
        .catch(errors => res.status(400).json(errors));
});

/**
 * @swagger
 *
 * /jokes/{id}:
 *    get:
 *      tags:
 *      - "jokes"
 *      summary: "Returns joke by id"
 *      description: "Returns joke by id"
 *      operationId: "getJoke"
 *      produces:
 *      - "application/json"
 *      parameters:
 *       - name: "id"
 *         description: "ID of the joke that needs to be retreived"
 *         required: true
 *         type: "integer"
 *         minimum: 1.0
 *         format: "int64"
 *      responses:
 *        200:
 *          description: "success"
 *          schema:
 *            type: "object"
 *            example: {
 *            created_by: {
 *              avatar: "//www.gravatar.com/avatar/d9d6413146c1dba0cdb4619d0bd75267?s=200&r=pg&d=mm",
 *              name: "Ahmad Al-Hasan",
 *              _id: "5ce9330073666e33cd9ff648"
 *            },
 *            date: "2019-05-25T23:37:29.294Z",
 *            id: "5ce9d1b94daa3a57c25b8f95",
 *            name: "joke1",
 *            types: {
 *              cute: false,
 *              dark: true
 *            }
 *          }
 *        400:
 *          description: "Bad DB response"
 */
router.get('/:id', (req, res) => {
    Joke
        .findById(req.params.id)
        .then(joke => {
            return res.json(_.pick(joke, ['name', 'types', 'date', 'id']));
        })
        .catch(errors => res.status(400).json(errors));
});

/**
 * @swagger
 * /jokes{id}:
 *    put:
 *      tags:
 *      - "jokes"
 *      summary: "updates joke by ID"
 *      description: "update a joke by id"
 *      operationId: "updateJoke"
 *      produces:
 *      - "application/json"
 *      parameters:
 *      - name: "id"
 *        in: "path"
 *        description: "ID of the joke that needs to be updated"
 *        required: true
 *        type: "integer"
 *        minimum: 1.0
 *        format: "int64"
 *      - in: "body"
 *        name: "body"
 *        description: "full name of the joke and type"
 *        required: true
 *        schema:
 *          type: "object"
 *          example: {
 *          name: "joke1",
 *          types: {
 *            cute: false,
 *            dark: true
 *          }
 *        }
 *      responses:
 *        200:
 *          description: "success"
 *        400:
 *          description: "Bad DB response"
 */
router.put('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {

    const { errors, isValid } = validateJokeInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }
    Joke
        .findById(req.params.id)
        .then(joke => {
            joke.name = req.body.name;
            joke.types = req.body.types;
            joke.updated_by = req.user._id;
            return joke.save();
        })
        .then(joke => {
            res.json(_.pick(joke, ['name', 'types', 'date', 'id']));
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

/**
 * @swagger
 * /jokes{id}:
 *    delete:
 *      tags:
 *      - "jokes"
 *      summary: "Delete joke by ID"
 *      description: "deletes a joke by id"
 *      operationId: "deleteJoke"
 *      produces:
 *      - "application/json"
 *      parameters:
 *      - name: "id"
 *        in: "path"
 *        description: "ID of the joke that needs to be deleted"
 *        required: true
 *        type: "integer"
 *        minimum: 1.0
 *        format: "int64"
 *      responses:
 *        200:
 *          description: "success"
 *        400:
 *          description: "Bad DB response"
 */
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Joke
        .findById(req.params.id)
        .then(joke => {
            joke.delete();
        })
        .then(joke => {
            res.status(200).end();
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

module.exports = router;