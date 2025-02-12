import { useState, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Navbar } from "../components/Navbar"
import { useNavigate } from "react-router-dom"

export const HomeView = () => {
  const navigate = useNavigate()
  const [inputValue, setInputValue] = useState("")
  const [progress, setProgress] = useState(0)
  const [typing, setTyping] = useState(false)
  const [inspirationText, setInspirationText] = useState<string | null>(null)

  useEffect(() => {
    if (!typing && progress > 0 && progress < 100) {
      const interval = setInterval(() => {
        setProgress((prev) => Math.min(100, prev + 10))
      }, 50)
      return () => clearInterval(interval)
    }
  }, [typing, progress])

  function addIdea() {
    if (inputValue.trim()) {
      const newIdea = { id: Date.now(), title: inputValue.trim() }
      setInputValue("")
      setProgress(0)

      // Direkt zur DreamView navigieren
      navigate(`/dream/${newIdea.id}`, { state: { dreamTitle: newIdea.title } })
    }
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value
    setInputValue(value)
    setProgress(Math.min(100, (value.length / 20) * 100))
    setTyping(true)
    setTimeout(() => setTyping(false), 500)
  }

  function showRandomInspiration() {
    const inspirationPool = [
      "Dream big. Start small. Act now.",
      "An idea is just the beginning. Take action!",
      "Your imagination is limitless, your execution shouldn’t be.",
      "Find a problem, create a solution, change the world.",
      "Small steps lead to big achievements.",
      "The best way to predict the future is to create it."
    ]
    const randomIndex = Math.floor(Math.random() * inspirationPool.length)
    setInspirationText(inspirationPool[randomIndex])
    setTimeout(() => setInspirationText(null), 8000) // 8 Sekunden sichtbar
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 via-blue-900 to-black text-white px-4">
      <Navbar />

      {/* Hero Section */}
      <motion.h1
        className="text-6xl font-extrabold mb-4 text-center tracking-wide drop-shadow-lg"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        Bring Your <span className="text-sky-400">Dreams</span> to Life
      </motion.h1>

      <motion.p
        className="mt-4 text-lg text-gray-300 max-w-2xl text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
      >
        Ideora helps you collect, organize, and achieve your biggest ideas.
      </motion.p>

      {/* Input Section mit Fortschrittsbalken */}
      <div className="relative w-full max-w-lg flex mt-6">
        <div className="flex-grow relative">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="What’s your idea?"
            className="w-full px-4 py-3 bg-gray-800 text-white rounded-l-lg focus:outline-none"
          />
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-700 rounded-bl-lg">
            <motion.div
              className="h-full bg-white rounded-bl-lg"
              style={{ width: `${progress}%` }}
              animate={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Button zum Hinzufügen einer Idee */}
        <motion.button
          onClick={addIdea}
          disabled={progress < 100}
          whileHover={{ scale: progress >= 100 ? 1.05 : 1 }}
          whileTap={{ scale: 0.95 }}
          className={`px-5 py-3 font-semibold rounded-r-lg transition-all ${
            progress >= 100 ? "bg-white text-sky-400" : "bg-gray-600 text-gray-400"
          }`}
        >
          →
        </motion.button>
      </div>

      {/* Button für Inspiration */}
      <motion.button
        onClick={showRandomInspiration}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 px-5 py-2 bg-sky-400 hover:opacity-75 rounded-lg font-semibold shadow-lg"
      >
        ✨
      </motion.button>

      {/* Pop-Up für Inspiration */}
      <AnimatePresence>
        {inspirationText && (
          <motion.div
            className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 text-white px-6 py-3 rounded-lg shadow-lg z-50"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 60 }}
          >
            {inspirationText}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}