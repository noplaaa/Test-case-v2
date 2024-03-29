const passRules = require('../../utilities/rules/pass.rules')
const passConfirmRules = require('../../utilities/rules/passConfirm.rules')
const validateCity = require('../../utilities/validations/city.validate')
const errorHandler = require('../handlers/error.handler')
const bcrypt = require('bcrypt')
const models = require('../../src/models/index')
const User = models.User

// does user authenticated?
exports.findById = async (id) => {
    try {
        const foundUser = await User.findById(id)
        return foundUser
    } catch (err) {
        errorHandler(err, res)
    }
}

// GET ALL USERS
exports.findAll = async (req, res) => {
    try {
        const users = await User.find().populate('cityName')
        const usersData = users.map(data => ({
            ...data.toObject(),
            // user has city?
            cityName: data.cityName ? data.cityName.cityName : "Undefined" // value for unexpected case
        }))

        res.json(usersData)
    } catch (err) {
        errorHandler(err, res)
    }
}

// GET ONE USER
exports.findOne = async (req, res) => {
    const id = req.params && req.params.id

    if (!id) {
        return res.status(400).send('Invalid user ID')
    }

    try {
        const users = await User.findById(id).populate('cityName')

        if (!users) {
            return res.status(404).send('User not found')
        }

        // user has city?
        const usersData = {
            ...users.toObject(),
            // user has city?
            cityName: users.cityName ? users.cityName.cityName : "Undefined" // value for unexpected case
        }

        res.send(usersData)
    } catch (err) {
        if (err.name === 'CastError') {
            return res.status(400).send('Invalid user ID')
        }
        errorHandler(err, res)
    }
}

// REGISTER
exports.create = async (req, res) => {
    try {
        let cityData // waiting for validation's response

        const {
            email,
            pass,
            pass_confirm,
            cityName,
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
            cityData = await validateCity(cityName) // array of city

            if (cityData.error) {
                return res.status(403).send(cityData.message)
            }

            try {
                cityData.check(cityName)
            } catch (validationErr) {
                errorHandler(validationErr, res)
                return
            }
        } catch (err) {
            if (err.message.includes("This city isn't available yet")) {
                return res.status(403).send(err.message)
            } else {
                errorHandler(err, res)
                return
            }
        }

        // hashing
        const hashedPassword = await bcrypt.hash(pass, 10)

        // create new user
        await User.create({
            email,
            pass: hashedPassword,
            pass_confirm,
            cityName: cityData.cityId, // is city exist in city data?
            ...otherUserData,
        })
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
            id, {
                pass: hashedPassword
            }, {
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