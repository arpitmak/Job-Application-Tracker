const {createJob,getJob,getJobById}=require("../controllers/job_controller");
const protect=require("../middleware/auth_middleware")
const express=require('express');
const router=express.Router();
router.post("/",protect,createJob)
router.get("/",protect,getJob)
router.get("/:id",protect,getJobById)
module.exports=router;