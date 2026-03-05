const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const {
  createJob,
  getMyJobs,
  deleteJob,
  getAllJobs
} = require("../controllers/jobController");


// Recruiter Create Job
router.post(
  "/create",
  protect,
  authorize("recruiter"),
  createJob
);

// Recruiter My Jobs
router.get(
  "/my-jobs",
  protect,
  authorize("recruiter"),
  getMyJobs
);

// Delete Job
router.delete(
  "/:id",
  protect,
  authorize("recruiter"),
  deleteJob
);

// Public jobs
router.get("/", getAllJobs);

module.exports = router;