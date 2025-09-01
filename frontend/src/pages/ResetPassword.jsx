import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { ShopContext } from "@/context/ShopContext";
import { useParams } from 'react-router-dom';
import { toast } from "react-toastify";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { backendUrl, navigate, setToken } = useContext(ShopContext);
  const { token } = useParams();

  const handleReset = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const res = await axios.post(`${backendUrl}/api/user/reset-password/${token}`, { password });
      if (res.data.success) {
        toast.success(res.data.message);

        // 🔥 Save the new token
        setToken(res.data.token);
        localStorage.setItem("token", res.data.token);

        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to reset password. Please try again.");
    }
  };


  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex justify-center items-center mt-30 h-40 bg-gray-50"
    >
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Reset Password
        </h1>

        <form onSubmit={handleReset} className="space-y-4">
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:outline-none"
            required
          />

          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:outline-none"
            required
          />

          <button
            type="submit"
            className="w-full py-2 px-4 bg-gray-900 border-black text-white rounded-lg font-medium hover:bg-black transition-all duration-300 ease-in-out"
          >
            Reset Password
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default ResetPassword;
