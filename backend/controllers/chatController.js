
const mongoose = require("mongoose");
const Chat = require("../models/Chat");

// ================= GEMINI INITIALIZATION =================

let aiPromise = null;

const getAI = async () => {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error(
      "GEMINI_API_KEY is missing in backend .env"
    );
  }

  if (!aiPromise) {
    aiPromise = import("@google/genai").then(
      ({ GoogleGenAI }) => {
        return new GoogleGenAI({
          apiKey: process.env.GEMINI_API_KEY
        });
      }
    ).catch((error) => {
      aiPromise = null;
      throw error;
    });
  }

  return aiPromise;
};


// ================= DELAY FUNCTION =================

const delay = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));


// ================= GENERATE GEMINI RESPONSE =================

const generateWithRetry = async (ai, contents) => {
  const maxAttempts = 3;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash-lite",

        contents,

        config: {
          systemInstruction: `
You are CareerFlow AI, a helpful career assistant
inside a job portal.

You help users with:

1. Resume improvement and analysis.
2. Job opportunities and job matching.
3. Interview preparation.
4. Technical skills and career guidance.
5. Professional communication.
6. Career development.

Give clear, practical and beginner-friendly answers.
Use examples whenever helpful.

Do not guarantee job selection or hiring.
          `
        }
      });

      return response;

    } catch (error) {
      const status = Number(
        error.status ||
        error.response?.status
      );

      const temporaryErrors = [500, 502, 503, 504];

      if (
        temporaryErrors.includes(status) &&
        attempt < maxAttempts
      ) {
        console.log(
          `Gemini temporary error ${status}. Retrying...`
        );

        await delay(attempt * 3000);

        continue;
      }

      throw error;
    }
  }

  throw new Error("Unable to generate AI response.");
};


// ================= CHAT WITH GEMINI =================

exports.chatWithAI = async (req, res) => {
  try {

    // STEP 1: CHECK AUTHENTICATED USER

    const userId = req.user?.id;

    if (
      !userId ||
      !mongoose.Types.ObjectId.isValid(userId)
    ) {
      return res.status(401).json({
        success: false,
        message: "Invalid authentication. Please log in again."
      });
    }


    // STEP 2: GET MESSAGE AND CHAT ID

    const { message, chatId } = req.body;

    if (
      typeof message !== "string" ||
      !message.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Please enter a message."
      });
    }

    const userMessage = message.trim();

    if (userMessage.length > 4000) {
      return res.status(400).json({
        success: false,
        message: "Message cannot exceed 4000 characters."
      });
    }


    // STEP 3: FIND EXISTING CONVERSATION

    let chat = null;

    if (chatId) {

      if (!mongoose.Types.ObjectId.isValid(chatId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid conversation ID."
        });
      }

      chat = await Chat.findOne({
        _id: chatId,
        user: userId
      });

      if (!chat) {
        return res.status(404).json({
          success: false,
          message: "Conversation not found."
        });
      }
    }


    // STEP 4: GET PREVIOUS MESSAGES

    const previousMessages = chat
      ? chat.messages.slice(-12)
      : [];

    const contents = previousMessages.map((item) => ({
      role: item.role === "assistant" ? "model" : "user",

      parts: [
        {
          text: item.text
        }
      ]
    }));


    // Add current user message

    contents.push({
      role: "user",

      parts: [
        {
          text: userMessage
        }
      ]
    });


    // STEP 5: GENERATE AI RESPONSE

    const ai = await getAI();

    const response = await generateWithRetry(
      ai,
      contents
    );

    const aiReply = response.text;

    if (
      typeof aiReply !== "string" ||
      !aiReply.trim()
    ) {
      throw new Error(
        "Gemini returned an empty response."
      );
    }


    // STEP 6: CREATE NEW CHAT IF REQUIRED

    if (!chat) {

      const title =
        userMessage.length > 60
          ? userMessage.substring(0, 57) + "..."
          : userMessage;

      chat = new Chat({
        user: userId,
        title,
        messages: []
      });
    }


    // STEP 7: SAVE USER AND AI MESSAGES

    chat.messages.push(
      {
        role: "user",
        text: userMessage
      },
      {
        role: "assistant",
        text: aiReply
      }
    );

    await chat.save();


    // STEP 8: SEND RESPONSE TO FRONTEND

    return res.status(200).json({
      success: true,
      reply: aiReply,
      chatId: chat._id,
      title: chat.title
    });

  } catch (error) {

    console.error("Gemini Chat Error:", error);

    const status = Number(
      error.status ||
      error.response?.status
    );

    if (status === 429) {
      return res.status(429).json({
        success: false,
        message: "AI request limit reached. Please try again later."
      });
    }

    if ([500, 502, 503, 504].includes(status)) {
      return res.status(503).json({
        success: false,
        message: "AI service is temporarily unavailable. Please try again."
      });
    }

    if (
      error.message?.includes("GEMINI_API_KEY")
    ) {
      return res.status(500).json({
        success: false,
        message: "Gemini API key is not configured on the server."
      });
    }

    return res.status(500).json({
      success: false,
      message: "Unable to generate AI response. Please try again."
    });
  }
};
