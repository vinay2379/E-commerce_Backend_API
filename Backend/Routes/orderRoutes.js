const express=require('express');
const { orderProduct, singleOrderProduct, allOrderProduct, allOrderProductByAdmin, updateOrderProduct, deleteProduct }=require('../Controller/orderController');
const { isAuthniticationUser, isAutrizeRole } = require('../middleWare/auth');
const router=express.Router();
router.route("/orderCreate").post( isAuthniticationUser, orderProduct);
router.route("/singleOrder/:id").get(isAuthniticationUser,singleOrderProduct)
router.route("/allOrder").get(isAuthniticationUser,allOrderProduct)
router.route("/getOrderByAdmin").get(isAuthniticationUser,isAutrizeRole("admin"),allOrderProductByAdmin)
router.route("/updateOrderByAdmin/:id").put(isAuthniticationUser,isAutrizeRole("admin"),updateOrderProduct)
router.route("/deleteyAdmin/:id").delete(isAuthniticationUser,isAutrizeRole("admin"),deleteProduct)

module.exports=router;