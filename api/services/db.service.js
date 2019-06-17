const lodashId = require('lodash-id')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('./database/db.json')
const db = low(adapter)

db._.mixin(lodashId)

module.exports = db;