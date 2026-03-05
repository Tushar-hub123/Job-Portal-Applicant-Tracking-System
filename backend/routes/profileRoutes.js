const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const {
  createOrUpdateProfile,
  getMyProfile
} = require("../controllers/profileController");

// Candidate only
router.post("/", protect, authorize("candidate"), createOrUpdateProfile);
router.get("/me", protect, authorize("candidate"), getMyProfile);

module.exports = router;