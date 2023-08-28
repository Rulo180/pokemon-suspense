import React from "react";
import { Pokemon } from "../pokemon";
import { Resource } from "../utils";

const PokemonCard = React.lazy(
  () => import("../components/PokemonCard/PokemonCard")
);

interface PokemonGridProps {
  pokemonResources: Resource<Pokemon[]>;
}

const PokemonGrid: React.FC<PokemonGridProps> = ({ pokemonResources }) => {
  const pokemons = pokemonResources.read();
  return (
    <div className="mt-6 grid gap-6 justify-center grid-cols-[repeat(auto-fit,minmax(9rem,12rem))]">
      {pokemons.map((pokemon) => (
        <PokemonCard
          key={pokemon.id}
          pokemon={pokemon}
          onAddClick={() => console.log("Added to the team")}
          url={`/collection/${pokemon.name.toLowerCase()}`}
        />
      ))}
    </div>
  );
};

export default PokemonGrid;
