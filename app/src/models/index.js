// index.js
const dbConfig = require('../../config/database.js')
const mongoose = require('mongoose')
const User = require('./user.model.js')(mongoose)
const City = require('./city.model.js')
const Thread = require('./city.model.js')

module.exports = {
  mongoose,
  url: dbConfig.url,
  User,
  Thread
}