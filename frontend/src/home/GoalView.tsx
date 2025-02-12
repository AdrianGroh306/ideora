import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { motion } from "framer-motion"
import { FaGlobe, FaLock } from "react-icons/fa"
import { Navbar } from "../components/Navbar"

interface Goal {
  _id: string
  title: string
  visibility: "private" | "public"
  buddy: string | null
  isGoal: boolean
  createdAt: string
}

export const GoalView = () => {
  const location = useLocation()
  const goalId = location.state?.goalId

  const [goal, setGoal] = useState<Goal | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [buddyAccepted, setBuddyAccepted] = useState(false)

  useEffect(() => {
    if (!goalId) {
      setError("Goal ID is missing.")
      setLoading(false)
      return
    }

    fetch(`http://localhost:5001/api/goals/${goalId}`)
      .then((res) => res.json())
      .then((data) => {
        setGoal(data)
        setLoading(false)
      })
      .catch(() => {
        setError("Failed to load goal.")
        setLoading(false)
      })
  }, [goalId])

  function toggleVisibility() {
    if (!goal) return
    const newVisibility = goal.visibility === "private" ? "public" : "private"

    fetch(`http://localhost:5001/api/goals/${goal._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ visibility: newVisibility }),
    })
      .then((res) => res.json())
      .then((updatedGoal) => setGoal(updatedGoal))
  }

  function assignRandomBuddy() {
    if (!goal) return
    const buddyNames = ["Alex", "Jordan", "Casey", "Taylor", "Morgan"]
    const newBuddy = buddyNames[Math.floor(Math.random() * buddyNames.length)]

    fetch(`http://localhost:5001/api/goals/${goal._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ buddy: newBuddy }),
    })
      .then((res) => res.json())
      .then((updatedGoal) => setGoal(updatedGoal))
  }

  function acceptBuddy() {
    setBuddyAccepted(true)
  }

  if (loading) return <p className="text-white">Loading...</p>
  if (error) return <p className="text-red-500">{error}</p>

  return (
    <div className="min-h-screen flex flex-col items-center justify-start pt-20 bg-gradient-to-b from-gray-900 via-blue-900 to-black text-white px-4 relative">
      <Navbar />
      <motion.div
        className="w-full max-w-4xl grid grid-cols-7 gap-4 items-start mt-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="col-start-2 col-span-5 text-5xl p-2 font-bold text-left bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-500 drop-shadow-md">
          {goal?.title || "Goal"}
        </h1>
        <div className="col-start-7 flex pt-6 items-center justify-end">
          <button
            onClick={toggleVisibility}
            className="flex items-center px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-all space-x-2"
          >
            {goal?.visibility === "public" ? (
              <FaGlobe className="w-5 h-5 text-blue-400" />
            ) : (
              <FaLock className="w-5 h-5 text-gray-400" />
            )}
            <span className="text-white text-sm">
              {goal?.visibility === "public" ? "Public" : "Private"}
            </span>
          </button>
        </div>
      </motion.div>

      <motion.div
        className="mt-4 w-full max-w-lg"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h2 className="text-2xl font-semibold text-blue-400">Goal Buddy</h2>
        {goal?.buddy ? (
          <div className="flex flex-col space-y-2">
            <p className="text-gray-300">
              Your Goal Buddy:{" "}
              <span className="text-pink-400 font-semibold">{goal.buddy}</span>
            </p>
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