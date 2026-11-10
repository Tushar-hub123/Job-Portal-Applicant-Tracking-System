
const mongoose = require("mongoose");
const Chat = require("../models/Chat");

// ================= GET ALL CHATS =================
exports.getChats = async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(401).json({
        success: false,
        message: "Invalid user authentication."
      });
    }

    const chats = await Chat.find({
      user: userId
    })
      .select("title createdAt updatedAt")
      .sort({ updatedAt: -1 });

    return res.status(200).json({
      success: true,
      chats
    });

  } catch (error) {
    console.error("Get Chats Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to load chat history."
    });
  }
};


// ================= GET CHAT BY ID =================
exports.getChatById = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(401).json({
        success: false,
        message: "Invalid user authentication."
      });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid conversation ID."
      });
    }

    const chat = await Chat.findOne({
      _id: id,
      user: userId
    });

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Conversation not found."
      });
    }

    return res.status(200).json({
      success: true,
      chat
    });

  } catch (error) {
    console.error("Get Chat Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to open conversation."
    });
  }
};


// ================= DELETE CHAT =================
exports.deleteChat = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(401).json({
        success: false,
        message: "Invalid user authentication."
      });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid conversation ID."
      });
    }

    const chat = await Chat.findOneAndDelete({
      _id: id,
      user: userId
    });

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Conversation not found."
      });
    }

    return res.status(200).json({
      success: true,
      message: "Conversation deleted successfully."
    });

  } catch (error) {
    console.error("Delete Chat Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to delete conversation."
    });
  }
};
