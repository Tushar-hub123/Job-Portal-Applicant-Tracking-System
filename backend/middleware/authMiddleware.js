const jwt = require("jsonwebtoken");
const decoded = jwt.verify(token, process.env.JWT_SECRET);

console.log("DECODED USER:", decoded);   // add this

req.user = decoded;

const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check header exists and starts with Bearer
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not authorized" });
  }

  try {
    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; // contains id and role
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = protect;