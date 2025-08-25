import { useState } from "react";
import ChatWindow from "./ChatWindow";

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        className="fixed bottom-5 right-5 bg-gray-800 w-30 border-black border-2  text-white p-4 rounded-full cursor-pointer shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        <p className="text-center font-semibold">Ask AI 💬</p>
      </div>
      <ChatWindow isOpen={isOpen} />
    </>
  );
};

export default ChatbotWidget;
