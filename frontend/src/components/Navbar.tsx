import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';

export const Navbar = () => {
  const navigate = useNavigate();
  const [isProfileOpen, setProfileOpen] = useState(false);

  return (
    <>
      <div className="fixed top-0 left-0 w-full px-8 py-4 flex items-center justify-between bg-transparent z-50">
        {/* Ideora Logo */}
        <span 
          onClick={() => navigate('/')} 
          className="text-3xl font-extrabold text-white tracking-wide focus:outline-none cursor-pointer"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500">
            Ideora
          </span>
        </span>

        {/* Profil-Button */}
        <button 
          onClick={() => setProfileOpen(true)}
          className="flex items-center cursor-pointer bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg space-x-2 transition-all"
        >
          <FaUserCircle className="w-6 h-6 text-white" />
          <span className="text-white text-sm font-medium">Profile</span>
        </button>
      </div>

      {/* Sperrendes Profile Modal */}
      {isProfileOpen && (
        <div 
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-md z-[100]"
        >
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