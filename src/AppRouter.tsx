import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomeView } from "./home/HomeView";
import { DreamView } from "./home/DreamView";

export const AppRouter = () => (
    <Router>
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/dream/:id" element={<DreamView />} />
        </Routes>
    </Router>
  )