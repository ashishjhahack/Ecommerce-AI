import { createContext, useState } from "react";
import axios from "axios";

export const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi 👋! I’m your shopping assistant. How can I help you today?" }
  ]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (userMessage) => {
    // Add user message immediately
    setMessages((prev) => [...prev, { sender: "user", text: userMessage }]);
    setLoading(true);

    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
      const res = await axios.post(`${backendUrl}/api/chatbot/chat`, { message: userMessage });

      const { reply, products } = res.data;

      // Add bot reply + products if available
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: reply,
          products: products || [] // attach products array
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Sorry, something went wrong." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ChatContext.Provider value={{ messages, sendMessage, loading }}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;
