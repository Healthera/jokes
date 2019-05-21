/**********************************************************************************
 * Jokes Challenge
 * Submission on 21st May 2019 by Ryan O'Dell (ryan@itsavesyou.com)
 * Approximate time to complete: 10 hours
 * (I had to keep stopping and starting)
 * Using 'fastify' as the server/route manager/authentication,
 * 'jsGrid' as main administration interface,
 * 'lowdb' as a simple database,
 * 'swagger' as a simple API documentation tool,
 * --------------------------------------------------------------------------------
 * Notes
 * Jokes are stored in the 'data' folder, see the initial 'storage' line below to
 * swap between CSV and DB.
 * The DB can easily be swapped out for a robust implementation (recommend something
 * like Azure Cosmos for it's scalability.
 * The random jokes will be provided from http://localhost:3000/
 * The administration interface can be found by visiting http://localhost:3000/admin/
 * Default Administrator login is: admin/admin
 * --------------------------------------------------------------------------------
 * Authentication for everything except the random joke and sign up.
 * Authentication uses a JWT Bearer token, storing the username in the token.
 * A 'secret' is required for the token creation, currently this is static with
 * an option for an environment variable (process.env.secret).
 * I only added basic functionality (e.g. filtering) to the CSv storage,
 * although it could have the full CRUD support if needed, would just need to make
 * some minor adjustments.
 * The Administration web page is using basic styling and jsGrid/jQuery to provide
 * the necessary joke data, sorting, filtering, add, edit, remove.
 * If you do use filters, you can clear the filters and Hit Enter to reload all.
 * --------------------------------------------------------------------------------
 * Removing the 'data/jokesDb.json' file will reset the jokes data from the csv.
 * --------------------------------------------------------------------------------
 * Tested in Chrome Version 74.0.3729.157 (Official Build) (64-bit)
 **********************************************************************************/

const server = require('fastify')({ logger: true });
const path = require('path');

//setup simple favicon
server.register(require('fastify-favicon'));

//setup static path for admin html and assets
server.register(require('fastify-static'), {
    root: path.join(__dirname, 'admin'),
    prefix: '/admin/',
});

//define storage module (csv, local db, another db...)
const storage = require('./myModules/storage-localDb.js');
//const storage = require('./storage-csv.js');

//define jwt token authenticator for private routes (requires 'secret')
require('./myModules/authenticate.js')(server, process.env.secret || 'myJokesAreTheBest2019');

//define basic swagger documentation module (may need to review the authentication section)
server.register(require('fastify-swagger'), {
    routePrefix: '/docs',
    exposeRoute: true,
    swagger: {
        info: {
            title: 'Jokes Challenge API',
            description: 'Improved Jokes API, providing administration of jokes',
            version: '0.1.0'
        },
        host: 'localhost',
        schemes: ['http'],
        consumes: ['application/json', 'text/html'],
        produces: ['application/json'],
        tags: [
            { name: 'public', description: 'Anonymous end-points' },
            { name: 'private', description: 'Secured end-points' }
        ]
    }
});

//instruct storage module to load jokes and then using callback setup routes
storage.init(server, () => {
    //Verify Administrator and provide token authentication
    server.post('/signup', {
        schema: {
            description: 'Authenticate to Retrieve Token',
            tags: ['public'],
            params: {
                type: 'object',
                properties: {
                    usr: {
                        type: 'string',
                        description: 'user id'
                    },
                    psw: {
                        type: 'string',
                        description: 'password'
                    }
                }
            }
        }
    }, async (request, reply) => {
        let checkUser = request.body;
        let username = checkUser.usr.toLowerCase(); //case insensitive, consider trimming to specific length
        let password = checkUser.psw; //case sensitive, consider trimming to specific length
        if (username === storage.admin.username.toLowerCase() && password === storage.admin.password) {
            server.log.info(`Admin user verified [${username}]`);
            const token = server.jwt.sign({ username: username });
            server.log.info(`Admin token [${token}]`);
            return reply.send({ token })
        }
        server.log.error(`Failed to verify Admin user [${username}]`);
        return reply.send({status: 'Failed to authenticate'});
    });

    //Read Random Joke
    server.get('/',{
        schema: {
            description: 'Get a random joke',
            tags: ['public']
        }
    }, async () => {
        return storage.getRandom();
    });

    //Authenticated Endpoint - Read Specific Joke using Identifier or All Jokes (using 'all' as identifier)
    server.get('/:jokeNumber', { preValidation: [server.authenticate],
        schema: {
            querystring: {
                text: { type: 'string' },
                category: { type: 'string'}
            },
            description: 'Get specific joke by id or \'all\' jokes, includes optional query string filters (text, category)',
            tags: ['private'],
            params: {
                type: 'object',
                properties: {
                    jokeNumber: {
                        type: 'string',
                        description: 'provide the joke id or \'all\''
                    }
                }
            },
            security: [
                {
                    http: []
                }
            ]
        }
    },async (request) => {
        return storage.get(request);
    });

    //Authenticated Endpoint - Create a New or Update Existing Joke
    server.post('/', { preValidation: [server.authenticate],
        schema: {
            description: 'Create a New Joke or Update an Existing Joke',
            tags: ['private'],
            params: {
                type: 'object',
                properties: {
                    id: {
                        type: 'string',
                        description: 'optionally provide the joke id for updating or do not specify'
                    },
                    text: {
                        type: 'string',
                        description: 'provide the joke text'
                    },
                    category: {
                        type: 'string',
                        description: 'provide a category name for the joke, may become a fixed list in the future'
                    }
                }
            },
            security: [
                {
                    http: []
                }
            ]
        }
    }, async (request) => {
        return storage.addOrUpdate(request.body);
    });

    //Authenticated Endpoint - Delete a Joke
    server.delete('/:jokeNumber', { preValidation: [server.authenticate],
        schema: {
            description: 'Delete a specific joke by id',
            tags: ['private'],
            params: {
                type: 'object',
                properties: {
                    jokeNumber: {
                        type: 'string',
                        description: 'provide the joke id'
                    }
                }
            },
            security: [
                {
                    http: []
                }
            ]
        }
    }, async (request) => {
        return storage.delete(request.params.jokeNumber);
    });

    //Start the Application/Web server
    server.listen(3000, (err, address) => {
        if (err) {
            server.log.error(err);
            process.exit(1);
        }
        server.swagger();
        server.log.info(`server listening on ${address}`);
    })
});
