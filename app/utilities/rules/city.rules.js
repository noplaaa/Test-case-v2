// city.rules.js
const { check } = require('express-validator')
const citySeeder = require('../../seeders/city.seeder')

const validateCity = (cityId) => {
  return check('cityId')
    .custom((value, { req, location, path }) => {
      if (!availableCities.includes(value)) {
        throw new Error("This city isn't available yet")
      }
      return true
    })
}

module.exports = validateCity