const dbConfig = require('../../config/database.js')
const mongoose = require('mongoose')

module.exports = {
  mongoose,
  url: dbConfig.url,
  User: require('./user.model.js')(mongoose),
  City: require('./city.model.js')(mongoose)
}