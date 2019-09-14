/**
 * 
 * @param {*} log The log reference
 * @param {*} config An object which contains the reference of model, predicate and populate
 * @param {*} res A reference of the response
 */
export default async (log, config, res) => {
    try {
        await config.model.count().exec( async (err, count) => {
            if(err)
                res.status(500).json()
            else {
                const random = Math.floor(Math.random() * count)
                const found = await config.model.findOne().populate(config.populate) .skip(random)

                if(found)
                    res.status(200).json(found)
                else
                    res.status(404).json()
            }
        })
    } catch(err) {
        log.warning(`An error has been found at Random function -- ${err}`)
        res.status(500).json()
    }
}