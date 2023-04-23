const mongoose = require('mongoose')

const orderSchyma = new mongoose.Schema({
  shippingInfo: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    pincode: { type: Number, required: true },
    phoneNo: { type: Number, required: true },
  },


order: [{
    name: { type: String, required: true },
    price: { type: Number, required: true },
    qunity: { type: Number, required: true },
    image: {   type: String },
    product:{
        type : mongoose.Schema.ObjectId,
        ref: "Product",
        required : true,
    },
  
}],
user:{
    type : mongoose.Schema.ObjectId,
    ref: "User",
     required : true,
},

paymentinfo :{
id:{
    type: String,
     required: true  
},
status: {
    type: String,
     required: true
},
paidAt :{
    type: Date,
     required: true,
     default : Date.now
},
},

ItemsPrice:{
    type: Number,
     default : 0
},

taxPrice: {
    type: Number,
    default : 0  
},

shippingPrice: {
    type: Number,
    default : 0
},

totalPrice :{
    type: Number,
    default : 0
},

orderStatus:{
    type: String,
    required: true ,
    default: "procesing",
},

delevryAt: Date,
createdAt:{
    type: Date,
    default : Date.now
}




})

module.exports=mongoose.model("Order", orderSchyma)
