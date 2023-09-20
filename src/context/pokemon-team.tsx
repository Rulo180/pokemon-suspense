import React, { createContext, ReactNode, useContext } from "react";
import { useLocalStorageState } from "../hooks";

type PokemonTeam = string[];

type PokemonTeamData = [
  team: PokemonTeam,
  setTeam: (pokemonTeam: PokemonTeam) => void
];

const PokemonTeamContext = createContext<PokemonTeamData | null>(null);

function usePokemonTeam() {
  const context = useContext(PokemonTeamContext);
  if (!context) {
    throw new Error(
      "usePokemonTeam must be used within a PokemonTeamProvider."
    );
  }
  return context;
}

interface PokemonTeamProviderProps {
  children: ReactNode;
}

const PokemonTeamProvider: React.FC<PokemonTeamProviderProps> = ({
  children,
  ...props
}) => {
  const [team, setTeam] = useLocalStorageState("__pokemon_app_team__", []);

  return (
    <PokemonTeamContext.Provider value={[team, setTeam]} {...props}>
      {children}
    </PokemonTeamContext.Provider>
  );
};

export { PokemonTeamProvider, usePokemonTeam };
