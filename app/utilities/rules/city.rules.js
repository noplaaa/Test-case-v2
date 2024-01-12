const cityNames = require('../../seeders/city.seeder')

const cityRules = {
  validator: async function (cityId, res) {
    if (!cityNames.includes(cityId)) {
      res.status(403).send("This city isn't available yet")
      return {  isValid: false, message: "This city isn't available yet", status: 403 }
    } else {
      return { isValid: true, status: 201 }
    }
  }
}

module.exports = cityRules