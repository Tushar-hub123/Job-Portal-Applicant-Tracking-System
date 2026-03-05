const Application = require("../models/Application");
const Job = require("../models/Job");

// Candidate Apply Job
exports.applyJob = async (req, res) => {

  try {

    const { jobId } = req.body;

    const existing = await Application.findOne({
      job: jobId,
      candidate: req.user.id
    });

    if (existing) {
      return res.status(400).json({ message: "Already applied" });
    }

    const application = await Application.create({
      job: jobId,
      candidate: req.user.id,
      resume: req.file.filename
    });

    res.status(201).json({
      message: "Application submitted successfully",
      application
    });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};



// Candidate: My Applications
exports.getMyApplications = async (req, res) => {

  try {

    const apps = await Application.find({
      candidate: req.user.id
    }).populate("job");

    res.json(apps);

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};



// Recruiter: View Applicants
exports.getApplicationsByJob = async (req, res) => {

  try {

    const applications = await Application.find({
      job: req.params.jobId
    })
      .populate("candidate", "name email")
      .populate("job","title");

    res.json(applications);

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};



// Recruiter Update Status
// Recruiter Update Status
exports.updateStatus = async (req, res) => {

  try {

    const { status } = req.body;

    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    // Allow only valid status values
    const validStatus = ["Pending", "Shortlisted", "Rejected", "Selected", "Not Selected"];

    if (!validStatus.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    application.status = status;

    await application.save();

    res.json({
      message: "Status updated successfully",
      application
    });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};