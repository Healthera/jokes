/**
 * 
 * @param {*} log The log reference
 * @param {*} config An object which contains the reference of model and the data
 * @param {*} res A reference of the response
 */
export default async (log, config, res) => {
    try {
        const created = await config.model.create(config.data)
        if(created)
            res.status(201).json(created)
        else
            res.status(400).json()

    } catch(err) {
        log.warning(`An error has been found at create function -- ${err}`)
        res.status(500).json()
    }
}