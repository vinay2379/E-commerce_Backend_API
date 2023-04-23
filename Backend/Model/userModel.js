const mongoose=require('mongoose');
const validator=require('validator');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const crpto=require('crypto')
const userSchyma=new mongoose.Schema({
    name : {
        type: String,
        required :[true, "enter the username "],
        maxLength :[30, "enter the less then 30"],
        minLength : [3,"enter more then 3"]
    },
     email :{
        type: String,
        required :[true, "enter the email "],
        unique : true,
        validate: [validator.isEmail, "please enter valide email"]
     },
     password :{
        type: String,
        required :[true, "enter the username "],
        minLength : [3,"enter more then 3"],
        select: false,
     },
     avatar:{
        public_id :{
            type :String,
            required :true,
        },
        url :{
            type :String,
            required :true,
        }
    
    },
    role: {
       type : String,
       default : "user"
    },
    resetPasswordTokken : String,
    resetPasswordExpire : Date,

})

userSchyma.pre("save", async function (next){
if(!this.isModified("password")){
next();
}

    this.password=await  bcrypt.hash(this.password,10);

})

 userSchyma.methods.getJWTToken=function (){
return jwt.sign({id:this._id},process.env.JWT_SECRET,{
    expiresIn :process.env.JWT_EXPIRE,
}

    )
}

userSchyma.methods.comparePassword=async function(enterPassword){
    return await bcrypt.compare(enterPassword,this.password);
}

userSchyma.methods.getResetPassword=async function(){
    // genrate tokken
    const resetToken=crpto.randomBytes(20).toString("hex");

    this.resetPasswordTokken =crpto.createHash("sha256").update(resetToken).digest("hex");
    this.resetPasswordExpire =Date.now() + 15*60*1000
    return resetToken;
}

module.exports=mongoose.model("User", userSchyma)