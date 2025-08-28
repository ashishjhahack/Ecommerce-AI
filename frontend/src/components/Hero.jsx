import React, { useEffect, useRef } from "react";
import gsap from "gsap";


const Hero = () => {
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const spanRef = useRef(null);

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
  }, []);

  return (
    <div style={{ height: "500px", position: "relative", overflow: "hidden" }}>
      

      {/* Hero Text */}
      <div className="relative text-center mt-10 z-10">
        <div className="inline-block relative">
          {/* Line 1 */}
          <h1
            ref={line1Ref}
            className="text-6xl py-4 font-bold text-gray-800 
                       overflow-hidden whitespace-nowrap mx-auto mb-0 
                       font-mono "
            style={{ width: "0ch" }}
          >
            Shop Sustainably,
          </h1>

          {/* Line 2 */}
          <h1
            ref={line2Ref}
            className="text-6xl py-4 font-bold text-gray-800 
                       overflow-hidden whitespace-nowrap mx-auto mb-8 
                       font-mono"
            style={{ width: "0ch" }}
          >
            High Responsibility!
          </h1>
        </div>

        {/* Subtitle */}
        <span ref={spanRef} className="text-gray-500 text-3xl block mt-6">
          Discover your eco friendly products that reduce your carbon footprint and
          <br />
          contribute to a cleaner planet
        </span>
      </div>
    </div>
  );
};

export default Hero;
