const jwt = require('jsonwebtoken')
const errorHandler = require('../handlers/error.handler')
const models = require('../../src/models/index')
const Like = models.Like

exports.likeThread = async (req, res) => {
  try {
    const {
      threadID
    } = req.params

    // get token from headers
    const token = req.headers.authorization.split(' ')[1]
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

    // decode ID from token
    const userID = decodedToken.sub // FIXME: ini nanti ganti sub jadi id
    if (!userID) {
        return res.status(401).send('Authorization failed')
    }

    const existingLike = await Like.findOne({
      userID: userID,
      threadID: threadID
    })

    if (existingLike) {
      await Like.findByIdAndDelete(existingLike._id)
      res.status(201).json({
        message: 'disliked'
      })
    } else {
      await Like.create({
        userID: userID,
        threadID: threadID
      })
      res.status(201).json({
        message: 'liked'
      })
    }
  } catch (err) {
    errorHandler(err, res)
  }
}