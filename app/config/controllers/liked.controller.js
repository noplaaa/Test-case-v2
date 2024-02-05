const models = require('../../src/models/index')
const errorHandler = require('../handlers/error.handler')
const Like = models.Like

exports.likeThread = async (req, res) => {
  try {
    const { threadID } = req.params
    const userId = req.user.id // using decoded user from token

    const existingLike = await Like.findOne({ user: userId, thread: threadID })

    if (existingLike) {
      await Like.findByIdAndRemove(existingLike._id)
      res.json({ message: 'disliked' })
    } else {
      await Like.create({ user: userId, thread: threadID })
      res.json({ message: 'liked' })
    }
  } catch (err) {
    errorHandler(err, res)
  }
}