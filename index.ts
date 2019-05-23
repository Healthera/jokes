import bodyParser from "body-parser";
import express from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import jokeRoutes = require("./apis/v1.0/jokes/routes");
import home = require("./app/home");
import databaseInit = require("./database/init");

const version = "v1.0";
const apiPath = "/apis/" + version;
const port = 3050;
const rootPath = "http://localhost:" + port;
const apiFullPath = rootPath + apiPath;
const app = express();
const db = databaseInit.setup();

// parse application/json
app.use(bodyParser.json());

const swaggerDefinition = {
    basePath: apiPath,
    info: {
        description: "Admin API suite for the Healthera joke system.",
        title: "Healthera Jokes",
        version,
    },
    tags: [{
        description: "APIs for managing jokes",
        name: "jokes",
    }],
};

const options = {
    apis: ["./apis/v1.0/jokes/*.ts"],
    swaggerDefinition,
};

const swaggerSpec = swaggerJSDoc(options);

// Configure APIs
app.disable("etag");
app.use("/apis/v1.0/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
jokeRoutes.setup(app, db, apiPath);

// Configure App
home.setup(app, apiFullPath);

// Start
app.listen(port, () => {
    console.log("Visit " + rootPath + "/home for app");
    console.log("Visit " + apiFullPath + "/docs for admin APIs");
});
