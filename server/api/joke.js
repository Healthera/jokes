import jokeModel from "../db/jokeSchema"
import { createAndUpdateMiddleware, removeMiddleware } from "../middlewares/joke"
import functions from "./functions/functions"

export default (log, db, server) => {
    //This is where I'm getting the Schema, that's why I'm passing db to this function
    const Joke = jokeModel(db)
    //This is just to avoid duplication, it will populate the queries with relationship
    const populate = {  path: "_type", select: "name _id", model: "Type" }

    server.get("/jokes/random", async (_, res) => {
        await functions.getRandom(log, {
            model: Joke,
            populate: populate
        }, res)
    })

    server.get("/jokes/get/:_id", async (req, res) => {
        await functions.getOne(log, {
            model: Joke,
            predicate: { _id: req.params._id },
            populate: populate
        }, res)
    })

    server.get("/jokes/get/type/:_type/page/:page/size/:size", async (req, res) => {
        await functions.getMany(log, {
            model: Joke,
            page: req.params.page,
            size: req.params.size,
            predicate: { _type: req.params._type },
            populate: populate
        }, res)
    })

    server.get("/jokes/get/page/:page/size/:size", async (req, res) => {
        await functions.getMany(log, {
            model: Joke,
            page: req.params.page,
            size: req.params.size,
            predicate: {},
            populate: populate
        }, res)
    })

    server.post("/jokes/create", createAndUpdateMiddleware, async (req, res) => {
        await functions.create(log, {
            model: Joke,
            data: {
                text: req.body.text,
                _type: req.body._type
            }
        }, res)
    })

    server.put("/jokes/update", createAndUpdateMiddleware, async (req, res) => {
        await functions.update(log, {
            model: Joke,
            predicate: { _id: req.body._id },
            data: {
                _type: req.body._type,
                text: req.body.text,
                updated_at: Date.now()
            }
        }, res)
    })

    server.delete("/jokes/delete", removeMiddleware, async (req, res) => {
        await functions.remove(log, {
            model: Joke,
            predicate: { _id: req.body._id }
        }, res)
    })
}