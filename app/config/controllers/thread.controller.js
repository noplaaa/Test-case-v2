const errorHandler = require('../handlers/error.handler')
const models = require('../../src/models/index')
const User = models.User
const Thread = models.Thread

// does user authenticated?
exports.findById = async (userId) => {
    try {
        const foundUser = await User.findById(userId)
        return foundUser
    } catch (err) {
        errorHandler(err, res)
    }
}

// GET ALL THREADS
exports.findAll = async (req, res) => {
    try {
        const threadData = await models.Thread.find()
        res.json(threadData)
    } catch (err) {
        errorHandler(err, res)
    }
}

// GET ONE THREAD
exports.findOne = async (req, res) => {
    const id = req.params && req.params.id

    if (!id) {
        return res.status(400).send('Invalid user ID')
    }

    try {
        const data = await Thread.findById(id)

        if (!data) {
            return res.status(404).send('User not found')
        }

        res.send(data)
    } catch (err) {
        errorHandler(err, res)
    }
}

// CREATE THREAD
exports.create = async (req, res) => {
    try {
        const { title, text } = req.body

        // email exists?
        const userEmail = req.user ? req.user.email : null
        if (!userEmail) {
            return res.status(401).send('Authorization failed')
        }

        // post new thread
        const newThread = await Thread.create({
            title,
            text,
        })

        res.status(201).json({
            message: 'Thread created successfully',
            userEmail: userEmail,
            thread: newThread,
        })
    } catch (err) {
        if (err.status) {
            res.status(err.status).send(err.message)
        } else {
            errorHandler(err, res)
        }
    }
}

// CHANGE PASS
exports.update = async (req, res) => {
    const id = req.params.id

    try {
        // Validation
        const validatedPass = passRules(req.body.pass, res)
        if (validatedPass !== true) {
            res.status(validatedPass.status).send(validatedPass.message)
            return
        }

        const validatedPassCon = passConfirmRules.validator(req.body.pass, req.body.pass_confirm)
        if (!validatedPassCon.isValid) {
            res.status(validatedPassCon.status).send(validatedPassCon.message)
            return
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(req.body.pass, 10)

        // Update data
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { pass: hashedPassword },
            {
                useFindAndModify: false,
                new: true,
            }
        )

        if (!updatedUser) {
            return res.status(404).send('User not found')
        }

        res.status(201).send('Password changed successfully')
    } catch (err) {
        errorHandler(err, res)
    }
}

// DELETE
exports.remove = async (req, res) => {
    const id = req.params.id

    User
        .findByIdAndDelete(id)
        .then((data) => {
            if (!data) {
                return res.status(404).send('User not found')
            }
            res.status(201).send('User deleted successfully')
        })
        .catch((err) => {
            errorHandler(err, res)
        })
}