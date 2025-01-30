import { useState, useEffect, KeyboardEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { UserIcon } from '@heroicons/react/24/outline'

export const App = () => {
  // Profilinformationen und Eingaben
  const [username, setUsername] = useState<string>('')
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

  // Ideen-bezogene States
  const [idea, setIdea] = useState('')
  const [ideas, setIdeas] = useState<string[]>([])

  // Zusätzlicher State für das Profil-Modal
  const [isProfileModalOpen, setProfileModalOpen] = useState(false)

  // Hintergrundformen für Parallax-Effekt
  const [backgroundShapes, setBackgroundShapes] = useState<
    { 
      id: number; 
      x: number; 
      y: number; 
      size: number; 
      delay: number; 
      offsetX: number; 
      offsetY: number 
    }[]
  >([])

  // Mausposition für Parallax-Berechnungen
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 })

  useEffect(() => {
    if (isLoggedIn && username.trim() !== '') {
      const stored = localStorage.getItem(`ideas_${username}`)
      if (stored) {
        setIdeas(JSON.parse(stored))
      } else {
        setIdeas([])
      }
    }
  }, [isLoggedIn, username])

  useEffect(() => {
    const shapes: {
      id: number
      x: number
      y: number
      size: number
      delay: number
      offsetX: number
      offsetY: number
    }[] = []
    for (let i = 0; i < 15; i++) {
      shapes.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 20 + Math.random() * 60,
        delay: Math.random() * 4,
        offsetX: 0,
        offsetY: 0
      })
    }
    setBackgroundShapes(shapes)
  }, [])

  useEffect(() => {
    function handleMouseMove(event: MouseEvent) {
      setMousePos({ x: event.clientX, y: event.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  useEffect(() => {
    setBackgroundShapes((prevShapes) =>
      prevShapes.map((shape) => {
        const offsetFactor = 0.02
        return {
          ...shape,
          offsetX: (mousePos.x - window.innerWidth / 2) * offsetFactor,
          offsetY: (mousePos.y - window.innerHeight / 2) * offsetFactor
        }
      })
    )
  }, [mousePos])

  function addIdea() {
    if (!isLoggedIn || username.trim() === '') return
    if (idea.trim() !== '') {
      const updated = [...ideas, idea.trim()]
      setIdeas(updated)
      setIdea('')
      localStorage.setItem(`ideas_${username}`, JSON.stringify(updated))
    }
  }

  function handleLogin() {
    if (username.trim() !== '') {
      setIsLoggedIn(true)
    }
  }

  function handleLogout() {
    setIsLoggedIn(false)
    setUsername('')
    setIdeas([])
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>, action: () => void) {
    if (e.key === 'Enter') {
      action()
    }
  }

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-900 via-purple-900 to-gray-900 text-white px-4 overflow-hidden">

      {/* 1. Parallax-Hintergrund */}
      {backgroundShapes.map((shape) => (
        <motion.div
          key={shape.id}
          className="absolute bg-pink-600 bg-opacity-20 rounded-full blur-xl"
          style={{
            top: `calc(${shape.y}% + ${shape.offsetY}px)`,
            left: `calc(${shape.x}% + ${shape.offsetX}px)`,
            width: shape.size,
            height: shape.size
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0.2, 0.35, 0.2],
            scale: [0, 1, 0],
            rotate: [0, 360]
          }}
          transition={{
            repeat: Infinity,
            repeatType: 'reverse',
            duration: 10,
            delay: shape.delay
          }}
        />
      ))}

      {/* 2. Profil-Icon in der oberen rechten Ecke */}
      <div className="absolute top-4 right-4 z-50">
        <button onClick={() => setProfileModalOpen(true)} className="focus:outline-none">
          <UserIcon className="w-8 h-8 text-white hover:text-pink-300 transition-colors" />
        </button>
      </div>

      {/* 3. Modal für Profil-Informationen oder Einstellungen */}
      <AnimatePresence>
        {isProfileModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Modal-Content */}
            <motion.div
              className="bg-gray-800 rounded-lg p-6 text-white w-[300px] relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <h2 className="text-xl font-bold mb-4">Profil</h2>
              {isLoggedIn ? (
                <p className="mb-4">Eingeloggt als <b>{username}</b></p>
              ) : (
                <p className="mb-4 text-gray-300 italic">Aktuell nicht eingeloggt</p>
              )}

              <div className="flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setProfileModalOpen(false)}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold mr-2"
                >
                  Schließen
                </motion.button>
                {isLoggedIn && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      handleLogout()
                      setProfileModalOpen(false)
                    }}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-semibold"
                  >
                    Abmelden
                  </motion.button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. Hauptüberschrift und restlicher Inhalt */}
      <h1 className="text-5xl font-bold mb-2 drop-shadow-lg mt-6">Ideora Experience</h1>
      <p className="text-lg text-gray-300 mb-6 drop-shadow-md">
        Erweiterte Ideenverwaltung mit Nutzerprofil und Parallax-Effekten
      </p>

      {/* Login- bzw. Ideenbereich */}
      <div className="w-full max-w-md flex flex-col gap-4 relative z-10">
        {!isLoggedIn ? (
          <div className="p-4 bg-gray-800 bg-opacity-80 border border-gray-700 rounded-lg flex flex-col gap-3">
            <label className="font-semibold text-lg">Benutzername</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, handleLogin)}
              placeholder="Nutzername hier eingeben..."
              className="p-3 bg-gray-700 bg-opacity-90 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-white"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogin}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold"
            >
              Anmelden
            </motion.button>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center">
              <p className="text-md text-gray-300">
                Eingeloggt als <b>{username}</b>
              </p>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Neue Idee eintippen..."
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, addIdea)}
                className="flex-1 p-3 bg-gray-700 bg-opacity-90 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-white"
              />
              <motion.button
                whileHover={{ scale: 1.07 }}
                whileTap={{ scale: 0.95 }}
                onClick={addIdea}
                className="px-5 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition-colors"
              >
                Hinzufügen
              </motion.button>
            </div>

            <div className="w-full max-h-80 overflow-y-auto p-4 bg-gray-800 bg-opacity-80 border border-gray-700 rounded-lg">
              {ideas.length === 0 ? (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-gray-400 text-center"
                >
                  Noch keine Ideen vorhanden
                </motion.p>
              ) : (
                <ul className="space-y-3">
                  <AnimatePresence>
                    {ideas.map((item, index) => (
                      <motion.li
                        key={index}
                        className="p-3 bg-gray-700 bg-opacity-80 rounded-lg shadow-sm hover:bg-gray-600 hover:bg-opacity-80 transition-colors break-words"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 50 }}
                        layout
                        whileHover={{ scale: 1.02 }}
                      >
                        {item}
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}