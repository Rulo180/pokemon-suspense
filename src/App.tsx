import React from "react";
import { Route, Routes } from "react-router-dom";
import Loader from "./components/Loader";
import Sidebar from "./components/Sidebar";
const CollectionPage = React.lazy(() => import("./pages/CollectionPage"));
const TeamPage = React.lazy(() => import("./pages/TeamPage"));
const PokemonPage = React.lazy(() => import("./pages/PokemonPage"));

const App: React.FC = (): JSX.Element => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="w-full">
        <React.Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<TeamPage />} />
            <Route path="/collection" element={<CollectionPage />} />
            <Route path="/collection/:pokemonName" element={<PokemonPage />} />
          </Routes>
        </React.Suspense>
      </main>
    </div>
  );
};

export default App;
