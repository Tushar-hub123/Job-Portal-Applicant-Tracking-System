const express = require("express");
const multer = require("multer");
const User = require("../models/User");

const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

router.post("/upload-resume/:id", upload.single("resume"), async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { resume: req.file.filename },
    { new: true }
  );

  res.json({ message: "Resume uploaded", user });
});

module.exports = router;