module.exports = mongoose => {
  const schema = mongoose.Schema({
    title: {
      type: String
    },
    text: {
      type: String,
      required: true
    },
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    deletedAt: {
      type: Date,
      default: null
    },
    isDeleted: {
      type: Boolean,
      default: false
    },
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

  return mongoose.model('Thread', schema)
}