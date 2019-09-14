import { Schema } from "mongoose"

export default db => {
    const typeSchema = Schema({
        name: { type: String, required: true },
        created_at: { type: Date, default: Date.now() },
        updated_at: { type: Date, default: Date.now() },
    }, { toJSON: { virtuals: true } })

    //if the model is not in models, create it
    return db.models.Type || db.model("Type", typeSchema)
}