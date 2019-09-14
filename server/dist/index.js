'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var express = _interopDefault(require('express'));
var cors = _interopDefault(require('cors'));
var bodyParser = _interopDefault(require('body-parser'));
var mongoose = require('mongoose');
var mongoose__default = _interopDefault(mongoose);

/**
 * The mongodb connection will make the appliation restart if
 * the mongodb is not yet ready to receive connections, this is
 * delegated to the docker-compose with the property 'restart:always'
 * that's why I'm doing a console.error if the connection failed. Once
 * the mongodb accepts connections the application will no longer restart
 * and will create the db instance properly.
 */

var mongo = (conn) => {
    mongoose__default.connect(conn, {
        useNewUrlParser: true,
        useFindAndModify: false
    });

    const db = mongoose__default.connection;

    db.on("error", err => {
        console.error(err);
        process.exit(1);
    });

    return db
};

var jokeModel = db => {
    const jokeSchema = mongoose.Schema({
        _type: { type: mongoose.Schema.Types.ObjectId, ref: "Type" },
        text: { type: String, required: true },
        created_at: { type: Date, default: Date.now() },
        updated_at: { type: Date, default: Date.now() }
    }, { toJSON: { virtuals: true } });
 
    //if the model is not in models, create it
    return db.models.Joke || db.model("Joke", jokeSchema)
};

var typeModel = db => {
    const typeSchema = mongoose.Schema({
        name: { type: String, required: true },
        created_at: { type: Date, default: Date.now() },
        updated_at: { type: Date, default: Date.now() },
    }, { toJSON: { virtuals: true } });

    //if the model is not in models, create it
    return db.models.Type || db.model("Type", typeSchema)
};

const list = [
        "Team work is important; it helps to put the blame on someone else.",
        "You know that tingly little feeling you get when you like someone? That's your common sense leaving your body.",
        "Feeling pretty proud of myself. The Sesame Street puzzle I bought said 3-5 years, but I finished it in 18 months.",
        "Just read that 4,153,237 people got married last year, not to cause any trouble but shouldn't that be an even number?",
        "I used to think I was indecisive, but now I'm not too sure.",
        "It is so cold outside I saw a politician with his hands in his own pockets.",
        "Keep the dream alive: Hit the snooze button.",
        "What kind of shoes are made from bananas skins? Slippers.",
        "What kind of rooms have no walls? Mushrooms.",
        "If you think nobody cares whether you're alive, try missing a couple of payments.",
        "When an employment application asks who is to be notified in case of emergency, I always write, 'A very good doctor'.",
        "My favorite mythical creature? The honest politician.",
        "My internet is so slow, it's just faster to drive to the Google headquarters and ask them in person.",
        "I am a nobody, nobody is perfect, therefore I am perfect.",
        "Behind every successful student, there is a deactivated Facebook account.",
        "When I call a family meeting I turn off the house wifi and wait for them all to come running.",
        "Any room is a panic room if you've lost your phone in it.",
        "What do you call the security outside of a Samsung Store? Guardians of the Galaxy.",
        "What was Forrest Gump's email password? '1forrest1'",
        "Escalators don't break down... they just turn into stairs.",
        "Don't spell part backwards. It's a trap.",
        "Wifi went down during family dinner tonight. One kid started talking and I didn't know who he was.",
        "I'd tell you a chemistry joke but I know I wouldn't get a reaction.",
        "I went to buy some camouflage trousers the other day but I couldn't find any.",
        "The early bird gets the worm but the late worm gets to live.",
        "You can’t lose a homing pigeon. If your homing pigeon doesn’t come back, then what you’ve lost is a pigeon.",
        "The truth is out there. Anybody got the URL?",
        "My software never has bugs. It just develops random features.",
        "What is Bruce Lee’s favorite drink? Wataaaaah!",
        "How does NASA organize their company parties? They planet.",
        "Why can’t you hear a pterodactyl go to the bathroom? Because the “P” is silent.",
        "Why can’t a bike stand on its own? It’s two tired.",
        "I wrote a song about a tortilla. Well actually, it’s more of a wrap.",
        "I started a band called 999 Megabytes — we haven’t gotten a gig yet.",
        "Isn't it great to live in the 21st century? Where deleting history has become more important than making it.",
        "Apparently I snore so loudly that it scares everyone in the car I'm driving.",
        "I'm great at multitasking. I can waste time, be unproductive, and procrastinate all at once.",
        "Politicians and diapers have one thing in common. They should both be changed regularly, and for the same reason.",
        "I can totally keep secrets. It's the people I tell them to that can't.",
        "A computer once beat me at chess, but it was no match for me at kick boxing.",
        "Waking up this morning was an eye-opening experience.",
        "I bought a vacuum cleaner six months ago and so far all it's been doing is gathering dust.",
        "That awkward moment when you leave a store without buying anything and all you can think is 'act natural, you're innocent'.",
        "What happens to a frog's car when it breaks down? It gets toad away.",
        "Why was six scared of seven? Because seven 'ate' nine. ",
        "I'm reading a book about anti-gravity. It's impossible to put down.",
        "I am on a seafood diet. Every time I see food, I eat it.",
        "Why did the scientist install a knocker on his door? He wanted to win the No-bell prize!",
        "When I get naked in the bathroom, the shower usually gets turned on.",
        "A book just fell on my head. I've only got myshelf to blame.",
        "I wanna make a joke about sodium, but Na..",
        "Instead of 'the John,' I call my toilet 'the Jim.' That way it sounds better when I say I go to the Jim first thing every morning.",
        "I hate insects puns, they really bug me.",
        "I'm no photographer, but I can picture us together.",
        "I'm taking part in a stair climbing competition. Guess I better step up my game.",
        "My math teacher called me average. How mean!",
        "What did one ocean say to the other ocean? Nothing, they just waved.",
        "Why did the bee get married? Because he found his honey.",
        "Which day do chickens hate the most? Friday.",
        "How do you count cows? With a cowculator.",
        "What do you call a bear with no teeth? A gummy bear.",
        "If you ever get cold, just stand in the corner of a room for a while. They're normally around 90 degrees.",
        "I went to the bank the other day and asked the banker to check my balance, so she pushed me!",
        "What is the tallest building in the entire world? The library, because it has so many stories.",
        "How do trees access the internet? They log in.",
        "What do you call a famous fish? A star fish.",
        "What is a mummy's favorite type of music? Wrap!",
        "Why do hamburgers go to the gym A: To get better buns!",
        "How much room is needed for fungi to grow? As mushroom as possible",
        "Why did Adele cross the road? To sing, 'Hello from the other side!'",
        "Can February march? No, but April may.",
        "What is the color of the wind? Blew.",
        "Why are hairdressers never late for work? Because they know all the short cuts!",
        "What's an astronaut's favorite social media website? MySpace",
        "What do you call a sad coffee? Depresso.",
        "How come oysters never donate to charity? Because they are shellfish.",
        "How do you know a clock is still hungry? It goes back four seconds.",
        "Why did the tofu cross the road? To prove he wasn't chicken.",
        "Where do you learn how to make ice cream? Sundae School",
        "What did the grape say when it was stepped on? Nothing, it just let out a little wine.",
        "What do you get from a pampered cow? Spoiled milk.",
        "Want to hear a Potassium joke? K.",
        "When Magnesium and Oxygen started dating I was like, O MG!",
        "What computer sings the best? A Dell.",
        "What did the spider do on the computer? Made a website!",
        "where is the best place to hide a body? The second page of a Google search.",
        "I put my phone on airplane mode, but it sure ain't flyin'.",
        "Why is it that your nose runs, but your feet smell?",
        "Why shouldn't you write with a broken pencil? Because it’s pointless!",
        "What starts with E, ends with E, and has only 1 letter in it? Envelope.",
        "I was wondering why the ball kept getting bigger and bigger, and then it hit me.",
        "Did you hear about the guy whose whole left side was cut off? He's all right now.",
        "How do you make a tissue dance? Put a little boogie in it.",
        "The energizer bunny was arrested on a charge of battery.",
        "What do you call a rabbit that has fleas? Bugs bunny.",
        "What did the tree say to autumn? Leaf me alone.",
        "What do ghosts serve for dessert? I Scream.",
        "What tea do hockey players drink? Penaltea!",
        "On the other hand, you have different fingers.",
        "An opinion without 3.14159 is just an onion.",
        "Where do you find a birthday present for a cat? In a cat-alogue!",
        "I'm sorry I wasn't part of your past, can I make it up by being in your future?",
        "Now what's on the menu? Me-n-u",
        "Why are there pain killers in the jungle? The PARROTS-ATE-THEM-ALL.",
        "Are you made of beryllium, gold, and titanium? You must be because you are BeAuTi-ful.",
        "Forget hydrogen, you're my number one element.",
        "If at first you don’t succeed, destroy all evidence that you tried.",
        "A healthy sleep not only makes your life longer, but also shortens the workday.",
        "What happened to the boy who drank 8 cokes? He burped 7-Up.",
        "Why do golfers wear two pairs of pants? In case they get a hole in one.",
        "When is a door not a door? When it's ajar.",
        "Have you heard of the new restaurant on the moon? The food is amazing, but I've heard its got no atmosphere...",
        "Are you a parking ticket? Because you have fine written all over you",
        "What did the fish say when he swam into a wall? Dam!",
        "Show me a piano falling down a mineshaft and I'll show you A-flat minor.",
        "How do you wake up Lady Gaga? You poker face!",
        "Why did the orange lose the race? Because it ran out of juice.",
        "Dolphins are so smart that within a few weeks of captivity, they can train people to stand on the very edge of the pool and throw them fish?",
        "The shinbone is a device for finding furniture in a dark room.",
        "Always borrow money from a pessimist. They don't expect it back.",
        "I can’t believe I forgot to go to the gym today. That’s 7 years in a row now.",
        "I thought I’d tell you a good time travel joke – but you didn't like it.",
        "Why did the physics teacher break up with the biology teacher? There was no chemistry.",
        "I got another letter from this lawyer today. It said “Final Notice”. Good that he will not bother me anymore."
    ];

var preRun = async (log, db) => {
    const Type = typeModel(db);
    const Joke = jokeModel(db);

    try {
        const count = await Joke.countDocuments();
        if (!count) {
            const createdType = await Type.create({ "name": "Healthera" });
            let jokes = [];
            list.forEach(joke => {
                jokes.push({ "_type": createdType._id, "text": joke });
            });

            await Joke.collection.insertMany(jokes);
        }
    } catch(err) {
        log.warning(err);
    }
};

/**
 * It works as a middleware in order to make a pre verification over the parameters provided
 */

const jokeBodyType = {
    "_id": "string",
    "_type": "string",
    "text": "string"
};

const removeMiddleware = (req, res, next) => {
    const { _id } = req.body;

    if(!_id || typeof(_id) != "string")
        res.status(400).json({ "message": "To delete you must provide a valid _id." });
    else
        next();
};

const createAndUpdateMiddleware = (req, res, next) => {
    const { _id, _type, text } = req.body;
    
    if(!_type || !text || !_id)
        res.status(400).json({ "message": "Body has missing properties." });
    else {
        for(const prop in jokeBodyType) { //verifies if the property exist and has a correct type
            if(!(req.body.hasOwnProperty(prop) && typeof(req.body[prop]) == jokeBodyType[prop]))
                res.status(400).json({ "message": "Invalid body properties" });            
        }

        next();
    }
};

/**
 * 
 * @param {*} log The log reference
 * @param {*} config An object which contains the reference of model and the data
 * @param {*} res A reference of the response
 */
var create = async (log, config, res) => {
    try {
        const created = await config.model.create(config.data);
        if(created)
            res.status(201).json(created);
        else
            res.status(400).json();

    } catch(err) {
        log.warning(`An error has been found at create function -- ${err}`);
        res.status(500).json();
    }
};

/**
 * 
 * @param {*} log The log reference
 * @param {*} config An object which contains the reference of model and the predicate
 * @param {*} res A reference of the response
 */
var update = async (log, config, res) => {
    try {
        const updated = await config.model.findOneAndUpdate(config.predicate, {
            $set: config.data 
        }, { new: true });

        if(updated)
            res.status(200).json(updated);
        else
            res.status(400).json();

    } catch(err) {
        log.warning(`An error has been found at update function -- ${err}`);
        res.status(500).json();
    }
};

/**
 * 
 * @param {*} log The log reference
 * @param {*} config An object which contains the reference of model and the predicate
 * @param {*} res A reference of the response
 */
var _delete = async (log, config, res) => {
    try {
        const removed = await config.model.findOneAndRemove(config.predicate);
        if(removed)
            res.status(200).json();
        else
            res.status(400).json();
    } catch(err) {
        log.warning(`An error has been found at update function -- ${err}`);
        res.status(500).json();
    }
};

/**
 * 
 * @param {*} log The log reference
 * @param {*} config An object which contains the reference of model, predicate and populate
 * @param {*} res A reference of the response
 */
var getOne = async (log, config, res) => {
    try {
        const found = await config.model.findOne(config.predicate)
            .populate(config.populate);

        res.status(200).json(found);
    } catch(err) {
        log.warning(`An error has been found at findOne function -- ${err}`);
        res.status(500).json();
    }
};

/**
 * 
 * @param {*} log The log reference
 * @param {*} config An object which contains the reference of model, predicate, populate, size and page
 * @param {*} res A reference of the response
 */
var getMany = async (log, config, res) => {
    try {
        const found = await config.model.find(config.predicate, null, {
            skip: config.page * config.size,
            limit: parseInt(config.size)
        }).populate(config.populate);

        res.status(200).json(found);
    } catch(err) {
        log.warning(`An error has been found at findMany function -- ${err}`);
        res.status(500).json();
    }
};

/**
 * 
 * @param {*} log The log reference
 * @param {*} config An object which contains the reference of model, predicate and populate
 * @param {*} res A reference of the response
 */
var getRandom = async (log, config, res) => {
    try {
        await config.model.count().exec( async (err, count) => {
            if(err)
                res.status(500).json();
            else {
                const random = Math.floor(Math.random() * count);
                const found = await config.model.findOne().populate(config.populate) .skip(random);

                if(found)
                    res.status(200).json(found);
                else
                    res.status(404).json();
            }
        });
    } catch(err) {
        log.warning(`An error has been found at Random function -- ${err}`);
        res.status(500).json();
    }
};

var functions = {
/**
 * 
 * @param {*} log The log reference
 * @param {*} config An object which contains the reference of model and the data
 * @param {*} res A reference of the response
 */
    create: create,
/**
 * 
 * @param {*} log The log reference
 * @param {*} config An object which contains the reference of model and the predicate
 * @param {*} res A reference of the response
 */
    update: update,
/**
 * 
 * @param {*} log The log reference
 * @param {*} config An object which contains the reference of model and the predicate
 * @param {*} res A reference of the response
 */
    remove: _delete,
/**
 * 
 * @param {*} log The log reference
 * @param {*} config An object which contains the reference of model, predicate and populate
 * @param {*} res A reference of the response
 */
    getOne: getOne,
/**
 * 
 * @param {*} log The log reference
 * @param {*} config An object which contains the reference of model, predicate and populate
 * @param {*} res A reference of the response
 */
    getRandom: getRandom,
/**
 * 
 * @param {*} log The log reference
 * @param {*} config An object which contains the reference of model, predicate, populate, size and page
 * @param {*} res A reference of the response
 */
    getMany: getMany
};

var joke = (log, db, server) => {
    //This is where I'm getting the Schema, that's why I'm passing db to this function
    const Joke = jokeModel(db);
    //This is just to avoid duplication, it will populate the queries with relationship
    const populate = {  path: "_type", select: "name _id", model: "Type" };

    server.get("/jokes/random", async (_, res) => {
        await functions.getRandom(log, {
            model: Joke,
            populate: populate
        }, res);
    });

    server.get("/jokes/get/:_id", async (req, res) => {
        await functions.getOne(log, {
            model: Joke,
            predicate: { _id: req.params._id },
            populate: populate
        }, res);
    });

    server.get("/jokes/get/type/:_type/page/:page/size/:size", async (req, res) => {
        await functions.getMany(log, {
            model: Joke,
            page: req.params.page,
            size: req.params.size,
            predicate: { _type: req.params._type },
            populate: populate
        }, res);
    });

    server.get("/jokes/get/page/:page/size/:size", async (req, res) => {
        await functions.getMany(log, {
            model: Joke,
            page: req.params.page,
            size: req.params.size,
            predicate: {},
            populate: populate
        }, res);
    });

    server.post("/jokes/create", createAndUpdateMiddleware, async (req, res) => {
        await functions.create(log, {
            model: Joke,
            data: {
                text: req.body.text,
                _type: req.body._type
            }
        }, res);
    });

    server.put("/jokes/update", createAndUpdateMiddleware, async (req, res) => {
        await functions.update(log, {
            model: Joke,
            predicate: { _id: req.body._id },
            data: {
                _type: req.body._type,
                text: req.body.text,
                updated_at: Date.now()
            }
        }, res);
    });

    server.delete("/jokes/delete", removeMiddleware, async (req, res) => {
        await functions.remove(log, {
            model: Joke,
            predicate: { _id: req.body._id }
        }, res);
    });
};

/**
 * It works as a middleware in order to make a pre verification over the parameters provided
 */

const removeMiddleware$1 = (req, res, next) => {
    const { _id } = req.body;

    if(!_id || typeof(_id) != "string")
        res.status(400).json({ "message": "To delete you must provide a valid _id." });
    else
        next();
};

const createAndUpdateMiddleware$1 = (req, res, next) => {
    const { _id, name } = req.body;
    
    if((!name || typeof(name) != "string") || (!_id || typeof(_id) != "string"))
        res.status(400).json({ "message": "Invalid body properties." });
    else
        next();
};

var type = (log, db, server) => {
    //This is where I'm getting the Schema, that's why I'm passing db to this function
    const Type = typeModel(db);

    server.get("/types/get", async (_, res) => {
        await functions.getMany(log, {
            model: Type,
            skip: null,
            limit: null,
            predicate: {},
            populate: null
        }, res);
    });

    server.post("/types/create", createAndUpdateMiddleware$1, async (req, res) => {
        await functions.create(log, {
            model: Type,
            data: {
                name: req.body.name
            }
        }, res);
    });

    server.put("/types/update", createAndUpdateMiddleware$1, async (req, res) => {
        await functions.update(log, {
            model: Type,
            predicate: { _id: req.body._id },
            data: {
                name: req.body.name,
                updated_at: Date.now()
            }
        }, res);
    });

    server.delete("/types/delete", removeMiddleware$1, async (req, res) => {
        await functions.remove(log, {
            model: Type,
            predicate: { _id: req.body._id }
        }, res);
    });
};

/**
 * Very simple logger implementation, this is not stored anywhere, it just makes console.log
 */

var logger = () => {

    /**
     * 
     * @param {*} msg This method will do a console.log and add a time in the message
     */
    const log = msg => {
        let time = new Date().toLocaleString().replace(",","").replace(/:.. /," ");
        console.log(`[${time}] ${msg}`);
    };

    /**
     * 
     * @param {*} msg Error data to log
     */
    const error = msg => {
        log(`[ERROR] ${msg}`);
    };

    /**
     * 
     * @param {*} msg Info data to log
     */
    const info = msg => {
        log(`[INFO] ${msg}`);
    };

    /**
     * 
     * @param {*} msg Warning data to log
     */
    const warning = msg => {
        log(`[WARNING] ${msg}`);
    };

    return {
        error: error,
        info: info,
        warning: warning
    }
};

const server = async port => {
    //creates a simple log and the mongodb connection
    const log = logger();
    const db = mongo("mongodb://db:27017/challenge");

    const app = express();
    app.use(cors());
    app.use(bodyParser.json());

    /**
     * db and log as references since it is running async
     * and we dont know who is going to be mounted first.
     */
    type(log, db, app);
    joke(log, db, app);
    preRun(log, db);

    app.listen(port, () =>  log.info(`The server is running on port ${port}`));
};

//the docker compose will provide the SERVER_PORT env variable
server(process.env.SERVER_PORT || 3050);
