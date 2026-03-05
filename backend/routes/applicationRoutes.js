const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const multer = require("multer");

const {
  applyJob,
  getMyApplications,
  getApplicationsByJob,
  updateStatus
} = require("../controllers/applicationController");



// Resume Upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null,"uploads/");
  },
  filename: (req,file,cb)=>{
    cb(null,Date.now()+"-"+file.originalname);
  }
});

const upload = multer({storage});


// Apply Job
router.post(
  "/apply",
  protect,
  authorize("candidate"),
  upload.single("resume"),
  applyJob
);


// Candidate Applications
router.get(
  "/my-applications",
  protect,
  authorize("candidate"),
  getMyApplications
);


// Recruiter View Applicants
router.get(
  "/job/:jobId",
  protect,
  authorize("recruiter"),
  getApplicationsByJob
);


// Recruiter Update Status
router.put(
  "/status/:id",
  protect,
  authorize("recruiter"),
  updateStatus
);


module.exports = router;