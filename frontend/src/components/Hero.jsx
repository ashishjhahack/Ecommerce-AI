import React, { useEffect, useRef } from "react";
import { ArrowRight } from 'lucide-react';
import gsap from "gsap";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const spanRef = useRef(null);
  const btnRef = useRef(null);

  const navigate = useNavigate();



  // Typing + subtitle animation
  useEffect(() => {
    if (!line1Ref.current || !line2Ref.current || !spanRef.current) return;

    const tl = gsap.timeline();

    // Typing Line 1
    tl.fromTo(
      line1Ref.current,
      { width: "0ch" },
      { width: "16ch", duration: 1.2, ease: "steps(16)" }
    );

    // Typing Line 2
    tl.fromTo(
      line2Ref.current,
      { width: "0ch" },
      { width: "18ch", duration: 1.5, ease: "steps(18)" },
      ">+0.3"
    );

    // Subtitle fade
    tl.fromTo(
      spanRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" },
      ">+0.3"
    );
    
    // Button fade
    tl.fromTo(
      btnRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" },
      ">-.3"
    )
  }, []);

  return (
    <div style={{ height: "500px", position: "relative", overflow: "hidden" }}>


      {/* Hero Text */}
      <div className="relative text-center mt-10 z-10">
        <div className="inline-block relative">
          {/* Line 1 */}
          <h1
            ref={line1Ref}
            className="text-7xl py-4 font-bold text-gray-800
 
                       overflow-hidden whitespace-nowrap mx-auto mb-0 
                       font-mono "
            style={{ width: "0ch" }}
          >
            Shop Sustainably,
          </h1>

          {/* Line 2 */}
          <h1
            ref={line2Ref}
            className="text-7xl py-4 font-bold text-gray-800 
                       overflow-hidden whitespace-nowrap mx-auto mb-8 
                       font-mono"
            style={{ width: "0ch" }}
          >
            High Responsibily!
          </h1>
        </div>

        {/* Subtitle */}
        <span ref={spanRef} className="text-gray-500 text-3xl block mt-6">
          Bringing the best products to your doorstep at cheapest price.
          <br />
          Where style meets convenience.
        </span>


        <div ref={btnRef} className="flex justify-center mt-6">
          <button onClick={() => navigate('/collection')} className="flex items-center gap-2 bg-gray-900 border-2 border-black text-white text-2xl px-5 py-2 rounded-2xl hover:bg-black transition-all duration-300 ease-in-out">
            <p>Shop Now</p>
            <ArrowRight />
          </button>
        </div>

      </div>
    </div>
  );
};

export default Hero;
