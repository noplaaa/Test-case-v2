module.exports = mongoose => {
    const cityRules = require("../../utilities/rules/city.rules")
    const schema = mongoose.Schema({
        cityId: {
            type: String,
            validate: cityRules,
            required: true,
        }
    }, {
        timestamps: true,
    })

    schema.method('toJSON', function () {
        const {
            __v,
            _id,
            ...object
        } = this.toObject()
        object.id = _id

        return object
    })

    return mongoose.model('City', schema)
}