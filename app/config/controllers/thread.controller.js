const errorHandler = require('../handlers/error.handler')
const jwt = require('jsonwebtoken')
const models = require('../../src/models/index')
const getThreadData = require('../middleware/threads/getAll.middleware')
const mongoose = models.mongoose
const User = models.User
const Thread = models.Thread

// does user authenticated?
exports.findById = async (userId) => {
  try {
    const foundUser = await User.findById(userId)
    return foundUser
  } catch (err) {
    errorHandler(err, res)
  }
}

// GET ALL THREADS
exports.findAll = async (req, res) => {
  try {
    const threadData = await getThreadData()
    res.json(threadData)
  } catch (err) {
    errorHandler(err, res)
  }
}

// GET ONE THREAD
exports.findOne = async (req, res) => {
  const id = req.params && req.params.id

  if (!id) {
    return res.status(400).send("Invalid thread's ID")
  }

  try {
    const threadData = await getThreadData()
    res.json(threadData)

    if (!data || data.length === 0) {
      return res.status(404).send('Thread not found')
    }

    res.send(data[0])
  } catch (err) {
    errorHandler(err, res)
  }
}

// CREATE THREAD
exports.create = async (req, res) => {
  try {
    const {
      title,
      text
    } = req.body

    // get token from headers
    const token = req.headers.authorization.split(' ')[1]
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

    // decode ID from token
    const userID = decodedToken.sub // FIXME: ini nanti ganti sub jadi ID
    if (!userID) {
      return res.status(401).send('Authorization failed')
    }

    // post new thread
    const newThread = await Thread.create({
      title,
      text,
      userID
    })

    res.status(201).json({
      userID: userID,
      threadBody: req.body,
      thread: newThread,
      message: "created new thread"
    })

    console.log(userID, typeof userID)
  } catch (err) {
    if (err.status) {
      res.status(err.status).send(err.message)
    } else {
      errorHandler(err, res)
    }
  }
}

// DELETE
exports.remove = async (req, res) => {
  const id = req.params.id

  Thread
    .findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        return res.status(404).send('Thread not found')
      }
      res.status(201).send('Thread deleted successfully')
    })
    .catch((err) => {
      errorHandler(err, res)
    })
}