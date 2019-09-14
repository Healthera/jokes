import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import mongo from "./db/mongo"
import preRun from "./db/preRun"
import joke from "./api/joke"
import type from "./api/type"
import logger from "./logger/logger"

const server = async port => {
    //creates a simple log and the mongodb connection
    const log = logger()
    const db = mongo("mongodb://db:27017/challenge")

    const app = express()
    app.use(cors())
    app.use(bodyParser.json())

    /**
     * db and log as references since it is running async
     * and we dont know who is going to be mounted first.
     */
    type(log, db, app)
    joke(log, db, app)
    preRun(log, db)

    app.listen(port, () =>  log.info(`The server is running on port ${port}`))
}

//the docker compose will provide the SERVER_PORT env variable
server(process.env.SERVER_PORT || 3050)