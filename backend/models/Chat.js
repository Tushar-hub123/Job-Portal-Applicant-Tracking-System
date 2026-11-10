
// const mongoose = require("mongoose");

// const messageSchema = new mongoose.Schema(
//   {
//     role: {
//       type: String,
//       enum: ["user", "assistant"],
//       required: true
//     },

//     text: {
//       type: String,
//       required: true,
//       maxlength: 4000
//     },

//     createdAt: {
//       type: Date,
//       default: Date.now
//     }
//   },
//   { _id: true }
// );

// const chatSchema = new mongoose.Schema(
//   {
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//       index: true
//     },

//     title: {
//       type: String,
//       default: "New conversation",
//       maxlength: 100
//     },

//     messages: [messageSchema]
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Chat", chatSchema);




const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["user", "assistant"],
      required: true
    },
    text: {
      type: String,
      required: true,
      maxlength: 20000
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  { _id: true }
);

const chatSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },
    title: {
      type: String,
      default: "New conversation",
      maxlength: 100
    },
    messages: {
      type: [messageSchema],
      default: []
    }
  },
  { timestamps: true }
);

// Efficiently retrieve each user's newest conversations
chatSchema.index({ user: 1, updatedAt: -1 });

module.exports = mongoose.model("Chat", chatSchema);
