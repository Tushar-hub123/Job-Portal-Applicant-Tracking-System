
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Generate JWT token using MongoDB user ID.
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id.toString(),
      role: user.role
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
};

// ================= REGISTER =================
exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required."
      });
    }

    if (role === "admin") {
      return res.status(400).json({
        message: "Admin cannot be registered."
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already registered."
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role === "recruiter" ? "recruiter" : "candidate"
    });

    return res.status(201).json({
      message: "User registered successfully."
    });

  } catch (error) {
    console.error("Register Error:", error);

    return res.status(500).json({
      message: "Server error during registration."
    });
  }
};


// ================= LOGIN =================
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required."
      });
    }

    // ADMIN LOGIN
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      let admin = await User.findOne({ email });

      // Create a real MongoDB admin document if it doesn't exist.
      if (!admin) {
        const hashedPassword = await bcrypt.hash(password, 10);

        admin = await User.create({
          name: "Admin",
          email,
          password: hashedPassword,
          role: "admin",
          approved: true
        });
      }

      // Prevent a normal account from being treated as admin.
      if (admin.role !== "admin") {
        return res.status(409).json({
          message: "This email is already registered with another role."
        });
      }

      const token = generateToken(admin);

      return res.status(200).json({
        token,
        role: admin.role
      });
    }

    // CANDIDATE / RECRUITER LOGIN
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found."
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials."
      });
    }

    const token = generateToken(user);

    return res.status(200).json({
      token,
      role: user.role
    });

  } catch (error) {
    console.error("Login Error:", error);

    return res.status(500).json({
      message: "Server error during login."
    });
  }
};
