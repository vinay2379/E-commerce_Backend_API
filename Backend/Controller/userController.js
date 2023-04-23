
const catchAsyncError=require('../middleWare/AsyncError');

const User=require("../Model/userModel");
const sendToken = require('../Utils/jwtToken');
const sendemail=require('../Utils/sendEmail');
// create user
// ______________________________________________________________________________________________
 exports.registerUser=catchAsyncError( async(req,res,next)=>{
    const {name, email,password}=req.body;
    const user=await User.create({
        name,
        email,
        password,

        avatar :{
            public_id: "this is sample id",
            url : "default.png"
        }
    })
    sendToken(user,201,res);
    });
    //login a user
// __________________________________________________________________________________________________
    exports.loginUser=catchAsyncError( async(req,res,next)=>{
      const {email ,password}=req.body;
      if(! email || !password){
        return res.status(400).json({
            success : false,
            meassage : "user not found 1"
         })
      }
     const user= await User.findOne({email}).select("+password")
     if(!user){
        return res.status(400).json({
            success : false,
            meassage : "user not found 2"
         })
     }
     const isPasswordMatched=user.comparePassword(password);
     if(!isPasswordMatched){
        return res.status(400).json({
            success : false,
            meassage : "user not found 3"
         })
     }
    //  const token=user.getJWTToken();
    // res.status(200).json({
    //    success : true,
    //   token
    // }) or

    sendToken(user,200,res);

    })
// _______________________________________________________________________________________________________
    exports.logOut=catchAsyncError( async(req,res,next)=>{
     res.cookie("token" ,null, {
      expires : new Date(Date.now()),
      httpOnly: true,
     })

    res.status(200).json({
       success : true,
      meassage : "log out"
 }) 
    })
// _________________________________________________________________________________________________
    // forget User  
    exports.forgetPassword=catchAsyncError( async(req,res,next)=>{

    const user=await User.findOne({email : req.body.email});
    if(!user){
        return res.status(404).json({
            success : false,
            meassage : "user not found "
         }) 
    }
    const resetToken=  user.getResetPassword();
    await user.save({validateBeforeSave : false});

    const resetPasswordUrl=`${req.protocal}://${req.get(
        "host"
    )}/api/vi/password/reset/${resetToken}`;

  const   message =`your password reset token is:-\n\n ${resetPasswordUrl} \n\nIf you have not reqired then ignore`;

try {
    await sendemail({
        email : user.email,
        subject : `ecomerce password recovery`,
        message
    });
     

    res.status(200).json({
        success : true,
       meassage : `email sent to the ${user.email} successfully`,
  }) 
    
} catch (error) {
    user.resetPasswordTokken= undefined;
    user.resetPasswordExpire = undefined;
    await user.save({validateBeforeSave : false});
    return res.status(500).json({
        success : false,
        meassage : "user not found "
     })
}

    });

// ________________________________________________________________________________________________
    exports.getUserDetails=catchAsyncError( async(req,res,next)=>{

        const user=await User.findById(req.user.id)
        res.status(200).json({
            success : true,
           user,
         })

    });

    // _______________________________________________________________________________________________
    exports.UpdatePassword=catchAsyncError( async(req,res,next)=>{

        const user=await User.findById(req.user.id).select("+password")

        const isPasswordMatched=user.comparePassword(req.body.oldPassword);
        if(!isPasswordMatched){
           return res.status(400).json({
               success : false,
               meassage : "old password incorrect "
            })
        }
        if(req.body.newPassword != req.body.confirmPassword){
            return res.status(400).json({
                success : false,
                meassage : "password is not matched "
             })
        }
        user.password=req.body.newPassword;
        await user.save();

        // res.status(200).json({
        //     success : true,
        //    user,
        //  })
        sendToken(user,200,res);

    });
//    ____________________________________________________________________________________________

exports.updateProfile=catchAsyncError( async(req,res,next)=>{
const newUserData={
    name: req.body.name,
    email: req.body.email,
};
const user= await User.findByIdAndUpdate(req.user.id, newUserData,{
    new : true,
    runValidators : true,
    useFindAndModify: false
})
 res.status(200).json({
         success : true,
      
     })
});
// __________________________________________________________

exports.getallUser=catchAsyncError( async(req,res,next)=>{
    const user=await User.find();
    if(!user){
        return res.status(404).json({
            success : false,
            meassage : "user not found "
         }) 
    }
    res.status(200).json({
        success : true,
         user
    })

    })
// ______________________________________________________________________________________________

exports.getSingleUser=catchAsyncError( async(req,res,next)=>{
    const user=await User.findById(req.params.id)
    if(!user){
        return res.status(404).json({
            success : false,
            meassage : "user not found "
         }) 
    }
    res.status(200).json({
        success : true,
         user
    })

    })

// __________________________________________________________________________________________________

exports.updateRole=catchAsyncError( async(req,res,next)=>{
    const newUserData={
        name: req.body.name,
        email: req.body.email,
        role : req.body.role,
    };
    const user= await User.findByIdAndUpdate(req.params.id, newUserData,{
        new : true,
        runValidators : true,
        useFindAndModify: false
    })
     res.status(200).json({
             success : true,
          
         })
    });

// _______________________________________________________________________________________________

exports.deleteUserProfile=catchAsyncError( async(req,res,next)=>{
  
    const user= await User.findById(req.params.id)
    if(!user){
        return res.status(404).json({
            success : false,
            meassage : "user not found "
         }) 
    }
   await user.remove();
     res.status(200).json({
             success : true,
          message: "deleted"
         })
    });