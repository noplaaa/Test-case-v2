module.exports = mongoose => {

    const schema = mongoose.Schema({
      title: {
        type: String
      },
      text: {
        type: String,
        validate: passRules,
        required: true
      },
      deletedAt: {
        type: Date,
        default: null
      },
      isDeleted: {
        type: Boolean,
      },
      userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      likedID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Like',
        required: true
      },
      commentID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
        required: true
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