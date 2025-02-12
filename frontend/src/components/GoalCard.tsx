import React from 'react';
import { FaGlobe, FaLock } from 'react-icons/fa';

export interface Goal {
  id: string;
  title: string;
  description?: string;
  visibility: 'private' | 'public';
}

interface GoalCardProps {
  goal: Goal;
  onClick?: () => void;
}

export const GoalCard: React.FC<GoalCardProps> = ({ goal, onClick }) => {
  return (
    <div onClick={onClick} className="bg-gray-800 rounded-lg shadow-md p-6 cursor-pointer">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-white">{goal.title}</h2>
        <div className="flex items-center">
          {goal.visibility === "public" ? (
            <div className="flex items-center bg-blue-600 text-white px-2 py-1 rounded-full text-sm">
              <FaGlobe className="mr-1" />
              <span>Public</span>
            </div>
          ) : (
            <div className="flex items-center bg-gray-600 text-white px-2 py-1 rounded-full text-sm">
              <FaLock className="mr-1" />
              <span>Private</span>
            </div>
          )}
        </div>
      </div>
      {goal.description && (
        <p className="text-gray-300">{goal.description}</p>
      )}
      {/* Weitere Informationen, Chips o. Ä. können hier ergänzt werden */}
    </div>
  );
};