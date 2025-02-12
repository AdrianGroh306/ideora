import { useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaGlobe, FaLock, FaArrowLeft } from 'react-icons/fa'
import { Navbar } from '../components/Navbar'

export const DreamView = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const dreamTitle = location.state?.dreamTitle || "Your Dream"

  const [visibility, setVisibility] = useState<'private' | 'public'>('private')
  const [buddy, setBuddy] = useState<string | null>(null)
  const [buddyAccepted, setBuddyAccepted] = useState(false)

  function toggleVisibility() {
    setVisibility(visibility === 'private' ? 'public' : 'private')
  }

  function assignRandomBuddy() {
    const buddyNames = ["Alex", "Jordan", "Casey", "Taylor", "Morgan"]
    setBuddy(buddyNames[Math.floor(Math.random() * buddyNames.length)])
    setBuddyAccepted(false)
  }

  function acceptBuddy() {
    setBuddyAccepted(true)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-start pt-20 bg-gradient-to-b from-gray-900 via-blue-900 to-black text-white px-4 relative">

      <Navbar />
      
      {/* Zurück zur Übersicht */}
      <motion.button
        onClick={() => navigate('/ideas')}
        className="absolute top-16 left-4 flex items-center px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-all"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <FaArrowLeft className="w-5 h-5 text-gray-400 mr-2" />
        <span className="text-white">All Ideas</span>
      </motion.button>

      <motion.div
        className="w-full max-w-4xl grid grid-cols-7 gap-4 items-start mt-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="col-start-2 col-span-5 text-5xl p-2 font-bold text-left bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-500 drop-shadow-md">
          {dreamTitle}
        </h1>
        <div className="col-start-7 flex pt-6 items-center justify-end">
          <button
            onClick={toggleVisibility}
            className="flex items-center px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-all space-x-2"
          >
            {visibility === 'public' ? <FaGlobe className="w-5 h-5 text-blue-400" /> : <FaLock className="w-5 h-5 text-gray-400" />}
            <span className="text-white text-sm">{visibility === 'public' ? "Public" : "Private"}</span>
          </button>
        </div>
      </motion.div>

      <motion.div
        className="mt-4 w-full max-w-lg"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h2 className="text-2xl font-semibold text-blue-400">Dream Buddy</h2>
        {buddy ? (
          <div className="flex flex-col space-y-2">
            <p className="text-gray-300">Your Dream Buddy: <span className="text-pink-400 font-semibold">{buddy}</span></p>
            {!buddyAccepted ? (
              <button
                onClick={acceptBuddy}
                className="mt-2 px-6 py-2 bg-green-600 hover:bg-green-700 rounded-lg font-semibold"
              >
                Accept Buddy Request
              </button>
            ) : (
              <p className="text-green-400">✅ Buddy Accepted</p>
            )}
          </div>
        ) : (
          <button
            onClick={assignRandomBuddy}
            className="mt-3 px-6 py-2 bg-green-600 hover:bg-green-700 rounded-lg font-semibold"
          >
            Get a Random Buddy
          </button>
        )}
      </motion.div>

      <motion.div
        className="mt-4 w-full max-w-lg"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h2 className="text-2xl font-semibold text-pink-400">🚀 Action Plan</h2>
        <ul className="mt-3 space-y-2">
          <motion.li
            className="px-4 py-2 bg-gray-800 rounded-lg flex items-center"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            <input type="checkbox" className="mr-2" />
            Define your first step
          </motion.li>
          <motion.li
            className="px-4 py-2 bg-gray-800 rounded-lg flex items-center"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.6 }}
          >
            <input type="checkbox" className="mr-2" />
            Set a deadline for your first milestone
          </motion.li>
        </ul>
      </motion.div>

    </div>
  )
}