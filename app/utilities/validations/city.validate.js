const errorHandler = require('../../config/handlers/error.handler')
const models = require('../../src/models/index')
const City = models.City

const validateCity = async (cityName) => {
    try {
        // fetch data from DB
        const availableCity = await City.findOne({
            cityName: cityName, // Corrected to use cityName
        })

        if (!availableCity) {
            return {
                error: true,
                message: "This city isn't available yet",
            }
        }

        return {
            cityId: availableCity._id,
            cityName: availableCity.cityName,
            check: (value) => {
                if (value !== availableCity.cityName) {
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