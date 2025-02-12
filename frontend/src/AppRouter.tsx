import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomeView } from "./home/HomeView";
import { GoalView } from "./home/GoalView";
import { GoalsHub } from "./home/GoalsHub";

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/goal/:idea" element={<GoalView />} />
        <Route path="/ideas" element={<GoalsHub />} />
      </Routes>
    </Router>
  );
};