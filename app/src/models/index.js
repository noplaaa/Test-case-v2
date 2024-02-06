// index.js
const dbConfig = require('../../config/database.js')
const mongoose = require('mongoose')
const User = require('./user.model.js')(mongoose)
const City = require('./city.model.js')
const Thread = require('./thread.model.js')(mongoose)
const Like = require('./liked.model.js')(mongoose)
const Comment = require('./comment.model.js')(mongoose)

module.exports = {
  mongoose,
  url: dbConfig.url,
  User,
  City,
  Thread,
  Like,
  Comment
}