const Job = require("../models/Job");
const User = require("../models/User");


// ================= CREATE JOB =================

exports.createJob = async (req, res) => {
  try {

    const recruiter = await User.findById(req.user.id);

    if (!recruiter) {
      return res.status(404).json({
        message: "Recruiter not found"
      });
    }

    // Check admin approval
    if (!recruiter.approved) {
      return res.status(403).json({
        message: "Admin has not approved you yet"
      });
    }

    const job = await Job.create({
      title: req.body.title,
      company: req.body.company,
      location: req.body.location,
      description: req.body.description,
      skills: req.body.skills,
      qualification: req.body.qualification,
      experience: req.body.experience,
      recruiter: req.user.id
    });

    res.status(201).json(job);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error"
    });

  }
};



// ================= GET MY JOBS =================

exports.getMyJobs = async (req, res) => {

  try {

    const jobs = await Job.find({
      recruiter: req.user.id
    });

    res.json(jobs);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });

  }

};



// ================= DELETE JOB =================

exports.deleteJob = async (req, res) => {

  try {

    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        message: "Job not found"
      });
    }

    // Only owner recruiter can delete
    if (job.recruiter.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Not authorized to delete this job"
      });
    }

    await job.deleteOne();

    res.json({
      message: "Job Deleted Successfully"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });

  }

};



// ================= GET ALL JOBS =================

exports.getAllJobs = async (req, res) => {

  try {

    const jobs = await Job.find()
      .populate("recruiter", "name email");

    res.json(jobs);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });

  }

};