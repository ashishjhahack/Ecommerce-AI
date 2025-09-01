import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { ShopContext } from "@/context/ShopContext";
import { toast } from "react-toastify";


const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { backendUrl, navigate } = useContext(ShopContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(`${backendUrl}/api/user/forgot-password`, { email });
      if(res.data.success){
        const resetToken = res.data.token
        navigate(`/reset-password/${resetToken}`); // ✅ navigate to reset page
      }
      else{
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex justify-center mt-30 h-40 bg-gray-50"
    >
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6">
        <h1 className="text-2xl font-bold text-gray-800 px-25 mb-4">
          Forgot Password
        </h1>
        <p className="text-gray-500 mb-6">
          Enter your email to reset your password.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:outline-none"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-gray-900 text-white rounded-lg font-medium hover:bg-black transition-all duration-300 ease-in-out disabled:opacity-50"
          >
            {loading ? "Sending..." : "Submit"}
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default ForgotPassword;
