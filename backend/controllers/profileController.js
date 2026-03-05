const Profile = require("../models/Profile");

// Create or Update Profile
exports.createOrUpdateProfile = async (req, res) => {
  try {
    const { fullName, skills, education, experience, phone } = req.body;

    const profile = await Profile.findOneAndUpdate(
      { userId: req.user.id },
      {
        fullName,
        skills,
        education,
        experience,
        phone
      },
      { new: true, upsert: true }
    );

    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Get My Profile
exports.getMyProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.user.id });
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};