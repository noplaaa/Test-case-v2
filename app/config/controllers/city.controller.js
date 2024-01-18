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

// GET ONE CITY
const findOne = async (req, res) => {
    const id = req.params && req.params.id

    if (!id) {
        return res.status(400).send('Invalid city ID')
    }

    try {
        const data = await City.findById(id)

        if (!data) {
            return res.status(404).send('City not found')
        }

        res.send(data)
    } catch (err) {
        if (err.name === 'CastError') {
            return res.status(400).send('Invalid city ID')
        }
        errorHandler(err, res)
    }
}

module.exports = {
    findAll,
    findOne
}