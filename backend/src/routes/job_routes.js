const {createJob,getJobs,getJobById,updateJob,deleteJob,updateJobStatus,getJobStats}=require("../controllers/job_controller");
const protect=require("../middleware/auth_middleware")
const express=require('express');
const router=express.Router();
router.post("/",protect,createJob)
router.get("/",protect,getJobs)
router.get("/stats",protect,getJobStats)
router.get("/:id",protect,getJobById)
router.patch("/:id",protect,updateJob);
router.delete("/:id",protect,deleteJob);
router.patch("/:id/status",protect,updateJobStatus);
module.exports=router;