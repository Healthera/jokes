const fastifyPlugin = require("fastify-plugin");

module.exports = fastifyPlugin(async (server, secret) => {
    server.register(require('fastify-jwt'), {
        secret: secret
    });

    server.decorate("authenticate", async function(request, reply) {
        try {
            let decoded = await request.jwtVerify();
            request.username = decoded.username;
        } catch (err) {
            reply.send(err)
        }
    });
});
