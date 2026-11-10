
// const express = require("express");
// const router = express.Router();

// const protect = require("../middleware/authMiddleware");
// const { chatWithAI } = require("../controllers/chatController");

// // Every chatbot request requires authentication.
// router.use(protect);

// router.post("/", chatWithAI);

// module.exports = router;



const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const { chatWithAI } = require("../controllers/chatController");

// Every chatbot request requires authentication
router.use(protect);

router.post("/", chatWithAI);

module.exports = router;
