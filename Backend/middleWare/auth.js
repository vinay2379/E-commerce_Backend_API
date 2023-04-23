const catchAsyncError=require('../middleWare/AsyncError');
const jwt=require('jsonwebtoken');
const User=require("../Model/userModel");
 exports.isAuthniticationUser= catchAsyncError( async(req,res,next)=>{
const {token}=req.cookies;

if(!token){
    return res.status(401).json({
        success : false,
        meassage : "please login to access this resource"
     })
}
const decoded=jwt.verify(token,process.env.JWT_SECRET)
   const user=await User.findById(decoded?.id);
   req.user=user;
   next();
})

exports.isAutrizeRole=(...roles)=>{
  return (req,res,next)=>{
if(!roles.includes(req.user.role)){
return res.status(403).json({
  success : false,
  meassage : `Role : ${req.user.role}  is not allowed to access the resource`
})
}
next();
  }

}