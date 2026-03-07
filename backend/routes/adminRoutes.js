const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const {
  getAllUsers,
  approveRecruiter,
  blockRecruiter,
  getAllJobs,
  getAllApplications
} = require("../controllers/adminController");


// All users
router.get(
  "/users",
  protect,
  authorize("admin"),
  getAllUsers
);


// approve recruiter
router.put(
  "/approve/:id",
  protect,
  authorize("admin"),
  approveRecruiter
);


// block recruiter
router.put(
  "/block/:id",
  protect,
  authorize("admin"),
  blockRecruiter
);


// all jobs
router.get(
  "/jobs",
  protect,
  authorize("admin"),
  getAllJobs
);


// all applications
router.get(
  "/applications",
  protect,
  authorize("admin"),
  getAllApplications
);


module.exports = router;