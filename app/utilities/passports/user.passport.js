const passport = require('passport')
const passportJWT = require('passport-jwt')
const userController = require('../../config/controllers/user.controller')
const dotenv = require('dotenv')

dotenv.config();

const jwtOptions = {
  jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
}

passport.use(new passportJWT.Strategy(jwtOptions, async (jwtPayload, done) => {
  try {
    const foundUser = await userController.findById(jwtPayload.sub)

    if (foundUser) {
      return done(null, foundUser);
    } else {
      return done(null, false, { message: 'User not found' })
    }
  } catch (error) {
    return done(error, false, { message: 'Error finding user' })
  }
}))

module.exports = passport