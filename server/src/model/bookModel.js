const mongoose = require('mongoose')

const bookSchema = mongoose.Schema({
    name: {type: String, required: true},
    author: {type: Array, required: true},
    price: {type: String, required: true},
    description: {type: String},
    categories: {type: String, require: true},
    img: {type: String, required: true},
    inventory:{type: String},
    discount: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'discount',
        default: null
    }
})

module.exports = mongoose.model('book',bookSchema)