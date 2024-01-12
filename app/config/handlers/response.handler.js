// handler to send response
module.exports = (res, statusCode, message) => {
    return res.status(statusCode).send(message)
}