const jwt = require('jsonwebtoken')
const errorHandler = require('../handlers/error.handler')
const models = require('../../src/models/index')
const Comment = models.Comment

exports.commentThread = async (req, res) => {
    try {
        const {
            threadID
        } = req.query

        // get token from headers
        const token = req.headers.authorization.split(' ')[1]
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

        // decode ID from token
        const userID = decodedToken.sub // FIXME: ini nanti ganti sub jadi id
        if (!userID) {
            return res.status(401).send('Authorization failed')
        }

        await Comment.create({
            userID: userID,
            threadID: threadID,
            comment: req.body.comment
        })
        res.status(201).send('comment sent')
    } catch (err) {
        errorHandler(err, res)
    }
}