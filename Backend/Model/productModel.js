const mongoose=require('mongoose');

const productSchema=new mongoose.Schema({
name : {
    type: String,
    required :[true, "enter the product name"],
    trim : true,
},
description :{
    type: String,
    required :[true, "enter the product discription"]  
},
price : {
    type : Number,
    required :[true, "enter the product price"],
    maxLength : [8,"price is not exced in 8 characters"]

},
ratings : {
    type :Number,
    default : 0,
},
images :[{
    public_id :{
        type :String,
        required :true,
    },
    url :{
        type :String,
        required :true,
    }

}],
category :{
    type : String,
    required :[true, "enter the product category"],
},
 stock : {
  type : Number,
  required : [true, "enter the product stock"],
  maxLength : [4 ," can not acces above 4"],
  default : 1,
},
numberOfReview :{
    type : Number,
    default : 0,
},
review :[
    {
        user :{
            type : mongoose.Schema.ObjectId,
            ref: "User",
            required : true,
          },
        name : {
            type : String,
            required : true,
        },
        rating:{
            type :Number,
            required : true,
        },
        comment :{
            type : String ,
            required : true,
        }
    }
],
user :{
  type : mongoose.Schema.ObjectId,
  ref: "User",
  required : true,
},

 createdAt:{
 type : Date,
 default : Date.now
}

})

module.exports=mongoose.model("Product", productSchema)