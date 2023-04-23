const express=require('express');
const { registerUser, loginUser, logOut, forgetPassword, getUserDetails, UpdatePassword, updateProfile, getallUser, getSingleUser, updateRole, deleteUserProfile } = require('../Controller/userController');
const { isAuthniticationUser, isAutrizeRole } = require('../middleWare/auth');
const router=express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser)
router.route("/logout").get(logOut)
router.route("/password/forget").post(forgetPassword)
router.route("/userDetails").get(isAuthniticationUser,getUserDetails)
router.route("/updatePassword").put(isAuthniticationUser,UpdatePassword)
router.route("/updateProfile").put(isAuthniticationUser,updateProfile)
router.route("/getAllUser/admin").get(isAuthniticationUser,isAutrizeRole("admin"),getallUser)
router.route("/getSingleUser/:id").get(isAuthniticationUser,isAutrizeRole("admin"),getSingleUser)
router.route("/updateUserRole/:id").put(isAuthniticationUser,isAutrizeRole("admin"),updateRole)
router.route("/deleteUser/:id").delete(isAuthniticationUser,isAutrizeRole("admin"),deleteUserProfile)
module.exports=router;