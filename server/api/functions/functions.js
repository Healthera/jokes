import create from "./create"
import update from "./update"
import _delete from "./delete"
import getOne from "./getOne"
import getMany from "./getMany"
import getRandom from "./getRandom"

export default {
/**
 * 
 * @param {*} log The log reference
 * @param {*} config An object which contains the reference of model and the data
 * @param {*} res A reference of the response
 */
    create: create,
/**
 * 
 * @param {*} log The log reference
 * @param {*} config An object which contains the reference of model and the predicate
 * @param {*} res A reference of the response
 */
    update: update,
/**
 * 
 * @param {*} log The log reference
 * @param {*} config An object which contains the reference of model and the predicate
 * @param {*} res A reference of the response
 */
    remove: _delete,
/**
 * 
 * @param {*} log The log reference
 * @param {*} config An object which contains the reference of model, predicate and populate
 * @param {*} res A reference of the response
 */
    getOne: getOne,
/**
 * 
 * @param {*} log The log reference
 * @param {*} config An object which contains the reference of model, predicate and populate
 * @param {*} res A reference of the response
 */
    getRandom: getRandom,
/**
 * 
 * @param {*} log The log reference
 * @param {*} config An object which contains the reference of model, predicate, populate, size and page
 * @param {*} res A reference of the response
 */
    getMany: getMany
}
