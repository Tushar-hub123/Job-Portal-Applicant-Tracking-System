const User = require("../models/User");
const Job = require("../models/Job");
const Application = require("../models/Application");


// Get all users
exports.getAllUsers = async (req,res)=>{
  try{

    const users = await User.find().select("-password");

    res.json(users);

  }catch(error){

    console.log(error);
    res.status(500).json({message:"Server Error"});

  }
};



// Approve recruiter
exports.approveRecruiter = async (req,res)=>{

  try{

    const recruiter = await User.findByIdAndUpdate(
      req.params.id,
      { approved:true },
      { new:true }
    );

    if(!recruiter){
      return res.status(404).json({message:"Recruiter not found"});
    }

    res.json({
      message:"Recruiter approved",
      recruiter
    });

  }catch(error){

    console.log(error);
    res.status(500).json({message:"Server Error"});

  }

};



// Block recruiter
exports.blockRecruiter = async (req,res)=>{

  try{

    const recruiter = await User.findByIdAndUpdate(
      req.params.id,
      { approved:false },
      { new:true }
    );

    if(!recruiter){
      return res.status(404).json({message:"Recruiter not found"});
    }

    res.json({
      message:"Recruiter blocked",
      recruiter
    });

  }catch(error){

    console.log(error);
    res.status(500).json({message:"Server Error"});

  }

};



// Get all jobs
exports.getAllJobs = async (req,res)=>{

  try{

    const jobs = await Job.find()
    .populate("recruiter","name email");

    res.json(jobs);

  }catch(error){

    console.log(error);
    res.status(500).json({message:"Server Error"});

  }

};



// Get all applications
exports.getAllApplications = async (req,res)=>{

  try{

    const applications = await Application.find()
    .populate("candidate","name email")
    .populate("job","title company");

    res.json(applications);

  }catch(error){

    console.log(error);
    res.status(500).json({message:"Server Error"});

  }

};