const emailValidator = {
    validator: function (value) {
        return /^\S+@\S+\.\S+$/.test(value)
    },
    message: "Invalid email format"
}

module.exports = emailValidator