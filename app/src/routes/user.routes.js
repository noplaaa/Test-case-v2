const express = require('express')
const passport = require('../../utilities/passports/user.passport')
const authController = require('../../config/controllers/auth.controller')
const userController = require('../../config/controllers/user.controller')
const cityController = require('../../config/controllers/city.controller')
const threadController = require('../../config/controllers/thread.controller')
const likedController = require('../../config/controllers/liked.controller')
const route = express.Router();

// auth
route.post('/user/auth', authController.login)

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
route.get('/user', userController.findAll)
route.get('/user/:id', userController.findOne)
route.put('/user/:id', userController.update)
route.delete('/user/:id', userController.remove)

route.get('/city', cityController.findAll)
route.get('/city/:id', cityController.findOne)

route.get('/thread', threadController.findAll)
route.get('/thread/:id', threadController.findOne)
route.post('/thread/create', threadController.create)
// route.put('/thread/:id', threadController.update)
route.delete('/thread/:id', threadController.remove)

route.post('/:threadID/like', likedController.likeThread)

module.exports = (app) => {
    app.use('/api', route)
}