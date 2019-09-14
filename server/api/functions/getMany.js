/**
 * 
 * @param {*} log The log reference
 * @param {*} config An object which contains the reference of model, predicate, populate, size and page
 * @param {*} res A reference of the response
 */
export default async (log, config, res) => {
    try {
        const found = await config.model.find(config.predicate, null, {
            skip: config.page * config.size,
            limit: parseInt(config.size)
        }).populate(config.populate)

        res.status(200).json(found)
    } catch(err) {
        log.warning(`An error has been found at findMany function -- ${err}`)
        res.status(500).json()
    }
}