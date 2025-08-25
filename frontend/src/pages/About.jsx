import React from "react";
import Title from "../components/Title";
import NewsletterBox from "../components/NewsletterBox";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
        <div className="my-10 flex flex-col sm:flex-row gap-16">
          <img className="w-full md:max-w-[450px]" src={assets.about_img} />
          <div className="flex flex-col justify-center gap-6 md:w-1/2 text-gray-600">
            <p>
              We are a dedicated team committed to delivering high-quality products and services to our customers. Our passion drives us to continually innovate and improve.
            </p>
            <p>
              At our core, we believe in creating value through exceptional service and customer satisfaction. Every step we take is aimed at making your experience better.
            </p>

            <b className="text-gray-800">Our Mission</b>
            <p>
              Our mission is to empower our clients by providing solutions that are not only effective but also reliable. We strive to be a trusted partner in your journey to success.
            </p>
          </div>
        </div>
        <div className="text-3xl py-4">
          <Title text1={"WHY"} text2={"CHOOSE US"} />
        </div>
        <div className="flex flex-col sm:flex-row text-sm mb-20">
          <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
            <b>Quality Assurance</b>
            <p className="text-gray-600">
              Our commitment to quality is unwavering. We meticulously check every detail to ensure the highest standards are met in every product we offer.
            </p>
          </div>
          <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
            <b>Convenience</b>
            <p className="text-gray-600">
              We make your experience seamless by offering easy access to our services and products, ensuring you can always count on us when you need it most.
            </p>
          </div>

          <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
            <b>Exceptional Customer Service</b>
            <p className="text-gray-600">
              Our team is here to assist you every step of the way. We pride ourselves on providing friendly, knowledgeable, and prompt support to all our customers.
            </p>
          </div>
        </div>
      </div>

      <NewsletterBox />
    </div>
  );
};

export default About;