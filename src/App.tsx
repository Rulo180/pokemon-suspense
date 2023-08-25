import React from "react";
import { Route, Routes } from "react-router-dom";
import CollectionPage from "./pages/CollectionPage";
import TeamPage from "./pages/TeamPage";
import Sidebar from "./components/Sidebar";

const App: React.FC = (): JSX.Element => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="w-full">
        <Routes>
          <Route path="/" element={<TeamPage />} />
          <Route path="/collection" element={<CollectionPage />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
