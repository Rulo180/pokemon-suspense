import React from "react";
import { Route, Routes } from "react-router-dom";
import Loader from "./components/Loader";
import Sidebar from "./components/Sidebar";
import { PokemonTeamProvider } from "./context/pokemon-team";
import PokemonErrorBoundary from "./components/PokemonErrorBoundary";
import { ToastProvider } from "./context/toast";
import { ModalProvider } from "./context/modal";
const CollectionPage = React.lazy(() => import("./pages/CollectionPage"));
const NotFoundPage = React.lazy(() => import("./pages/NotFoundPage"));
const PokemonPage = React.lazy(() => import("./pages/PokemonPage"));
const TeamPage = React.lazy(() => import("./pages/TeamPage"));

const App: React.FC = (): JSX.Element => {
  return (
    <PokemonErrorBoundary>
      <ModalProvider>
        <ToastProvider>
          <div className="flex">
            <Sidebar />
            <main className="w-full">
              <React.Suspense fallback={<Loader />}>
                <PokemonTeamProvider>
                  <Routes>
                    <Route path="/" element={<TeamPage />} />
                    <Route path="/collection" element={<CollectionPage />} />
                    <Route
                      path="/collection/:pokemonName"
                      element={<PokemonPage />}
                    />
                    <Route path="*" element={<NotFoundPage />} />
                  </Routes>
                </PokemonTeamProvider>
              </React.Suspense>
            </main>
          </div>
        </ToastProvider>
      </ModalProvider>
    </PokemonErrorBoundary>
  );
};

export default App;
