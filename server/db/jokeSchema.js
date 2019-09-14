import { Schema } from "mongoose"

export default db => {
    const jokeSchema = Schema({
        _type: { type: Schema.Types.ObjectId, ref: "Type" },
        text: { type: String, required: true },
        created_at: { type: Date, default: Date.now() },
        updated_at: { type: Date, default: Date.now() }
    }, { toJSON: { virtuals: true } })
 
    //if the model is not in models, create it
    return db.models.Joke || db.model("Joke", jokeSchema)
}