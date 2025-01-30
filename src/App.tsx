import { useState, useEffect, KeyboardEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/** 
 * Es wird ein Anwendungsszenario abgebildet, bei dem Ideen einem 
 * spezifischen Profil (Benutzernamen) zugeordnet und parallax im 
 * Hintergrund animierte Formen erzeugt werden. Zusätzlich wird es 
 * ermöglicht, durch Drücken der Enter-Taste eine neue Idee hinzuzufügen.
 * Die Ideen werden abhängig vom aktuellen Profil in Local Storage gespeichert.
 */

export const App = () => {
  // Profilinformationen und Eingaben
  const [username, setUsername] = useState<string>('')
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

  // Ideen-bezogene States
  const [idea, setIdea] = useState('')
  const [ideas, setIdeas] = useState<string[]>([])

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

  /**
   * Der Profilwechsel soll das passende Ideen-Array aus Local Storage laden.
   * Falls kein Eintrag gefunden wird, wird ein leeres Array beibehalten.
   */
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

  // Zu Beginn werden zufällig verteilte Kreise im Hintergrund erzeugt.
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

  // Listener für Mausbewegungen
  useEffect(() => {
    function handleMouseMove(event: MouseEvent) {
      setMousePos({ x: event.clientX, y: event.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  // Parallax-Verschiebung
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

  /** 
   * Neue Ideen sollen eingefügt werden, sofern kein leerer String vorliegt. 
   * Anschließend wird Local Storage aktualisiert, um die ideas persistiert zu halten.
   */
  function addIdea() {
    if (!isLoggedIn || username.trim() === '') return
    if (idea.trim() !== '') {
      const updated = [...ideas, idea.trim()]
      setIdeas(updated)
      setIdea('')
      localStorage.setItem(`ideas_${username}`, JSON.stringify(updated))
    }
  }

  /**
   * Login-Funktion: Ist ein Nutzername vorhanden, wird der Login-Status auf true gesetzt.
   */
  function handleLogin() {
    if (username.trim() !== '') {
      setIsLoggedIn(true)
    }
  }

  /**
   * Beim Logout werden das Ideen-Array geleert und der Login-Status zurückgesetzt. 
   * Auf diese Weise kann ein anderer Nutzername verwendet werden.
   */
  function handleLogout() {
    setIsLoggedIn(false)
    setUsername('')
    setIdeas([])
  }

  /**
   * Enter-Handler für Eingabefelder, um beim Betätigen der Taste Enter 
   * die entsprechenden Aktionen auszuführen (Login oder Idee anlegen).
   */
  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>, action: () => void) {
    if (e.key === 'Enter') {
      action()
    }
  }

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-900 via-purple-900 to-gray-900 text-white px-4 overflow-hidden">
      {/* Parallax-Hintergrund */}
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

      {/* Hauptüberschrift */}
      <h1 className="text-5xl font-bold mb-2 drop-shadow-lg">Ideora Experience</h1>
      <p className="text-lg text-gray-300 mb-6 drop-shadow-md">
        Erweiterte Ideenverwaltung mit Nutzerprofil und Parallax-Effekten
      </p>

      {/* Container für Login und Ideeneingabe */}
      <div className="w-full max-w-md flex flex-col gap-4 relative z-10">
        {!isLoggedIn ? (
          // Login-Bereich
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
          // Eingabe- und Listenbereich
          <>
            <div className="flex justify-between items-center">
              <p className="text-md text-gray-300">Eingeloggt als <b>{username}</b></p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="px-3 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-semibold text-sm"
              >
                Abmelden
              </motion.button>
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