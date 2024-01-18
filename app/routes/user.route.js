const express = require('express')
const passport = require('../utilities/passports/user.passport')
const userController = require('../config/controllers/user.controller')
const authController = require('../config/controllers/auth.controller')
const route = express.Router();

// auth
route.post('/auth', authController.login)

// middleware for JWT auth
const isAuthenticated = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user) => {
        if (err || !user) {
            console.error('Authentication error:', err)
            return res.status(401).json({ error: 'Unauthorized' })
        }
        next()
    })(req, res, next)
}

// don't need authenticate
route.post('/', userController.create)

// need authenticate
route.use(isAuthenticated)
route.get('/', userController.findAll)
route.get('/:id', userController.findOne)
route.put('/:id', userController.update)
route.delete('/:id', userController.remove)

// route.get('/', cityController.findAll)
// route.get('/', cityController.findOne)

module.exports = (app) => {
    app.use('/api/user', route)
}