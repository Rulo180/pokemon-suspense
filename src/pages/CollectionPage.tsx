import React, { useEffect, useState, Suspense } from "react";

import { fetchPokemons } from "../pokemon";

import PokemonGrid from "../components/PokemonGrid";
import { createResource, Resource } from "../utils";
import PokemonErrorBoundary from "../components/PokemonErrorBoundary";
import PokemonGridFallback from "../components/PokemonGridFallback";

function createPokemonResource(first?: number) {
  return createResource(fetchPokemons(first));
}

const CollectionPage: React.FC = (): JSX.Element => {
  const [pokemonResources, setPokemonResources] =
    useState<Resource<any> | null>(null);

  useEffect(() => {
    setPokemonResources(createPokemonResource(50));
  }, []);

  return (
    <div className="p-6 bg-slate-600 bg-white text-copy">
      <h1 className="mb-6 text-xl font-bold">My Pokemon Collection</h1>
      <p>
        Browse in your collection to select the Pokemon that will take part in
        your team.
      </p>
      {pokemonResources && (
        <PokemonErrorBoundary>
          <Suspense fallback={<PokemonGridFallback count={20} />}>
            <PokemonGrid pokemonResources={pokemonResources} />
          </Suspense>
        </PokemonErrorBoundary>
      )}
    </div>
  );
};

export default CollectionPage;
