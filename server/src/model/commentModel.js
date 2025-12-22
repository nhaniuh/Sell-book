const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    UserId: {type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true, index: true},
    BookId: {type: mongoose.Schema.Types.ObjectId, ref: 'book', required: true, index: true},
    content: {type: String, required: true},
    createdAt: Date
},{timestamps: true})

module.exports = mongoose.model('comment',commentSchema)
