const express=require('express');
const cookieParsar=require('cookie-parser')
const errormiddlaeWare=require('./middleWare/error')
 const app=express();
app.use(express.json());
app.use(cookieParsar());
// import router from './Routes/productRoute';
 const products=require("./Routes/productRoute")
const user=require('./Routes/userRoute')
const order=require('./Routes/orderRoutes')
 app.use(errormiddlaeWare);
app.use("/api/v1", products);
app.use("/api/v1",user);
app.use("/api/v1",order);
 module.exports=app;