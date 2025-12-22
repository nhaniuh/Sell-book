const mongoose = require('mongoose')


const userSchema = mongoose.Schema({
    name: {type: String,required:true},
    email: {type: String, required: true},
    gender:{type:String},
    password: {type:String},
    avatar: {type:String},
    role: {type: String, default: 'user'},
    cart:{type:Array, default: []},
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'order' }],
    phoneNumber: {type:String},
    address: {type: String}
},{timestamps:true})

module.exports = mongoose.model('user',userSchema)
