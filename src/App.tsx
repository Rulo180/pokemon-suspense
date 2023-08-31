import React from "react";
import { Route, Routes } from "react-router-dom";
import Loader from "./components/Loader";
import Sidebar from "./components/Sidebar";
import { PokemonTeamProvider } from "./context/pokemon-team";
import PokemonErrorBoundary from "./components/PokemonErrorBoundary";
import { ToastProvider } from "./context/toast";
const CollectionPage = React.lazy(() => import("./pages/CollectionPage"));
const NotFoundPage = React.lazy(() => import("./pages/NotFoundPage"));
const PokemonPage = React.lazy(() => import("./pages/PokemonPage"));
const TeamPage = React.lazy(() => import("./pages/TeamPage"));

const App: React.FC = (): JSX.Element => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="w-full">
        <PokemonErrorBoundary>
          <React.Suspense fallback={<Loader />}>
            <PokemonTeamProvider>
              <ToastProvider>
                <Routes>
                  <Route path="/" element={<TeamPage />} />
                  <Route path="/collection" element={<CollectionPage />} />
                  <Route
                    path="/collection/:pokemonName"
                    element={<PokemonPage />}
                  />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </ToastProvider>
            </PokemonTeamProvider>
          </React.Suspense>
        </PokemonErrorBoundary>
      </main>
    </div>
  );
};

export default App;
