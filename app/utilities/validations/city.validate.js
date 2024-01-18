const models = require('../../src/models/index')
const City = models.City

const validateCity = async (cityId) => {
  try {
    // fetch data from DB
    const availableCity = await City.findOne({
      cityId: cityId
    })

    if (!availableCity) {
      return {
        error: true,
        message: "This city isn't available yet",
      }
    }

    return {
      cityId: availableCity.cityId,
      cityName: availableCity.cityName,
      check: (value) => {
        if (value !== availableCity.cityId) {
          console.error("This city isn't available yet")
        }
      },
    }
  } catch (err) {
    // failed connect to DB
    errorHandler(err)
    return {
      error: true,
      status: 500,
      message: 'Fetching failed',
    }
  }
}

module.exports = validateCity