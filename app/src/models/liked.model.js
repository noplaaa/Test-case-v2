module.exports = mongoose => {
    const schema = mongoose.Schema({
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        thread: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Thread',
            required: true,
        },
    }, {
        timestamps: true,
    })

    return mongoose.model('Like', schema)
}