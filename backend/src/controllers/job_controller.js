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
const getJobs = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const { page, limit, status,search } = req.query;
    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.min(50, Math.max(1, parseInt(limit, 10) || 10));
    const skip = (pageNum - 1) * limitNum;

    const filter = { user: userId };

    if (status) {
      filter.status = status; 
    }
    if (search && search.trim()) {
    const term = search.trim();
    filter.$or = [
        { company: { $regex: term, $options: "i" } },
        { role: { $regex: term, $options: "i" } },
  ];
}
    const total = await Job.countDocuments(filter);

    
    const jobs = await Job.find(filter)
      .sort({ createdAt: -1 }) 
      .skip(skip)
      .limit(limitNum);

    
    return res.status(200).json({
      results: jobs,
      page: pageNum,
      limit: limitNum,
      total,
      totalPages: Math.ceil(total / limitNum),
    });
  } catch (err) {
    return next(err);
  }
};
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



const updateJob = async (req, res, next) => {
  try {
    
    const jobId = req.params.id;
    const userId = req.user.userId;

    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      return res.status(400).json({ message: "Invalid job id" });
    }

    const { company, role, jobLink, jobDescription, status, notes } = req.body;

   
    if (!company || !role) {
      return res.status(400).json({ message: "Company and role are required" });
    }

    const updatedJob = await Job.findOneAndUpdate(
      { _id: jobId, user: userId }, 
      { company, role, jobLink, jobDescription, status, notes },
      { new: true, runValidators: true }
    );

    if (!updatedJob) {
      return res.status(404).json({ message: "Job not found" });
    }

    return res.status(200).json(updatedJob);
  } catch (err) {
    return next(err);
  }
};



const deleteJob = async (req, res, next) => {
  try {
    const jobId = req.params.id;
    const userId = req.user.userId;

    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      return res.status(400).json({ message: "Invalid job id" });
    }

    const deletedJob = await Job.findOneAndDelete({
      _id: jobId,
      user: userId,
    });

    if (!deletedJob) {
      return res.status(404).json({ message: "Job not found" });
    }

    return res.status(200).json({ message: "Job deleted successfully" });
  } catch (err) {
    return next(err);
  }
};


module.exports={createJob,getJobs,getJobById,updateJob,deleteJob};