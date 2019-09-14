/**
 * Very simple logger implementation, this is not stored anywhere, it just makes console.log
 */

export default () => {

    /**
     * 
     * @param {*} msg This method will do a console.log and add a time in the message
     */
    const log = msg => {
        let time = new Date().toLocaleString().replace(",","").replace(/:.. /," ")
        console.log(`[${time}] ${msg}`)
    }

    /**
     * 
     * @param {*} msg Error data to log
     */
    const error = msg => {
        log(`[ERROR] ${msg}`)
    }

    /**
     * 
     * @param {*} msg Info data to log
     */
    const info = msg => {
        log(`[INFO] ${msg}`)
    }

    /**
     * 
     * @param {*} msg Warning data to log
     */
    const warning = msg => {
        log(`[WARNING] ${msg}`)
    }

    return {
        error: error,
        info: info,
        warning: warning
    }
}