import React from "react";
import { Route, Routes } from "react-router-dom";
import Loader from "./components/Loader";
import Sidebar from "./components/Sidebar";
import { PokemonTeamProvider } from "./context/pokemon-team";
import PokemonErrorBoundary from "./components/PokemonErrorBoundary";
const CollectionPage = React.lazy(() => import("./pages/CollectionPage"));
const TeamPage = React.lazy(() => import("./pages/TeamPage"));
const PokemonPage = React.lazy(() => import("./pages/PokemonPage"));

const App: React.FC = (): JSX.Element => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="w-full">
        <PokemonErrorBoundary>
          <React.Suspense fallback={<Loader />}>
            <PokemonTeamProvider>
              <Routes>
                <Route path="/" element={<TeamPage />} />
                <Route path="/collection" element={<CollectionPage />} />
                <Route
                  path="/collection/:pokemonName"
                  element={<PokemonPage />}
                />
              </Routes>
            </PokemonTeamProvider>
          </React.Suspense>
        </PokemonErrorBoundary>
      </main>
    </div>
  );
};

export default App;
