import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

interface IdeaEntry {
  id: number
  title: string
}

export const HomeView = () => {
  const navigate = useNavigate()
  const [ideas, setIdeas] = useState<IdeaEntry[]>([])
  const [inputValue, setInputValue] = useState('')
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
      const newIdea: IdeaEntry = { id: Date.now(), title: inputValue.trim() }
      setIdeas([...ideas, newIdea])
      setInputValue('')
      setProgress(0)
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
      'Dream big. Start small. Act now.',
      'An idea is just the beginning. Take action!',
      'Your imagination is limitless, your execution shouldn’t be.',
      'Find a problem, create a solution, change the world.',
      'Small steps lead to big achievements.',
      'The best way to predict the future is to create it.'
    ]
    const randomIndex = Math.floor(Math.random() * inspirationPool.length)
    setInspirationText(inspirationPool[randomIndex])
    setTimeout(() => setInspirationText(null), 8000) // 8 Sekunden sichtbar
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 via-purple-900 to-black text-white px-4">
      {/* Ideora Title */}
      <h1 className="text-6xl font-extrabold mb-4 text-center tracking-wide drop-shadow-lg">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500">
          Ideora
        </span>
      </h1>

      {/* Input Section with Attached Button */}
      <div className="relative w-full max-w-lg flex">
        {/* Input Field */}
        <div className="flex-grow relative">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="What’s your dream?"
            className="w-full px-4 py-3 bg-gray-800 text-white rounded-l-lg focus:outline-none"
          />
          {/* Progressbar Inside Input */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-700 rounded-bl-lg">
            <motion.div
              className="h-full bg-pink-500 rounded-bl-lg"
              style={{ width: `${progress}%` }}
              animate={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Submit Button (attached to input, same color as Progressbar) */}
        <motion.button
          onClick={addIdea}
          disabled={progress < 100}
          whileHover={{ scale: progress >= 100 ? 1.05 : 1 }}
          whileTap={{ scale: 0.95 }}
          className={`px-5 py-3 font-semibold rounded-r-lg transition-all ${
            progress >= 100 ? 'bg-pink-500 text-white' : 'bg-gray-600 text-gray-400'
          }`}
        >
          →
        </motion.button>
      </div>

      {/* Idea List */}
      <div className="mt-6 w-full max-w-lg space-y-3">
        <AnimatePresence>
          {ideas.map((idea) => (
            <motion.div
              key={idea.id}
              onClick={() => navigate(`/dream/${idea.id}`, { state: { dreamTitle: idea.title } })}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-700 px-4 py-3 rounded-lg cursor-pointer shadow-md"
            >
              {idea.title}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Floating Inspire Button (Bottom Right) */}
      <motion.button
        onClick={showRandomInspiration}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 px-5 py-2 bg-orange-500 hover:bg-orange-600 rounded-lg font-semibold shadow-lg"
      >
        ✨
      </motion.button>

      {/* Inspiration Popup */}
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