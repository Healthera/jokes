"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var body_parser_1 = __importDefault(require("body-parser"));
var express_1 = __importDefault(require("express"));
var swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
var swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
var jokeRoutes = require("./apis/v1.0/jokes/routes");
var home = require("./app/home");
var databaseInit = require("./database/init");
var version = "v1.0";
var apiPath = "/apis/" + version;
var port = 3050;
var rootPath = "http://localhost:" + port;
var apiFullPath = rootPath + apiPath;
var app = express_1["default"]();
var db = databaseInit.setup();
// parse application/json
app.use(body_parser_1["default"].json());
var swaggerDefinition = {
    basePath: apiPath,
    info: {
        description: "Admin API suite for the Healthera joke system.",
        title: "Healthera Jokes",
        version: version
    },
    tags: [{
            description: "APIs for managing jokes",
            name: "jokes"
        }]
};
var options = {
    apis: ["./apis/v1.0/jokes/*.ts"],
    swaggerDefinition: swaggerDefinition
};
var swaggerSpec = swagger_jsdoc_1["default"](options);
// Configure APIs
app.disable("etag");
app.use("/apis/v1.0/docs", swagger_ui_express_1["default"].serve, swagger_ui_express_1["default"].setup(swaggerSpec));
jokeRoutes.setup(app, db, apiPath);
// Configure App
home.setup(app, apiFullPath);
// Start
app.listen(port, function () {
    console.log("Visit " + rootPath + "/home for app");
    console.log("Visit " + apiFullPath + "/docs for admin APIs");
});
