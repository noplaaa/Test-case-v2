const jwt = require('jsonwebtoken')
const errorHandler = require('../handlers/error.handler')
const models = require('../../src/models/index')
const Thread = models.Thread
const Like = models.Like

exports.likeThread = async (req, res) => {
  try {
    const {
      threadID
    } = req.query

    // Get token from headers
    const token = req.headers.authorization.split(' ')[1]
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

    // Decode ID from token
    const userID = decodedToken.sub // FIXME: ini nanti ganti sub jadi id
    if (!userID) {
      return res.status(401).send('Authorization failed')
    }

    // thread exists?
    const threadExists = await Thread.exists({
      _id: threadID
    })
    if (!threadExists) {
      return res.status(404).json({
        message: 'Thread not found'
      })
    }

    // does user already liked the selected thread?
    const existingLike = await Like.findOne({
      userID: userID,
      threadID: threadID
    })
    if (existingLike) {
      await Like.findByIdAndDelete(existingLike._id)
      return res.status(201).json({
        message: 'disliked'
      })
    }

    await Like.create({
      userID: userID,
      threadID: threadID
    })

    return res.status(201).json({
      message: 'liked'
    })
  } catch (err) {
    errorHandler(err, res)
  }
}