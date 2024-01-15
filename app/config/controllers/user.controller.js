const models = require('../../models/index')
const passRules = require('../../utilities/rules/pass.rules')
const passConfirmRules = require('../../utilities/rules/passConfirm.rules')
const cityRules = require('../../utilities/rules/city.rules')
const errorHandler = require('../handlers/error.handler')
const User = models.User;

// does user authenticated?
const findById = async (userId) => {
    try {
        const foundUser = await User.findById(userId)
        return foundUser
    } catch (error) {
        throw error
    }
};

// get all users
const findAll = async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (err) {
        errorHandler(err, res)
    }
};

// get one user
const findOne = async (req, res) => {
    const id = req.params && req.params.id

    if (!id) {
        return res.status(400).send('Invalid user ID')
    }

    try {
        const data = await findById(id)

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

// register
const create = async (req, res) => {
    try {
        const {
            email,
            pass,
            pass_confirm,
            cityId,
            ...otherUserData
        } = req.body

        // validating...
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

        if (!(await cityRules.validator(cityId, res)).isValid) {
            return
        }

        // creating...
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
        }
    }
}

// change password
const update = async (req, res) => {
    const id = req.params.id

    try {
        const validatedPass = passRules(req.body.pass, res)
        if (validatedPass !== true) {
            res.status(validatedPass.status).send(validatedPass.message)
            return
        }

        const validationResult = passConfirmRules.validator(req.body.pass, req.body.pass_confirm);
        if (!validationResult.isValid) {
            res.status(validationResult.status).send(validationResult.message)
        }

        // updating...
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

// delete user
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