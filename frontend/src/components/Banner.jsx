import React, { useRef, useEffect } from "react";
import { assets } from "../assets/assets";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Banner = () => {
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: leftRef.current, // animation starts when banner enters viewport
        start: "top 80%", // when top of banner hits 80% of viewport
        toggleActions: "play none none reverse", 
        // play on enter, reverse on leave
      },
    });

    tl.fromTo(
      leftRef.current,
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 1.2, ease: "power3.out" }
    ).fromTo(
      rightRef.current,
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 1.2, ease: "power3.out" },
      "-=0.8" // overlap animations
    );
  }, []);

  return (
    <div className="flex flex-col justify-center sm:flex-row border border-gray-300 rounded-lg shadow-md overflow-hidden">
      {/* hero left side */}
      <div
        ref={leftRef}
        className="w-full sm:w-1/2 flex items-center justify-center py-12 sm:py-0 px-6"
      >
        <div className="text-[#414141] max-w-md">
          <div className="flex items-center gap-2 mb-2">
            <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
            <p className="font-medium text-sm md:text-base">OUR BESTSELLERS</p>
          </div>
          <h1 className="text-3xl sm:py-3 lg:text-5xl leading-snug font-bold">
            Latest Arrivals
          </h1>
          <div className="flex items-center gap-2 mt-4 cursor-pointer hover:opacity-80 transition">
            <p className="font-semibold text-base md:text-lg">SHOP NOW</p>
            <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
          </div>
        </div>
      </div>

      {/* hero right side */}
      <img
        ref={rightRef}
        className="w-full sm:w-1/2 object-cover"
        src={assets.hero_img}
        alt="hero"
      />
    </div>
  );
};

export default Banner;
