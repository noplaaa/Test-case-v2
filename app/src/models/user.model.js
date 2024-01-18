module.exports = mongoose => {
  const emailRules = require('../../utilities/rules/email.rules')
  const passRules = require('../../utilities/rules/pass.rules')
  const schema = mongoose.Schema({
    email: {
      type: String,
      validate: emailRules,
      required: true,
      unique: true,
      trim: true,
    },
    pass: {
      type: String,
      validate: passRules,
      required: true,
    },
    pass_confirm: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    hobbies: String,
  }, {
    timestamps: true,
  });

  schema.method('toJSON', function () {
    const {
      __v,
      _id,
      ...object
    } = this.toObject()
    object.id = _id

    return object
  });

  return mongoose.model('User', schema)
}