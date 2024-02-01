const jwt = require('jsonwebtoken')
const errorHandler = require('../handlers/error.handler')

module.exports = (req, res, next) => {
    const token = req.headers.authorization

    if (!token) {
        return res.status(401).send ('Unauthorized')
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decodedToken
        next()
    } catch (err) {
        errorHandler(err, res)
    }
}