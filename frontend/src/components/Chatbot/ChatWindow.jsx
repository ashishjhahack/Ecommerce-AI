import { useContext, useState, useRef, useEffect } from "react";
import { ChatContext } from "../../context/ChatContext";
import MessageBubble from "./MessageBubble.jsx";

const ChatWindow = ({ isOpen }) => {
  const { messages, sendMessage, loading } = useContext(ChatContext);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(input);
    setInput("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-20 right-5 w-96 h-96 bg-white shadow-lg rounded-xl flex flex-col">
      {/* Header */}
      <div className="bg-gray-800 text-white p-3 rounded-t-xl font-bold">
        ShopBot 🤖
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {messages.map((msg, idx) => (
          <div key={idx}>
            {/* Normal text bubble */}
            {msg.text && <MessageBubble sender={msg.sender} text={msg.text} />}

            {/* If bot also sends product list */}
            {msg.products && msg.products.length > 0 && (
              <div className="grid grid-cols-2 gap-2 mt-2">
                {msg.products.map((product) => (
                  <div
                    key={product._id}
                    className="border rounded-lg p-2 shadow-sm hover:shadow-md transition"
                  >
                    <img
                      src={product.image?.[0]}
                      alt={product.name}
                      className="w-full h-20 object-cover rounded"
                    />
                    <p className="font-semibold text-sm mt-1">{product.name}</p>
                    <p className="text-gray-600 text-xs">₹{product.price}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
        {loading && <MessageBubble sender="bot" text="Typing..." />}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-2 border-t flex gap-2">
        <input
          type="text"
          className="flex-1 border rounded-lg px-2 py-1 text-sm"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          className="bg-gray-800 text-white px-3 rounded-lg"
          onClick={handleSend}
        >
          ➤
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
