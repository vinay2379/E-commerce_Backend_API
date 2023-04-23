const Order=require('../Model/orderModel');
const Product=require('../Model/productModel');
const catchAsyncError=require('../middleWare/AsyncError');
exports.orderProduct=catchAsyncError( async(req,res,next)=>{

    const {
        shippingInfo,
        order,
        paymentinfo,
        ItemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    }=req.body;

    const orderProduct =await Order.create({
        shippingInfo,
        order,
        paymentinfo,
        ItemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        
        user:  req.user.id
        
    });

    res.status(201).json({
        success : true,
      orderProduct
     })
});

// single order
exports.singleOrderProduct=catchAsyncError( async(req,res,next)=>{

    const orderProduct=await Order.findById(req.params.id).populate("user","name  email")
    if(!orderProduct){
        return res.status(400).json({
            success : false,
            meassage : "id is not matched"
         })
     }


 res.status(201).json({
        success : true,
      orderProduct
     })
})
// get login user order
exports.allOrderProduct=catchAsyncError( async(req,res,next)=>{

    const orderProduct=await Order.find({user: req.user._id})
    if(!orderProduct){
        return res.status(400).json({
            success : false,
            meassage : "id is not matched"
         })
     }


 res.status(201).json({
        success : true,
      orderProduct
     })
})
// get login user order by admin
exports.allOrderProductByAdmin=catchAsyncError( async(req,res,next)=>{

    const orderProduct=await Order.find();
   let totalPrice=0;
   orderProduct.forEach((order)=>{
    totalPrice +=order.totalPrice;
   })


 res.status(201).json({
        success : true,
      orderProduct,
      totalPrice,
     })
})

// get update  user order
exports.updateOrderProduct=catchAsyncError( async(req,res,next)=>{

    const orderProduct=await Order.findById(req.params.id)
    if(!orderProduct){
      return res.status(400).json({
          success : false,
          meassage : "id is not matched"
       })
      }
   if(orderProduct.orderStatus==="delivered"){
    return res.status(400).json({
        success : false,
        meassage : "allready delivered"
     })
   }

   orderProduct.order.forEach( async(order)=>{
   await  updateStock(order.product,order.qunity);
   })


   orderProduct.orderStatus=req.body.status
   if(req.body.status==="delivered"){
    orderProduct.delevryAt=Date.now();
   }
await orderProduct.save({validateBeforeSave : false})
 res.status(201).json({
        success : true,
      orderProduct
     })
})

async function  updateStock(id,qunity){
  const product =await Product.findById(id);
  product.Stock -=qunity;
await  product.save({validateBeforeSave : false});
}

// ___________________________________________________________________________________________________

exports.deleteProduct=catchAsyncError( async(req,res,next)=>{

  const orderProduct=await Order.findById(req.params.id);
 
  if(!orderProduct){
    return res.status(400).json({
        success : false,
        meassage : "id is not matched"
     })
 }

await orderProduct.remove();
res.status(201).json({
      success : true,
   
   })
})