const jwt = require('jsonwebtoken')
const models = require('../../src/models/index')
const errorHandler = require('../handlers/error.handler')
const auth = models.User

exports.login = async (req, res) => {
    const { email, pass } = req.body

    try {
        const user = await auth.findOne({ email })

        if (user === null) {
            return res.status(404).send('User not found')
        }

        if (pass === user.pass) {
            const token = jwt.sign({ sub: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' })
            res.json({ token, message: 'Logged in successfully' })
        } else {
            res.status(401).send('Credentials invalid')
        }
    } catch (err) {
        errorHandler(err, res)
    }
}