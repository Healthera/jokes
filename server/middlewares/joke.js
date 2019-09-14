/**
 * It works as a middleware in order to make a pre verification over the parameters provided
 */

const jokeBodyType = {
    "_id": "string",
    "_type": "string",
    "text": "string"
}

export const removeMiddleware = (req, res, next) => {
    const { _id } = req.body

    if(!_id || typeof(_id) != "string")
        res.status(400).json({ "message": "To delete you must provide a valid _id." })
    else
        next()
}

export const createAndUpdateMiddleware = (req, res, next) => {
    const { _id, _type, text } = req.body
    
    if(!_type || !text || !_id)
        res.status(400).json({ "message": "Body has missing properties." })
    else {
        for(const prop in jokeBodyType) { //verifies if the property exist and has a correct type
            if(!(req.body.hasOwnProperty(prop) && typeof(req.body[prop]) == jokeBodyType[prop]))
                res.status(400).json({ "message": "Invalid body properties" })            
        }

        next()
    }
}