
// const express = require("express");
// const router = express.Router();

// const protect = require("../middleware/authMiddleware");

// const {
//   getChats,
//   getChatById,
//   deleteChat
// } = require("../controllers/chatHistoryController");

// // Protect all chat-history routes.
// router.use(protect);

// router.get("/", getChats);
// router.get("/:id", getChatById);
// router.delete("/:id", deleteChat);

// module.exports = router;



const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  getChats,
  getChatById,
  deleteChat
} = require("../controllers/chatHistoryController");

// Every history request requires authentication
router.use(protect);

router.get("/", getChats);
router.get("/:id", getChatById);
router.delete("/:id", deleteChat);

module.exports = router;
