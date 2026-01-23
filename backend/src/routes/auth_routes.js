const registerUser=require("../controllers/auth_controller");
const express=require('express');
const router=express.Router();
router.post("/register",registerUser);
module.exports=router;