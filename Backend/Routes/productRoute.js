const express=require('express');
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails,ReviewProduct } = require('../Controller/productController');
const { isAuthniticationUser, isAutrizeRole } = require('../middleWare/auth');

const router=express.Router();

router.route("/products").get(getAllProducts)
router.route("/createProduct").post(isAuthniticationUser,isAutrizeRole("admin") ,createProduct)
router.route("/update/:id").put(isAuthniticationUser,isAutrizeRole("admin") ,updateProduct)
router.route("/delete/:id").delete(isAuthniticationUser,isAutrizeRole("admin") ,deleteProduct)
router.route("/getProduct/:id").get(getProductDetails)
router.route("/review").put(isAuthniticationUser,ReviewProduct)
module.exports=router;