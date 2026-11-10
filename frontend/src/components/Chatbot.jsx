// import { useEffect, useRef, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";

// import {
//   FiMessageCircle,
//   FiX,
//   FiSend,
//   FiTrash2,
//   FiMinus,
//   FiClock,
//   FiPlus
// } from "react-icons/fi";

// import CHAT_API from "../api/chatAxios";
// import "./Chatbot.css";

// // Default greeting for logged-in users
// const initialMessage = {
//   role: "assistant",
//   text: `Hello! 👋 Welcome to CareerFlow AI.

// I'm your personal career assistant. I can help you with resume improvement, interview preparation, technical skills and career guidance.

// How can I help you today?`
// };

// // Exact welcome message for guests
// const guestMessage =
//   "Welcome to CareerFlow AI! I can help you with resume analysis, job opportunities, interview preparation, and career guidance. Please log in to start chatting.";

// function Chatbot() {
//   const location = useLocation();
//   const navigate = useNavigate();

//   // Authentication state
//   const [token, setToken] = useState(
//     () => localStorage.getItem("token")
//   );

//   const isGuest = !token;

//   // Chatbot UI states
//   const [isOpen, setIsOpen] = useState(false);
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   // Conversation states
//   const [messages, setMessages] = useState([initialMessage]);
//   const [chats, setChats] = useState([]);
//   const [activeChatId, setActiveChatId] = useState(null);
//   const [showHistory, setShowHistory] = useState(false);

//   const messagesEndRef = useRef(null);

//   // Hide chatbot on login and register pages
//   const hiddenRoutes = ["/login", "/register"];
//   const shouldHide = hiddenRoutes.includes(location.pathname);

//   // Synchronize authentication with localStorage
//   useEffect(() => {
//     const updateAuth = () => {
//       const currentToken = localStorage.getItem("token");
//       setToken(currentToken);
//     };

//     // Same-tab login/logout changes
//     window.addEventListener("authChanged", updateAuth);

//     // Other-tab login/logout changes
//     window.addEventListener("storage", updateAuth);

//     // Check token after navigation
//     updateAuth();

//     return () => {
//       window.removeEventListener("authChanged", updateAuth);
//       window.removeEventListener("storage", updateAuth);
//     };
//   }, [location.pathname]);

//   // Reset chatbot when authentication changes
//   useEffect(() => {
//     setChats([]);
//     setActiveChatId(null);
//     setMessages([initialMessage]);
//     setMessage("");
//     setShowHistory(false);
//   }, [token]);

//   // Scroll to the latest message
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({
//       behavior: "smooth"
//     });
//   }, [messages, loading]);

//   // Load saved conversations
//   useEffect(() => {
//     if (!isOpen || !token) return;

//     let cancelled = false;

//     const loadChats = async () => {
//       try {
//         const response = await CHAT_API.get("/chats");

//         if (!cancelled && response.data.success) {
//           setChats(response.data.chats || []);
//         }
//       } catch (error) {
//         if (cancelled) return;

//         console.error("Unable to load chat history:", error);

//         if (error.response?.status === 401) {
//           localStorage.removeItem("token");
//           window.dispatchEvent(new Event("authChanged"));
//         }
//       }
//     };

//     loadChats();

//     return () => {
//       cancelled = true;
//     };
//   }, [isOpen, token, location.pathname]);

//   // Start a new conversation
//   const newChat = () => {
//     if (loading || isGuest) return;

//     setActiveChatId(null);
//     setMessages([initialMessage]);
//     setMessage("");
//     setShowHistory(false);
//   };

//   // Open an existing conversation
//   const openChat = async (chatId) => {
//     if (loading || isGuest) return;

//     try {
//       const response = await CHAT_API.get(`/chats/${chatId}`);

//       if (response.data.success) {
//         const chat = response.data.chat;

//         setActiveChatId(chat._id);

//         setMessages(
//           chat.messages.map((item) => ({
//             role: item.role,
//             text: item.text
//           }))
//         );

//         setShowHistory(false);
//       }
//     } catch (error) {
//       console.error("Unable to open conversation:", error);

//       alert(
//         error.response?.data?.message ||
//         "Unable to open this conversation."
//       );
//     }
//   };

//   // Delete an existing conversation
//   const deleteChat = async (chatId) => {
//     if (loading || isGuest) return;

//     const confirmed = window.confirm(
//       "Are you sure you want to delete this conversation?"
//     );

//     if (!confirmed) return;

//     try {
//       await CHAT_API.delete(`/chats/${chatId}`);

//       setChats((previousChats) =>
//         previousChats.filter((chat) => chat._id !== chatId)
//       );

//       if (activeChatId === chatId) {
//         newChat();
//       }
//     } catch (error) {
//       console.error("Delete conversation error:", error);

//       alert(
//         error.response?.data?.message ||
//         "Unable to delete conversation."
//       );
//     }
//   };

//   // Send message to Gemini AI
//   const sendMessage = async (e) => {
//     e?.preventDefault();

//     // Prevent guests from sending messages
//     if (!localStorage.getItem("token")) {
//       navigate("/login");
//       return;
//     }

//     const userMessage = message.trim();

//     if (!userMessage || loading) return;

//     const updatedMessages = [
//       ...messages,
//       {
//         role: "user",
//         text: userMessage
//       }
//     ];

//     setMessages(updatedMessages);
//     setMessage("");
//     setLoading(true);

//     try {
//       const response = await CHAT_API.post("/chat", {
//         message: userMessage,
//         chatId: activeChatId
//       });

//       if (!response.data.success) {
//         throw new Error(
//           response.data.message ||
//           "Unable to get AI response."
//         );
//       }

//       // Save the conversation ID returned by backend
//       setActiveChatId(response.data.chatId);

//       // Display Gemini response
//       setMessages([
//         ...updatedMessages,
//         {
//           role: "assistant",
//           text: response.data.reply
//         }
//       ]);

//       // Refresh saved conversation history
//       try {
//         const historyResponse = await CHAT_API.get("/chats");

//         if (historyResponse.data.success) {
//           setChats(historyResponse.data.chats || []);
//         }
//       } catch (historyError) {
//         console.error(
//           "Unable to refresh chat history:",
//           historyError
//         );
//       }

//     } catch (error) {
//       console.error("Chatbot Error:", error);

//       const errorMessage =
//         error.response?.data?.message ||
//         error.message ||
//         "Sorry, something went wrong. Please try again.";

//       setMessages((previousMessages) => [
//         ...previousMessages,
//         {
//           role: "assistant",
//           text: errorMessage,
//           isError: true
//         }
//       ]);

//       // Invalid or expired token
//       if (error.response?.status === 401) {
//         localStorage.removeItem("token");
//         window.dispatchEvent(new Event("authChanged"));
//       }

//     } finally {
//       setLoading(false);
//     }
//   };

//   // Enter to send; Shift + Enter for a new line
//   const handleKeyDown = (e) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       sendMessage(e);
//     }
//   };

//   // Hide chatbot on Login and Register pages
//   if (shouldHide) return null;

//   return (
//     <div className="career-chatbot">

//       {/* Floating chatbot icon */}
//       {!isOpen && (
//         <button
//           className="chatbot-toggle"
//           onClick={() => setIsOpen(true)}
//           aria-label="Open CareerFlow AI"
//           title="Chat with CareerFlow AI"
//         >
//           <FiMessageCircle />
//           <span className="chatbot-notification"></span>
//         </button>
//       )}

//       {isOpen && (
//         <div className="chatbot-window">

//           {/* Header */}
//           <div className="chatbot-header">

//             <div className="chatbot-brand">
//               <div className="chatbot-avatar">✨</div>

//               <div>
//                 <h3>CareerFlow AI</h3>

//                 <span>
//                   <span className="online-dot"></span>
//                   Your career assistant
//                 </span>
//               </div>
//             </div>

//             <div className="chatbot-actions">

//               {/* Logged-in users only */}
//               {!isGuest && (
//                 <>
//                   <button
//                     onClick={newChat}
//                     disabled={loading}
//                     title="New conversation"
//                     aria-label="New conversation"
//                   >
//                     <FiPlus />
//                   </button>

//                   <button
//                     onClick={() =>
//                       setShowHistory((previous) => !previous)
//                     }
//                     disabled={loading}
//                     title="Chat history"
//                     aria-label="Chat history"
//                   >
//                     <FiClock />
//                   </button>
//                 </>
//               )}

//               <button
//                 onClick={() => setIsOpen(false)}
//                 title="Minimize chat"
//                 aria-label="Minimize chat"
//               >
//                 <FiMinus />
//               </button>

//               <button
//                 onClick={() => setIsOpen(false)}
//                 title="Close chat"
//                 aria-label="Close chat"
//               >
//                 <FiX />
//               </button>

//             </div>
//           </div>

//           {/* Chat history: logged-in users only */}
//           {!isGuest && showHistory && (
//             <div className="chat-history-panel">

//               <div className="chat-history-heading">
//                 <strong>Previous conversations</strong>

//                 <button
//                   onClick={newChat}
//                   disabled={loading}
//                 >
//                   <FiPlus /> New chat
//                 </button>
//               </div>

//               {chats.length === 0 ? (
//                 <p className="chat-history-empty">
//                   No saved conversations yet.
//                 </p>
//               ) : (
//                 chats.map((chat) => (
//                   <div
//                     className={`chat-history-item ${
//                       activeChatId === chat._id ? "active" : ""
//                     }`}
//                     key={chat._id}
//                   >
//                     <button
//                       className="chat-history-title"
//                       onClick={() => openChat(chat._id)}
//                       disabled={loading}
//                     >
//                       {chat.title}
//                     </button>

//                     <button
//                       className="chat-history-delete"
//                       onClick={() => deleteChat(chat._id)}
//                       disabled={loading}
//                       title="Delete conversation"
//                       aria-label="Delete conversation"
//                     >
//                       <FiTrash2 />
//                     </button>
//                   </div>
//                 ))
//               )}

//             </div>
//           )}

//           {/* Messages */}
//           <div className="chatbot-messages">

//             <div className="chatbot-date">
//               CareerFlow AI Assistant
//             </div>

//             {isGuest ? (

//               // Guest welcome message
//               <div className="chat-message ai-message">

//                 <div className="message-avatar">✨</div>

//                 <div className="message-content">
//                   {guestMessage}
//                 </div>

//               </div>

//             ) : (

//               // Logged-in conversation
//               messages.map((msg, index) => (
//                 <div
//                   key={index}
//                   className={`chat-message ${
//                     msg.role === "user"
//                       ? "user-message"
//                       : "ai-message"
//                   }`}
//                 >

//                   {msg.role === "assistant" && (
//                     <div className="message-avatar">✨</div>
//                   )}

//                   <div
//                     className={`message-content ${
//                       msg.isError ? "error-message" : ""
//                     }`}
//                   >
//                     {msg.text}
//                   </div>

//                 </div>
//               ))
//             )}

//             {/* Typing indicator */}
//             {!isGuest && loading && (
//               <div className="chat-message ai-message">

//                 <div className="message-avatar">✨</div>

//                 <div className="typing-indicator">
//                   <span></span>
//                   <span></span>
//                   <span></span>
//                 </div>

//               </div>
//             )}

//             <div ref={messagesEndRef} />

//           </div>

//           {/* Guest login button */}
//           {isGuest ? (

//             <div className="guest-login-panel">

//               <p>
//                 Please log in to start chatting with CareerFlow AI.
//               </p>

//               <button
//                 className="guest-login-button"
//                 onClick={() => {
//                   setIsOpen(false);
//                   navigate("/login");
//                 }}
//               >
//                 Log in to start chatting
//               </button>

//             </div>

//           ) : (

//             // Message input for authenticated users
//             <form
//               className="chatbot-input-area"
//               onSubmit={sendMessage}
//             >

//               <textarea
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)}
//                 onKeyDown={handleKeyDown}
//                 placeholder="Ask me anything about your career..."
//                 rows="1"
//                 maxLength={4000}
//                 disabled={loading}
//               />

//               <button
//                 type="submit"
//                 disabled={!message.trim() || loading}
//                 aria-label="Send message"
//               >
//                 <FiSend />
//               </button>

//             </form>
//           )}

//           {/* Footer */}
//           <div className="chatbot-footer">
//             Powered by Gemini AI · CareerFlow
//           </div>

//         </div>
//       )}

//     </div>
//   );
// }

// export default Chatbot;




import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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

// Default greeting for logged-in users
const initialMessage = {
  role: "assistant",
  text: `Hello! 👋 Welcome to CareerFlow AI.

I'm your personal career assistant. I can help you with resume improvement, interview preparation, technical skills and career guidance.

How can I help you today?`
};

// Exact welcome message for guests
const guestMessage =
  "Welcome to CareerFlow AI! I can help you with resume analysis, job opportunities, interview preparation, and career guidance. Please log in to start chatting.";

function Chatbot() {
  const location = useLocation();
  const navigate = useNavigate();

  // Authentication state
  const [token, setToken] = useState(
    () => localStorage.getItem("token")
  );

  const isGuest = !token;

  // Chatbot UI states
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Conversation states
  const [messages, setMessages] = useState([initialMessage]);
  const [chats, setChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [showHistory, setShowHistory] = useState(false);

  const messagesEndRef = useRef(null);

  // Prevent old requests from updating a newly logged-in account.
  const requestVersionRef = useRef(0);

  // Hide chatbot on login and register pages
 // Hide chatbot on home, login, and register pages
const hiddenRoutes = ["/", "/login", "/register"];

const shouldHide = hiddenRoutes.includes(
  location.pathname.replace(/\/+$/, "") || "/"
);

  // Get Authorization headers for a specific account.
  const getAuthConfig = (currentToken) => ({
    headers: {
      Authorization: `Bearer ${currentToken}`
    }
  });

  // Synchronize authentication with localStorage
  useEffect(() => {
    const updateAuth = () => {
      const currentToken = localStorage.getItem("token");
      setToken(currentToken);
    };

    window.addEventListener("authChanged", updateAuth);
    window.addEventListener("storage", updateAuth);

    updateAuth();

    return () => {
      window.removeEventListener("authChanged", updateAuth);
      window.removeEventListener("storage", updateAuth);
    };
  }, [location.pathname]);

  // Reset chatbot whenever the authenticated account changes.
  useEffect(() => {
    requestVersionRef.current += 1;

    setChats([]);
    setActiveChatId(null);
    setMessages([initialMessage]);
    setMessage("");
    setShowHistory(false);
    setLoading(false);

  }, [token]);

  // Scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth"
    });
  }, [messages, loading]);

  // Handle expired or invalid authentication
  const handleUnauthorized = (currentToken) => {
    if (localStorage.getItem("token") !== currentToken) {
      return;
    }

    localStorage.removeItem("token");
    localStorage.removeItem("role");

    window.dispatchEvent(new Event("authChanged"));
  };

  // Load saved conversations for the current user
  useEffect(() => {
    if (!isOpen || !token) return;

    let cancelled = false;
    const currentVersion = requestVersionRef.current;
    const currentToken = token;

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

  }, [isOpen, token, location.pathname]);

  // Start a new conversation
  const newChat = () => {
    if (loading || isGuest) return;

    setActiveChatId(null);
    setMessages([initialMessage]);
    setMessage("");
    setShowHistory(false);
  };

  // Open an existing conversation
  const openChat = async (chatId) => {
    if (loading || isGuest || !token) return;

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

  // Delete an existing conversation
  const deleteChat = async (chatId) => {
    if (loading || isGuest || !token) return;

    const currentToken = token;
    const currentVersion = requestVersionRef.current;

    const confirmed = window.confirm(
      "Are you sure you want to delete this conversation?"
    );

    if (!confirmed) return;

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

  // Send message to Gemini AI
  const sendMessage = async (e) => {
    e?.preventDefault();

    // Verify current authentication
    const currentToken = localStorage.getItem("token");

    if (!currentToken || currentToken !== token) {
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

      // Ignore responses belonging to a previous account.
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

      // Refresh this user's conversation history.
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

  // Enter to send; Shift + Enter for a new line
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(e);
    }
  };

  // Hide chatbot on Login and Register pages
  if (shouldHide) return null;

  return (
    <div className="career-chatbot">

      {/* Floating chatbot icon */}
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

          {/* Header */}
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

              {!isGuest && (
                <>
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
                </>
              )}

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

          {/* Chat history: logged-in users only */}
          {!isGuest && showHistory && (
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

          {/* Messages */}
          <div className="chatbot-messages">

            <div className="chatbot-date">
              CareerFlow AI Assistant
            </div>

            {isGuest ? (

              <div className="chat-message ai-message">
                <div className="message-avatar">✨</div>

                <div className="message-content">
                  {guestMessage}
                </div>
              </div>

            ) : (

              messages.map((msg, index) => (
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
              ))
            )}

            {/* Typing indicator */}
            {!isGuest && loading && (
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

          {/* Guest login button */}
          {isGuest ? (

            <div className="guest-login-panel">
              <p>
                Please log in to start chatting with CareerFlow AI.
              </p>

              <button
                className="guest-login-button"
                onClick={() => {
                  setIsOpen(false);
                  navigate("/login");
                }}
              >
                Log in to start chatting
              </button>
            </div>

          ) : (

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
          )}

          {/* Footer */}
          <div className="chatbot-footer">
            Powered by Gemini AI · CareerFlow
          </div>

        </div>
      )}

    </div>
    
  );
  
}

export default Chatbot;