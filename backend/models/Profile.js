const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },
    fullName: String,
    skills: [String],
    education: String,
    experience: String,
    phone: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile", profileSchema);