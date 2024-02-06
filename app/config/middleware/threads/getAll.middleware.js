const models = require('../../../src/models/index')
const Like = models.Like
const Comment = models.Comment

async function getAllThreadData() {
    try {
        const threads = await models
            .Thread
            .find({})

        const threadData = await Promise.all(threads.map(async(thread) => {
            const likeCount = await Like.countDocuments({threadID: thread._id})
            const commentCount = await Comment.countDocuments({threadID: thread._id})

            // return data
            return {
                _id: thread._id,
                title: thread.title,
                text: thread.text,
                userID: thread.userID,
                Likes: likeCount,
                Comments: commentCount
            }
        }))

        return threadData
    } catch (err) {
        throw err
    }
}

module.exports = getAllThreadData