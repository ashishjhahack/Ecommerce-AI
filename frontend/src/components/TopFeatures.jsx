import React, { useEffect, useRef } from "react";
import { Bot, SlidersHorizontal, CreditCard } from "lucide-react";
import Title from "./Title";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TopFeatures = () => {
  const cardsRef = useRef([]); // store refs for all cards

  useEffect(() => {
    cardsRef.current.forEach((card, i) => {
      if (!card) return;

      gsap.fromTo(
        card,
        { opacity: 0, y: 50 }, // start hidden + moved down
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: i * 0.2, // small stagger for nicer effect
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%", // when card comes into viewport
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, []);

  const features = [
    {
      icon: <Bot className="w-10 h-10 text-violet-500" />,
      title: "AI Shopping Assistant",
      description:
        "Chat with our smart AI chatbot to get product recommendations, solve queries, and make shopping effortless.",
    },
    {
      icon: <SlidersHorizontal className="w-10 h-10 text-violet-500" />,
      title: "Advanced Sorting & Filtering",
      description:
        "Easily find what you need by sorting products and filtering by categories, subcategories, price, and more.",
    },
    {
      icon: <CreditCard className="w-10 h-10 text-violet-500" />,
      title: "Multiple Payment Methods",
      description:
        "Secure checkout with Razorpay, Stripe, or opt for hassle-free Cash on Delivery at your doorstep.",
    },
  ];

  return (
    <section className="py-12 px-6 md:px-16">
      <div className="text-center mb-10 text-3xl">
        <Title text1={"TOP"} text2={"FEATURES"} className="font-bold" />
      </div>

      <div className="grid gap-8 md:grid-cols-3 sm:grid-cols-2">
        {features.map((feature, index) => (
          <div
            key={index}
            ref={(el) => (cardsRef.current[index] = el)} // save ref for GSAP
            className="flex flex-col items-center text-center bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition-all duration-300 ease-in-out"
          >
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600 text-sm">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopFeatures;
