import typeModel from "../db/typeSchema"
import { createAndUpdateMiddleware, removeMiddleware } from "../middlewares/type"
import functions from "./functions/functions"

export default (log, db, server) => {
    //This is where I'm getting the Schema, that's why I'm passing db to this function
    const Type = typeModel(db)

    server.get("/types/get", async (_, res) => {
        await functions.getMany(log, {
            model: Type,
            skip: null,
            limit: null,
            predicate: {},
            populate: null
        }, res)
    })

    server.post("/types/create", createAndUpdateMiddleware, async (req, res) => {
        await functions.create(log, {
            model: Type,
            data: {
                name: req.body.name
            }
        }, res)
    })

    server.put("/types/update", createAndUpdateMiddleware, async (req, res) => {
        await functions.update(log, {
            model: Type,
            predicate: { _id: req.body._id },
            data: {
                name: req.body.name,
                updated_at: Date.now()
            }
        }, res)
    })

    server.delete("/types/delete", removeMiddleware, async (req, res) => {
        await functions.remove(log, {
            model: Type,
            predicate: { _id: req.body._id }
        }, res)
    })
}