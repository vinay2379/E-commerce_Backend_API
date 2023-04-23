const { default: mongoose } = require("mongoose")


const dbConnect= ()=>{
    try {
        mongoose.set("strictQuery", false);
     
        const con=mongoose.connect("mongodb://127.0.0.1:27017/mern")
        console.log(" db Coonected")
     }
     catch (error) {
     console.log(" error occers")
     }
}
module.exports=dbConnect;