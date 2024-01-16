module.exports = mongoose => {
    const emailRules = require('../rules/email.rules')
    const passRules = require('../rules/pass.rules')

    const authSchema = mongoose.Schema({
        email: {
            type: String,
            validate: emailRules,
            required: true,
        },
        pass: {
            type: String,
            validate: passRules,
            required: true
        }
    });

    return mongoose.model('Auth', authSchema)
}