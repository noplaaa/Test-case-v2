module.exports = mongoose => {
    const schema = mongoose.Schema({
        userID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        threadID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Thread',
            required: true,
        },
    }, {
        timestamps: true,
    })

    return mongoose.model('Like', schema)
}