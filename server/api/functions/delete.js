/**
 * 
 * @param {*} log The log reference
 * @param {*} config An object which contains the reference of model and the predicate
 * @param {*} res A reference of the response
 */
export default async (log, config, res) => {
    try {
        const removed = await config.model.findOneAndRemove(config.predicate)
        if(removed)
            res.status(200).json()
        else
            res.status(400).json()
    } catch(err) {
        log.warning(`An error has been found at update function -- ${err}`)
        res.status(500).json()
    }
}