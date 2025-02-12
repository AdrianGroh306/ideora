import React, { useEffect, useState } from "react";
import { GoalCard, Goal } from "../components/GoalCard";
import { useNavigate } from "react-router-dom";

export const GoalHub: React.FC = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const openGoal = (id:string) => {
    console.log("Opening goal", id);
    navigate(`/goal/${id}`);
  };

  useEffect(() => {
    fetch("http://localhost:5001/api/goals")
      .then((res) => res.json())
      .then((data) => {
        setGoals(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Fehler beim Laden der Ziele.");
        setLoading(false);
      });
  }, []);

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="min-h-screen text-white px-4 relative">
      <div className="pt-20 max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Goal Hub</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {goals.map((goal) => (
            <GoalCard onClick={() => openGoal(goal.id)} key={goal.id} goal={goal} />
          ))}
        </div>
      </div>
    </div>
  );
};