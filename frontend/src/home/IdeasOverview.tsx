import { useState, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Navbar } from "../components/Navbar"
import { useNavigate } from "react-router-dom"

interface IdeaEntry {
  id: number
  title: string
  isGoal: boolean
}

export const IdeasOverview = () => {
  const navigate = useNavigate()
  const [ideas, setIdeas] = useState<IdeaEntry[]>([])
  const [activeTab, setActiveTab] = useState<"ideas" | "goals">("ideas")

  useEffect(() => {
    // Ideen & Goals aus Local Storage oder API laden
    const storedIdeas = JSON.parse(localStorage.getItem("ideas") || "[]")
    setIdeas(storedIdeas)
  }, [])

  function markAsGoal(id: number) {
    const updatedIdeas = ideas.map((idea) =>
      idea.id === id ? { ...idea, isGoal: true } : idea
    )
    setIdeas(updatedIdeas)
    localStorage.setItem("ideas", JSON.stringify(updatedIdeas))
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
          {ideas
            .filter((idea) => (activeTab === "ideas" ? !idea.isGoal : idea.isGoal))
            .map((idea) => (
              <motion.div
                key={idea.id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                whileHover={{ scale: 1.05 }}
                className="bg-gray-700 px-4 py-3 rounded-lg cursor-pointer shadow-md flex justify-between items-center"
              >
                <span onClick={() => navigate(`/dream/${idea.id}`, { state: { dreamTitle: idea.title } })}>
                  {idea.title}
                </span>
                {!idea.isGoal && (
                  <button
                    onClick={() => markAsGoal(idea.id)}
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