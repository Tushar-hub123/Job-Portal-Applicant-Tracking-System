
// const jwt = require("jsonwebtoken");
// const mongoose = require("mongoose");

// const protect = (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.status(401).json({
//       message: "Not authorized. Please log in."
//     });
//   }

//   try {
//     const token = authHeader.split(" ")[1];

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     // Ensure the token contains a valid MongoDB user ID.
//     if (
//       !decoded.id ||
//       !mongoose.Types.ObjectId.isValid(decoded.id)
//     ) {
//       return res.status(401).json({
//         message: "Invalid user ID in token. Please log in again."
//       });
//     }

//     req.user = {
//       id: decoded.id,
//       role: decoded.role
//     };

//     next();

//   } catch (error) {
//     return res.status(401).json({
//       message: "Invalid or expired token. Please log in again."
//     });
//   }
// };

// module.exports = protect;




const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check whether the Authorization header exists.
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Not authorized. Please log in."
    });
  }

  try {
    const token = authHeader.split(" ")[1];

    // Verify JWT token.
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Validate MongoDB user ID.
    if (
      !decoded.id ||
      !mongoose.Types.ObjectId.isValid(decoded.id)
    ) {
      return res.status(401).json({
        success: false,
        message: "Invalid user ID. Please log in again."
      });
    }

    // Attach authenticated user's unique ID to request.
    req.user = {
      id: decoded.id,
      role: decoded.role
    };

    next();

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token. Please log in again."
    });
  }
};

module.exports = protect;
