const models = require('../../../src/models/index')
const mongoose = models.mongoose

async function getThreadData() {
    try {
        const threadData = await models.Thread.aggregate([{
                $match: {
                    _id: new mongoose.Types.ObjectId(id)
                },
            },
            {
                $lookup: {
                    from: 'likes',
                    localField: 'likes',
                    foreignField: 'threads',
                    as: 'likes',
                },
            },
            {
                $addFields: {
                    "Likes": {
                        $size: '$likes'
                    },
                },
            },
            {
                $lookup: {
                    from: 'comments',
                    localField: 'comments',
                    foreignField: 'threads',
                    as: 'comments',
                },
            },
            {
                $addFields: {
                    "Comments": {
                        $size: '$comments'
                    },
                },
            },
            {
                $project: {
                    "_id": 1,
                    "title": 1,
                    "text": 1,
                    "userID": 1,
                    "Likes": 1,
                    "Comments": 1,
                },
            },
        ])
        return threadData
    } catch (err) {
        throw err
    }
}

module.exports = getThreadData