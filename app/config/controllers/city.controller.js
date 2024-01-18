const models = require('../../src/models/index')
const errorHandler = require('../handlers/error.handler')
const City = models.City

// GET ALL CITIES
const findAll = async (req, res) => {
    try {
        const cities = await City.find();
        res.json(cities);
    } catch (err) {
        errorHandler(err, res);
    }
}

module.exports = {
    findAll
}