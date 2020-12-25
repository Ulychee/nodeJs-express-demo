const diskdb = require('diskdb')
const db = diskdb.connect('./data',['topics','faqs'])

module.exports = { db }
