const mongoose = require('mongoose')



const orderSchema = mongoose.Schema({
   orderNumber: {type: String, unique: true,index: true },
   customerId: {type: mongoose.Schema.Types.ObjectId, ref: "user",required: true, index: true},
   bookId: {type: mongoose.Schema.Types.ObjectId, ref: "book",required: true, index: true},
   priceBook: {type:String, required: true},
   quantity: {type:String, required:true},
   totalPrice: {type:String,required: true},
   address: {type: String, required: true},
   phoneNumber: {type: String, required: true},
   method: {type:String,required:true},
   currentDiscount: {type:String},
   status: { 
    type: String,
    enum: ["pending","confirmed","packaging","shipping","delivered","completed","cancelled","returned"],
    default: "pending",
    index: true
  },
  cancelledAt: Date,
  diliveredAt: Date,
  completeAt: Date,
},{timestamps: true});

module.exports = mongoose.model('order',orderSchema)