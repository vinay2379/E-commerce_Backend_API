const error = require('../middleWare/error');
const Product=require('../Model/productModel');
const ErrorHandler = require('../Utils/errorHandler');
const catchAsyncError=require('../middleWare/AsyncError');
const ApiFeature = require('../Utils/apiFeature');
// create a user admin

exports.createProduct=catchAsyncError( async(req,res,next)=>{

   req.body.user=req.user.id;
const product=await  Product.create(req.body);

res.status(201).json({
   success : true,
   product
})
});




// get all user 
exports.getAllProducts= catchAsyncError(  async (req ,res)=>{

   const resultPage=5;
   const productCount=await Product.countDocuments();
 const apiFeature =new ApiFeature(Product.find(),req.query).search().filter().pagination(resultPage)
 const products=await apiFeature.query;

   res.status(200).json({
      success : true,
      products
   })
});

// get product details

exports.getProductDetails=catchAsyncError(   async (req ,res)=>{
   let product=await Product.findById(req.params.id)
   if(!product){
      return res.status(500).json({
         success : false,
         meassage : "user not found"
      })

   }
     
   res.status(200).json({
      success : true,
      product,
      productCount
   })

})

// update User only admin

exports.updateProduct=catchAsyncError( async(req,res,next)=>{
   let product=await Product.findById(req.params.id)
   if(!product){
      return res.status(500).json({
         success : false,
         meassage : "user not found"
      })

   }
   product=await Product.findByIdAndUpdate(req.params.id, req.body,{new: true,
      runValidators: true,
      usefindAndModify: false
   })
   res.status(200).json({
      success : true,
      product
   })
})


//  delete the product admin


exports.deleteProduct=catchAsyncError( async(req,res)=>{
   let product=await Product.findById(req.params.id)
   if(!product){
      return res.status(500).json({
         success : false,
         meassage : "user not found"
      })

   }
   await product.remove();

   res.status(200).json({
      success : true,
      message: "product deleted"
   })
})

// ______________________________________________________________________________________________

exports.ReviewProduct=catchAsyncError( async(req,res)=>{
const { comment,rating,productId}=req.body;
const review ={
user: req.user._id,
name : req.user.name,
rating: Number(rating),
comment
} 
const product=await Product.findById(productId)
const isReviewed=product.review.find((rev)=> rev.user.toString()===req.user._id.toString()

)
if(isReviewed){
product.review.forEach( (rev)=>{
   if(rev.user.toString()===req.user._id.toString()){
   (rev.rating=rating),(rev.comment=comment)
   }
})
}
else{
product.review.push(review);
product.numberOfReview=product.review.length
}

let avg=0;
product.ratings=product.review.forEach((rev)=>{
avg+=rev.ratings
})
product.ratings=avg/product.review.length;
await product.save({validateBeforeSave: false});

res.status(200).json({
   success : true,
  
})
})

exports.DeleteReview=catchAsyncError( async(req,res)=>{

   const product=await Product.findById(req.query.id);
   if(!product){
      return res.status(500).json({
         success : false,
         meassage : "user not found"
      })

   }





   res.status(200).json({
      success : true,
      message: "deleted",
     product
   })
})

