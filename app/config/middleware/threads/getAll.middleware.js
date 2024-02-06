const models = require('../../../src/models/index')

async function getAllThreadData() {
  try {
    const threadData = await models.Thread.aggregate([
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

module.exports = getAllThreadData