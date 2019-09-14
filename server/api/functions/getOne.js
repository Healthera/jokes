/**
 * 
 * @param {*} log The log reference
 * @param {*} config An object which contains the reference of model, predicate and populate
 * @param {*} res A reference of the response
 */
export default async (log, config, res) => {
    try {
        const found = await config.model.findOne(config.predicate)
            .populate(config.populate)

        res.status(200).json(found)
    } catch(err) {
        log.warning(`An error has been found at findOne function -- ${err}`)
        res.status(500).json()
    }
}