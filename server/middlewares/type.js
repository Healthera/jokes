/**
 * It works as a middleware in order to make a pre verification over the parameters provided
 */

export const removeMiddleware = (req, res, next) => {
    const { _id } = req.body

    if(!_id || typeof(_id) != "string")
        res.status(400).json({ "message": "To delete you must provide a valid _id." })
    else
        next()
}

export const createAndUpdateMiddleware = (req, res, next) => {
    const { _id, name } = req.body
    
    if((!name || typeof(name) != "string") || (!_id || typeof(_id) != "string"))
        res.status(400).json({ "message": "Invalid body properties." })
    else
        next()
}