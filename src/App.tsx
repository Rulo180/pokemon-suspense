import React from "react";
import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";

const App: React.FC = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
    </Routes>
  );
};

export default App;
