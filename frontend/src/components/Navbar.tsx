import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Lightbulb } from "lucide-react";
import { motion } from "framer-motion";

export const Navbar = () => {
  const navigate = useNavigate();
  const [isProfileOpen, setProfileOpen] = useState(false);
  const [animateBulb] = useState(true);

  return (
    <>
      <div className="fixed top-0 left-0 w-full px-8 py-4 flex items-center justify-between bg-transparent z-50">
        
        <span 
          onClick={() => navigate("/")} 
          className="text-3xl font-medium text-white tracking-wide focus:outline-none cursor-pointer flex items-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={animateBulb ? { opacity: 1, scale: 1.1 } : {}}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative flex items-center"
          >
            <Lightbulb 
              className="text-white drop-shadow-[0_0_25px_rgba(255,255,255,1)]"
              strokeWidth={3} 
              size={40}
            />
            {animateBulb && (
              <motion.div 
                className="absolute inset-0 w-full h-full rounded-full bg-white opacity-50 blur-lg"
                animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              />
            )}
          </motion.div>

          <motion.span 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white ml-1 text-2xl"
          >
            deora
          </motion.span>
        </span>
        <Link to="/ideas" className="text-white text-xl font-semibold">
        🚀 GoalHub
      </Link>

        <button 
          onClick={() => setProfileOpen(true)}
          className="flex items-center cursor-pointer bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg space-x-2 transition-all"
        >
          <FaUserCircle className="w-6 h-6 text-white" />
          <span className="text-white text-sm font-medium">Profile</span>
        </button>
      </div>


      {isProfileOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-md z-[100]">
          <motion.div 
            className="bg-gray-900 p-6 rounded-lg shadow-lg max-w-sm w-full"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-xl font-semibold text-white">Profile</h2>
            <p className="text-gray-400">Manage your account settings here.</p>
            <button 
              onClick={() => setProfileOpen(false)}
              className="mt-4 w-full px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg"
            >
              Close
            </button>
          </motion.div>
        </div>
      )}
    </>
  );
};