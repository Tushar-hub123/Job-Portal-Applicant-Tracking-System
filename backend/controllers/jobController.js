const Job = require("../models/Job");


// CREATE JOB
exports.createJob = async (req,res)=>{

  try{

    const {
      title,
      company,
      location,
      description,
      skills,
      education,
      experience
    } = req.body;

    const job = await Job.create({

      title,
      company,
      location,
      description,
      skills,
      education,
      experience,
      recruiter:req.user.id

    });

    res.status(201).json(job);

  }catch(error){

    res.status(500).json({message:"Server Error"});

  }

};


// GET MY JOBS
exports.getMyJobs = async (req,res)=>{

  try{

    const jobs = await Job.find({
      recruiter:req.user.id
    });

    res.json(jobs);

  }catch(error){

    res.status(500).json({message:"Server Error"});

  }

};


// DELETE JOB
exports.deleteJob = async (req,res)=>{

  try{

    await Job.findByIdAndDelete(req.params.id);

    res.json({message:"Job Deleted"});

  }catch(error){

    res.status(500).json({message:"Server Error"});

  }

};


// GET ALL JOBS
exports.getAllJobs = async (req,res)=>{

  try{

    const jobs = await Job.find();

    res.json(jobs);

  }catch(error){

    res.status(500).json({message:"Server Error"});

  }

};