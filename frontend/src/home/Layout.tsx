import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { motion } from "framer-motion";

export const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-blue-900 to-black text-white">
      <Navbar />
      <div className="pt-20">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4 }}
        >
          <Outlet />
        </motion.div>
      </div>
    </div>
  );
};