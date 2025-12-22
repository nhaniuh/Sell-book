const mongoose = require('mongoose')

const discountSchema = new mongoose.Schema({
    name: {type: String},
    code: {type:String, unique: true},
    percent: {type:Number, required: true},
    startDate: {type: Date},
    endDate: {type: Date},
    isActive: {type: Boolean, default: true}
})

module.exports = mongoose.model('discount',discountSchema)