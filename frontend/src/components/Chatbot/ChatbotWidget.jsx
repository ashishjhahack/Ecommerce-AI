import { useRef, useEffect, useState } from "react";
import ChatWindow from "./ChatWindow";
import { gsap } from "gsap";


const ChatbotWidget = () => {

  const AIRef = useRef(null);

  useEffect(() => {
    const t1 = gsap.timeline();
    gsap.fromTo(AIRef.current,
      {scale: 0, opacity: 0},
      {scale: 1,opacity: 1, duration: 2, ease: "power3.out"}
    )

  }, [])

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div ref={AIRef}
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
