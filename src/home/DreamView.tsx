import { useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

export const DreamView = () => {
  const location = useLocation()
  const dreamTitle = location.state?.dreamTitle || "Your Dream"

  // Simulierte Ideen-Datenbank für spezifische Unterstützung
  const dreamSupport = {
    "Start a YouTube channel": [
      "🎥 Get a camera (or use your phone)",
      "🎙 Invest in a good microphone",
      "📅 Create a content schedule",
      "🎬 Learn video editing (DaVinci, Premiere, etc.)"
    ],
    "Learn Japanese": [
      "📚 Study Hiragana & Katakana first",
      "🗣 Find a language partner",
      "📺 Watch anime or dramas with subtitles",
      "🎧 Listen to Japanese music & podcasts"
    ],
    "Build a startup": [
      "💡 Validate your idea with market research",
      "📑 Create a simple business plan",
      "🔗 Find a co-founder or mentor",
      "💰 Secure funding (Bootstrap, Investors, Grants)"
    ]
  }

  // Standard-Vorschläge, falls der Dream nicht in der DB ist
  const defaultSupport = [
    "✅ Define your first step",
    "🎯 Set a deadline for your first milestone",
    "💡 Find inspiration from successful projects",
    "🚀 Break it down into small, actionable tasks"
  ]

  // Suche nach spezifischer Unterstützung oder nutze Default
  const supportSteps = dreamSupport[dreamTitle as keyof typeof dreamSupport] || defaultSupport

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 via-purple-900 to-black text-white px-4">
      {/* Überschrift → Der Dream aus der HomeView erscheint als Titel */}
      <motion.h1 
        className="text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-500 drop-shadow-md"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {dreamTitle}
      </motion.h1>

      <motion.p 
        className="text-lg mt-2 text-gray-300 text-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        Let’s make this happen!
      </motion.p>

      {/* Checkliste mit Unterstützungsschritten */}
      <motion.div 
        className="mt-6 w-full max-w-lg"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h2 className="text-2xl font-semibold text-pink-400">🚀 Action Plan</h2>
        <ul className="mt-3 space-y-2">
          {supportSteps.map((step, index) => (
            <motion.li 
              key={index} 
              className="px-4 py-2 bg-gray-800 rounded-lg flex items-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
            >
              <input type="checkbox" className="mr-2" />
              {step}
            </motion.li>
          ))}
        </ul>
      </motion.div>

      {/* Später: Community-Feature hinzufügen */}
      <motion.div 
        className="mt-6 w-full max-w-lg"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
      >
        <h2 className="text-2xl font-semibold text-blue-400">🤝 Get Support</h2>
        <p className="text-gray-300">
          Need help? Find people who have similar dreams and collaborate!
        </p>
        <motion.button 
          className="mt-3 px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Find like-minded people
        </motion.button>
      </motion.div>
    </div>
  )
}