import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./home/Layout";
import { GoalHub } from "./home/GoalHub";
import { GoalView } from "./home/GoalView";
import { HomeView } from "./home/HomeView";


export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomeView />} />
          <Route path="/hub" element={<GoalHub />} />
          <Route path="/goal/:goalId" element={<GoalView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};