import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomeView } from "./home/HomeView";
import { DreamView } from "./home/DreamView";
import { IdeasOverview } from "./home/IdeasOverview";

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/dream/:idea" element={<DreamView />} />
        <Route path="/ideas" element={<IdeasOverview />} />
      </Routes>
    </Router>
  );
};