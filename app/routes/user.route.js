const passport = require('../utilities/passports/user.passport')
const express = require('express')
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

        req.user = user
        console.log("Requested by authed user:", user.email)
        next()
    })(req, res, next)
};

// endpoints don't need authenticated user
route.post('/', userController.create)

// endpoints need authenticated user
route.use(isAuthenticated)
route.get('/', userController.findAll)
route.get('/:id', userController.findOne)
route.put('/:id', userController.update)
route.delete('/:id', userController.remove)

module.exports = (app) => {
    app.use('/api/user', route)
}