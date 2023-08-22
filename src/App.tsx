import React from "react";
import { Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";

const App: React.FC = (): JSX.Element => {
  return (
    <div className="flex">
      <Sidebar />
      <main>
    <Routes>
      <Route path="/" element={<MainPage />} />
    </Routes>
      </main>
    </div>
  );
};

export default App;
