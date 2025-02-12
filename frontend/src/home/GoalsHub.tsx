import { useState, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Navbar } from "../components/Navbar"
import { useNavigate } from "react-router-dom"

interface GoalEntry {
  _id: string
  title: string
  isGoal: boolean
}

export const GoalsHub = () => {
  const navigate = useNavigate()
  const [goals, setGoals] = useState<GoalEntry[]>([])
  const [activeTab, setActiveTab] = useState<"ideas" | "goals">("ideas")

  useEffect(() => {
    // Daten aus der API abrufen
    fetch("http://localhost:5001/api/goals")
      .then((res) => res.json())
      .then((data) => setGoals(data))
  }, [])

  function markAsGoal(id: string) {
    fetch(`http://localhost:5001/api/goals/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isGoal: true })
    })
      .then(() => setGoals(goals.map((goal) =>
        goal._id === id ? { ...goal, isGoal: true } : goal
      )))
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-start pt-16 bg-gradient-to-b from-gray-900 via-blue-900 to-black text-white px-4">
      <Navbar />

      {/* GoalHub Header */}
      <motion.h1
        className="text-5xl font-extrabold mt-4 text-center tracking-wide drop-shadow-lg"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        🚀 <span className="text-sky-400">GoalHub</span>: Your Path to Success
      </motion.h1>

      {/* Reiter für Ideas & Goals */}
      <div className="mt-6 flex space-x-4 bg-gray-800 p-2 rounded-lg">
        <button
          onClick={() => setActiveTab("ideas")}
          className={`px-6 py-2 rounded-md font-semibold transition-all ${
            activeTab === "ideas" ? "bg-sky-400 text-black" : "text-gray-300"
          }`}
        >
          💡 Ideas
        </button>
        <button
          onClick={() => setActiveTab("goals")}
          className={`px-6 py-2 rounded-md font-semibold transition-all ${
            activeTab === "goals" ? "bg-green-400 text-black" : "text-gray-300"
          }`}
        >
          🎯 Goals
        </button>
      </div>

      {/* List of Ideas or Goals */}
      <div className="mt-6 w-full max-w-lg space-y-3">
        <AnimatePresence>
          {goals
            .filter((goal) => (activeTab === "ideas" ? !goal.isGoal : goal.isGoal))
            .map((goal) => (
              <motion.div
                key={goal._id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                whileHover={{ scale: 1.05 }}
                className="bg-gray-700 px-4 py-3 rounded-lg cursor-pointer shadow-md flex justify-between items-center"
              >
                <span onClick={() => navigate(`/goal/${goal._id}`, { state: { goalTitle: goal.title } })}>
                  {goal.title}
                </span>
                {!goal.isGoal && (
                  <button
                    onClick={() => markAsGoal(goal._id)}
                    className="bg-green-500 hover:bg-green-600 px-3 py-1 rounded-lg text-sm font-semibold"
                  >
                    🎯 Mark as Goal
                  </button>
                )}
              </motion.div>
            ))}
        </AnimatePresence>
      </div>
    </div>
  )
}