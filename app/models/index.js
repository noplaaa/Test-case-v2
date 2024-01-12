const dbConfig = require('../config/database')
const mongoose = require('mongoose')

module.exports = {
  mongoose,
  url: dbConfig.url,
  User: require('./user.model.js')(mongoose)
}