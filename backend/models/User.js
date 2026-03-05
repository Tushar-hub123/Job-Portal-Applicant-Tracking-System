const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: {
    type: String,
    enum: ["admin", "recruiter", "candidate"],
    default: "candidate"
  },
  resume: {
  type: String
},
profile: {
  bio: String,
  skills: String
}
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);