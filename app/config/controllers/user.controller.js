const passRules = require('../../utilities/rules/pass.rules')
const passConfirmRules = require('../../utilities/rules/passConfirm.rules')
const validateCity = require('../../utilities/validations/city.validate')
const errorHandler = require('../handlers/error.handler')
const models = require('../../src/models/index')
const User = models.User

// does user authenticated?
const findById = async (userId) => {
    try {
        const foundUser = await User.findById(userId)
        return foundUser
    } catch (err) {
        errorHandler(err, res)
    }
}

// GET ALL USERS
const findAll = async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (err) {
        errorHandler(err, res)
    }
}

// GET ONE USER
const findOne = async (req, res) => {
    const id = req.params && req.params.id

    if (!id) {
        return res.status(400).send('Invalid user ID')
    }

    try {
        const data = await User.findById(id)

        if (!data) {
            return res.status(404).send('User not found')
        }

        res.send(data)
    } catch (err) {
        if (err.name === 'CastError') {
            return res.status(400).send('Invalid user ID')
        }
        errorHandler(err, res)
    }
}

// REGISTER
const create = async (req, res) => {
    try {
        const {
            email,
            pass,
            pass_confirm,
            cityId,
            ...otherUserData
        } = req.body

        // validation :

        // for password
        const validatedPass = passRules(req.body.pass, res)
        if (validatedPass !== true) {
            res.status(validatedPass.status).send(validatedPass.message)
            return
        }

        const passConfirmValidation = passConfirmRules.validator(pass, pass_confirm)
        if (!passConfirmValidation.isValid) {
            res.status(403).send(passConfirmValidation.message)
            return
        }

        // for city data
        try {
            const cityData = await validateCity(req.body.cityId)

            if (cityData.error) {
                return res.status(403).send(cityData.message)
            }

            try {
                cityData.check(req.body.cityId)
            } catch (validationErr) {
                errorHandler(validationErr, res)
            }
        } 
        catch (err) {
            if (err.message.includes("This city isn't available yet")) {
                return res.status(403).send(err.message)
            } else {
                errorHandler(err, res)
            }
        }

        // create new data
        await User.create({
            email,
            pass,
            pass_confirm,
            cityId,
            ...otherUserData,
        });
        res.status(201).send('Registration successful')
    } catch (err) {
        if (err.status) {
            res.status(err.status).send(err.message)
        } else {
            errorHandler(err, res)
            return
        }
    }
}

// CHANGE PASS
const update = async (req, res) => {
    const id = req.params.id

    try {
        // validation
        const validatedPass = passRules(req.body.pass, res)
        if (validatedPass !== true) {
            res.status(validatedPass.status).send(validatedPass.message)
            return
        }

        const validatedPassCon = passConfirmRules.validator(req.body.pass, req.body.pass_confirm);
        if (!validatedPassCon.isValid) {
            res.status(validatedPassCon.status).send(validatedPassCon.message)
        }

        // update data
        const updatedUser = await User.findByIdAndUpdate(id, req.body, {
            useFindAndModify: false,
            new: true,
        })

        if (!updatedUser) {
            return res.status(404).send('User not found')
        }

        res.status(201).send('Password changed successfully')
    } catch (err) {
        errorHandler(err, res)
    }
}

// DELETE
const remove = async (req, res) => {
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

module.exports = {
    findById,
    findAll,
    findOne,
    create,
    update,
    remove
}