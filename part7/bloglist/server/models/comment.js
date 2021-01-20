const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    content: { type: String, required: true },
    blog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog'
    },
})

// Need to get rid of weird properties from mongodb
commentSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Comment', commentSchema)