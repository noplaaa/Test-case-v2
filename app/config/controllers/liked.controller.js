const models = require('../../src/models/index')
const Like = models.Like

exports.likeThread = async (req, res) => {
  try {
    const { threadID } = req.params
    const userId = req.user.id // using decoded user from token

    // Periksa apakah pengguna sudah menyukai thread
    const existingLike = await Like.findOne({ user: userId, thread: threadId })

    if (existingLike) {
      // Jika sudah ada, hapus like
      await Like.findByIdAndRemove(existingLike._id)
      res.json({ message: 'Thread disliked successfully' })
    } else {
      // Jika belum ada, buat like baru
      await Like.create({ user: userId, thread: threadId })
      res.json({ message: 'Thread liked successfully' })
    }
  } catch (err) {
    // Handle errors
    console.error(err)
    res.status(500).send('Internal Server Error')
  }
}