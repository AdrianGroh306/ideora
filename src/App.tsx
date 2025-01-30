import { useState } from 'react';

export const App = () => {
  const [idea, setIdea] = useState('');
  const [ideas, setIdeas] = useState<string[]>([]);

  const addIdea = () => {
    if (idea.trim() !== '') {
      setIdeas([...ideas, idea]);
      setIdea('');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 text-white px-4">
      <h1 className="text-4xl font-bold mb-2">Welcome to Ideora</h1>
      <p className="text-lg text-gray-300 mb-6">Connecting Dreams with Action</p>

      <div className="w-full max-w-md flex flex-col gap-4">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="What's your idea?"
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            className="flex-1 p-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-white"
          />
          <button
            onClick={addIdea}
            className="px-5 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg font-semibold transition-transform transform hover:scale-105"
          >
            Add
          </button>
        </div>

        <div className="w-full max-h-80 overflow-y-auto p-4 bg-gray-800 border border-gray-700 rounded-lg">
          {ideas.length === 0 ? (
            <p className="text-gray-400 text-center">No ideas yet. Start by adding one!</p>
          ) : (
            <ul className="space-y-3">
              {ideas.map((idea, index) => (
                <li
                  key={index}
                  className="p-3 bg-gray-700 rounded-lg shadow-sm hover:bg-gray-600 transition"
                >
                  {idea}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}