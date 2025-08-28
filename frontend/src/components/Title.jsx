import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import SplitType from "split-type";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Title = ({ text1, text2 }) => {
  const textRef = useRef(null);

  useEffect(() => {
    if (textRef.current) {
      // Split text
      const split = new SplitType(textRef.current, { types: "words, chars" });

      // Animate chars from bottom to top
      gsap.fromTo(
        split.chars,
        {
          y: "100%",
          opacity: 0,
        },
        {
          y: "0%",
          opacity: 1,
          stagger: 0.03,     // it means each char will start animating 0.03s after the previous one
          duration: 0.6,
          ease: "power3.out",   // power3.out means it will start fast and end slowly
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 90%",   // when text is about to come into view
            toggleActions: "play none none reverse",      // it means play the animation when it comes into view, do nothing on leave, do nothing on re-enter, reverse the animation on leave back
          },
        }
      );
    }
  }, []);

  return (
    <div className="inline-flex gap-2 items-center mb-3">
      <p
        ref={textRef}
        className="text-gray-500 overflow-hidden"
      >
        {text1} <span className="text-gray-700 font-medium">{text2}</span>
      </p>
      <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
    </div>
  );
};

export default Title;
