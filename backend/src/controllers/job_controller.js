const Job=require("../models/jobApplications");
const mongoose=require("mongoose")
const createJob=async(req,res,next)=>{
    try{
        const userId=req.user.userId;
        const { company, role, jobLink, jobDescription, status, notes } = req.body;
        if(!company || !role ){
            return res.status(400).json({message:"Fill out all required fields"});
        }
        const job = await Job.create({
        user: userId,
        company,
        role,
        jobLink,
        jobDescription,
        status,
        notes,
        });
        return res.status(201).json(job);
    }
    catch(err){
        return next(err);
    }
}
const getJob=async(req,res,next)=>{
    try{
        const userId = req.user.userId;
        const jobs = await Job.find({ user: userId }).sort({ createdAt: -1 });
         return res.status(200).json(jobs);
    }
    catch(err){
        return next(err);
    }
}
const getJobById=async (req,res,next)=>{
    try{
        const jobId=req.params.id;
        const userId=req.user.userId;
        if (!mongoose.Types.ObjectId.isValid(jobId)) {
        return res.status(400).json({ message: "Invalid job id" });
        }
      const job = await Job.findOne({ _id: jobId, user: userId });
       if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    return res.status(200).json(job);
    
    }
    catch(err){
        return next(err);
    }
}
module.exports={createJob,getJob,getJobById};