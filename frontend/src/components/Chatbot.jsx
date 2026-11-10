
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

import {
  FiMessageCircle,
  FiX,
  FiSend,
  FiTrash2,
  FiMinus,
  FiClock,
  FiPlus
} from "react-icons/fi";

import CHAT_API from "../api/chatAxios";
import "./Chatbot.css";

// ============================================
// DEFAULT GREETING
// ============================================

const initialMessage = {
  role: "assistant",
  text: `Hello! 👋 Welcome to CareerFlow AI.

I'm your personal career assistant. I can help you with resume improvement, interview preparation, technical skills and career guidance.

How can I help you today?`
};

function Chatbot() {
  const location = useLocation();

  // ============================================
  // AUTHENTICATION
  // ============================================

  const [token, setToken] = useState(
    () => localStorage.getItem("token")
  );

  const isLoggedIn = !!token;

  // ============================================
  // CHATBOT STATES
  // ============================================

  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([initialMessage]);
  const [chats, setChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [showHistory, setShowHistory] = useState(false);

  const messagesEndRef = useRef(null);

  // Prevent old API responses from updating another account.
  const requestVersionRef = useRef(0);

  // ============================================
  // ROUTE-BASED CHATBOT VISIBILITY
  // ============================================

  const currentPath =
    location.pathname.replace(/\/+$/, "") || "/";

  const dashboardRoutes = [
    "/candidate-dashboard",
    "/recruiter-dashboard",
    "/admin-dashboard"
  ];

  const shouldShowChatbot =
    dashboardRoutes.includes(currentPath) && isLoggedIn;

  // ============================================
  // API AUTHORIZATION
  // ============================================

  const getAuthConfig = (currentToken) => ({
    headers: {
      Authorization: `Bearer ${currentToken}`
    }
  });

  // ============================================
  // SYNCHRONIZE LOGIN / LOGOUT
  // ============================================

  useEffect(() => {
    const updateAuth = () => {
      setToken(localStorage.getItem("token"));
    };

    window.addEventListener("authChanged", updateAuth);
    window.addEventListener("storage", updateAuth);

    updateAuth();

    return () => {
      window.removeEventListener("authChanged", updateAuth);
      window.removeEventListener("storage", updateAuth);
    };
  }, []);

  // ============================================
  // RESET CHAT WHEN ACCOUNT CHANGES
  // ============================================

  useEffect(() => {
    requestVersionRef.current += 1;

    setIsOpen(false);
    setChats([]);
    setActiveChatId(null);
    setMessages([initialMessage]);
    setMessage("");
    setShowHistory(false);
    setLoading(false);
  }, [token]);

  // ============================================
  // SCROLL TO LATEST MESSAGE
  // ============================================

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth"
    });
  }, [messages, loading]);

  // ============================================
  // HANDLE INVALID / EXPIRED TOKEN
  // ============================================

  const handleUnauthorized = (currentToken) => {
    if (localStorage.getItem("token") !== currentToken) {
      return;
    }

    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");

    window.dispatchEvent(new Event("authChanged"));
  };

  // ============================================
  // LOAD SAVED CHAT HISTORY
  // ============================================

  useEffect(() => {
    if (!isOpen || !isLoggedIn || !token) return;

    let cancelled = false;

    const currentToken = token;
    const currentVersion = requestVersionRef.current;

    const loadChats = async () => {
      try {
        const response = await CHAT_API.get(
          "/chats",
          getAuthConfig(currentToken)
        );

        if (
          cancelled ||
          currentVersion !== requestVersionRef.current ||
          localStorage.getItem("token") !== currentToken
        ) {
          return;
        }

        if (response.data.success) {
          setChats(response.data.chats || []);
        }
      } catch (error) {
        if (cancelled) return;

        console.error("Unable to load chat history:", error);

        if (error.response?.status === 401) {
          handleUnauthorized(currentToken);
        }
      }
    };

    loadChats();

    return () => {
      cancelled = true;
    };
  }, [isOpen, isLoggedIn, token]);

  // ============================================
  // START NEW CONVERSATION
  // ============================================

  const newChat = () => {
    if (loading || !isLoggedIn || !token) return;

    setActiveChatId(null);
    setMessages([initialMessage]);
    setMessage("");
    setShowHistory(false);
  };

  // ============================================
  // OPEN EXISTING CONVERSATION
  // ============================================

  const openChat = async (chatId) => {
    if (loading || !isLoggedIn || !token) return;

    const currentToken = token;
    const currentVersion = requestVersionRef.current;

    try {
      const response = await CHAT_API.get(
        `/chats/${chatId}`,
        getAuthConfig(currentToken)
      );

      if (
        currentVersion !== requestVersionRef.current ||
        localStorage.getItem("token") !== currentToken
      ) {
        return;
      }

      if (response.data.success) {
        const chat = response.data.chat;

        setActiveChatId(chat._id);

        setMessages(
          chat.messages.map((item) => ({
            role: item.role,
            text: item.text
          }))
        );

        setShowHistory(false);
      }
    } catch (error) {
      console.error("Unable to open conversation:", error);

      if (error.response?.status === 401) {
        handleUnauthorized(currentToken);
        return;
      }

      alert(
        error.response?.data?.message ||
        "Unable to open this conversation."
      );
    }
  };

  // ============================================
  // DELETE CONVERSATION
  // ============================================

  const deleteChat = async (chatId) => {
    if (loading || !isLoggedIn || !token) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete this conversation?"
    );

    if (!confirmed) return;

    const currentToken = token;
    const currentVersion = requestVersionRef.current;

    try {
      await CHAT_API.delete(
        `/chats/${chatId}`,
        getAuthConfig(currentToken)
      );

      if (
        currentVersion !== requestVersionRef.current ||
        localStorage.getItem("token") !== currentToken
      ) {
        return;
      }

      setChats((previousChats) =>
        previousChats.filter((chat) => chat._id !== chatId)
      );

      if (activeChatId === chatId) {
        setActiveChatId(null);
        setMessages([initialMessage]);
      }
    } catch (error) {
      console.error("Delete conversation error:", error);

      if (error.response?.status === 401) {
        handleUnauthorized(currentToken);
        return;
      }

      alert(
        error.response?.data?.message ||
        "Unable to delete conversation."
      );
    }
  };

  // ============================================
  // SEND MESSAGE TO GEMINI AI
  // ============================================

  const sendMessage = async (e) => {
    e?.preventDefault();

    const currentToken = localStorage.getItem("token");

    if (!currentToken) {
      setToken(null);
      return;
    }

    if (currentToken !== token) {
      setToken(currentToken);
      return;
    }

    const userMessage = message.trim();

    if (!userMessage || loading) return;

    const currentVersion = requestVersionRef.current;

    const updatedMessages = [
      ...messages,
      {
        role: "user",
        text: userMessage
      }
    ];

    setMessages(updatedMessages);
    setMessage("");
    setLoading(true);

    try {
      const response = await CHAT_API.post(
        "/chat",
        {
          message: userMessage,
          chatId: activeChatId
        },
        getAuthConfig(currentToken)
      );

      if (
        currentVersion !== requestVersionRef.current ||
        localStorage.getItem("token") !== currentToken
      ) {
        return;
      }

      if (!response.data.success) {
        throw new Error(
          response.data.message ||
          "Unable to get AI response."
        );
      }

      setActiveChatId(response.data.chatId);

      setMessages([
        ...updatedMessages,
        {
          role: "assistant",
          text: response.data.reply
        }
      ]);

      // Refresh chat history.
      try {
        const historyResponse = await CHAT_API.get(
          "/chats",
          getAuthConfig(currentToken)
        );

        if (
          currentVersion === requestVersionRef.current &&
          localStorage.getItem("token") === currentToken &&
          historyResponse.data.success
        ) {
          setChats(historyResponse.data.chats || []);
        }
      } catch (historyError) {
        console.error(
          "Unable to refresh chat history:",
          historyError
        );

        if (historyError.response?.status === 401) {
          handleUnauthorized(currentToken);
        }
      }
    } catch (error) {
      console.error("Chatbot Error:", error);

      if (
        currentVersion !== requestVersionRef.current ||
        localStorage.getItem("token") !== currentToken
      ) {
        return;
      }

      if (error.response?.status === 401) {
        handleUnauthorized(currentToken);
        return;
      }

      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Sorry, something went wrong. Please try again.";

      setMessages((previousMessages) => [
        ...previousMessages,
        {
          role: "assistant",
          text: errorMessage,
          isError: true
        }
      ]);
    } finally {
      if (currentVersion === requestVersionRef.current) {
        setLoading(false);
      }
    }
  };

  // ============================================
  // ENTER TO SEND MESSAGE
  // SHIFT + ENTER FOR NEW LINE
  // ============================================

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(e);
    }
  };

  // ============================================
  // HIDE CHATBOT OUTSIDE AUTHENTICATED DASHBOARDS
  // ============================================

  if (!shouldShowChatbot) {
    return null;
  }

  // ============================================
  // CHATBOT UI
  // ============================================

  return (
    <div className="career-chatbot">

      {/* FLOATING CHATBOT ICON */}

      {!isOpen && (
        <button
          className="chatbot-toggle"
          onClick={() => setIsOpen(true)}
          aria-label="Open CareerFlow AI"
          title="Chat with CareerFlow AI"
        >
          <FiMessageCircle />
          <span className="chatbot-notification"></span>
        </button>
      )}

      {isOpen && (
        <div className="chatbot-window">

          {/* HEADER */}

          <div className="chatbot-header">

            <div className="chatbot-brand">
              <div className="chatbot-avatar">✨</div>

              <div>
                <h3>CareerFlow AI</h3>

                <span>
                  <span className="online-dot"></span>
                  Your career assistant
                </span>
              </div>
            </div>

            <div className="chatbot-actions">

              <button
                onClick={newChat}
                disabled={loading}
                title="New conversation"
                aria-label="New conversation"
              >
                <FiPlus />
              </button>

              <button
                onClick={() =>
                  setShowHistory((previous) => !previous)
                }
                disabled={loading}
                title="Chat history"
                aria-label="Chat history"
              >
                <FiClock />
              </button>

              <button
                onClick={() => setIsOpen(false)}
                title="Minimize chat"
                aria-label="Minimize chat"
              >
                <FiMinus />
              </button>

              <button
                onClick={() => setIsOpen(false)}
                title="Close chat"
                aria-label="Close chat"
              >
                <FiX />
              </button>

            </div>
          </div>

          {/* CHAT HISTORY */}

          {showHistory && (
            <div className="chat-history-panel">

              <div className="chat-history-heading">
                <strong>Previous conversations</strong>

                <button
                  onClick={newChat}
                  disabled={loading}
                >
                  <FiPlus /> New chat
                </button>
              </div>

              {chats.length === 0 ? (
                <p className="chat-history-empty">
                  No saved conversations yet.
                </p>
              ) : (
                chats.map((chat) => (
                  <div
                    className={`chat-history-item ${
                      activeChatId === chat._id ? "active" : ""
                    }`}
                    key={chat._id}
                  >
                    <button
                      className="chat-history-title"
                      onClick={() => openChat(chat._id)}
                      disabled={loading}
                    >
                      {chat.title}
                    </button>

                    <button
                      className="chat-history-delete"
                      onClick={() => deleteChat(chat._id)}
                      disabled={loading}
                      title="Delete conversation"
                      aria-label="Delete conversation"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                ))
              )}

            </div>
          )}

          {/* MESSAGES */}

          <div className="chatbot-messages">

            <div className="chatbot-date">
              CareerFlow AI Assistant
            </div>

            {messages.map((msg, index) => (
              <div
                key={index}
                className={`chat-message ${
                  msg.role === "user"
                    ? "user-message"
                    : "ai-message"
                }`}
              >

                {msg.role === "assistant" && (
                  <div className="message-avatar">✨</div>
                )}

                <div
                  className={`message-content ${
                    msg.isError ? "error-message" : ""
                  }`}
                >
                  {msg.text}
                </div>

              </div>
            ))}

            {/* TYPING INDICATOR */}

            {loading && (
              <div className="chat-message ai-message">
                <div className="message-avatar">✨</div>

                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />

          </div>

          {/* MESSAGE INPUT */}

          <form
            className="chatbot-input-area"
            onSubmit={sendMessage}
          >
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything about your career..."
              rows="1"
              maxLength={4000}
              disabled={loading}
            />

            <button
              type="submit"
              disabled={!message.trim() || loading}
              aria-label="Send message"
            >
              <FiSend />
            </button>
          </form>

          {/* FOOTER */}

          <div className="chatbot-footer">
            Powered by Gemini AI · CareerFlow
          </div>

        </div>
      )}

    </div>
  );
}

export default Chatbot;
