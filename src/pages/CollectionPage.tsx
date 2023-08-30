import React, { useEffect, useState, Suspense } from "react";

import { fetchPokemons, Pokemon } from "../pokemon";

import { createResource, Resource } from "../utils";
import PokemonGridFallback from "../components/PokemonGridFallback";
import Layout from "../components/Layout";

const PokemonGrid = React.lazy(() => import("../components/PokemonGrid"));

function createPokemonResource(first?: number): Resource<Pokemon[]> {
  return createResource(fetchPokemons(first)) as Resource<Pokemon[]>;
}

const CollectionPage: React.FC = (): JSX.Element => {
  const [pokemonResources, setPokemonResource] = useState<Resource<
    Pokemon[]
  > | null>(null);

  useEffect(() => {
    setPokemonResource(createPokemonResource(50));
  }, []);

  return (
    <Layout
      title="My Pokemon Collection"
      description="Browse in your collection to select the Pokemon that will take part in
        your team."
    >
      {pokemonResources && (
        <Suspense fallback={<PokemonGridFallback count={20} />}>
          <PokemonGrid pokemonResources={pokemonResources} />
        </Suspense>
      )}
    </Layout>
  );
};

export default CollectionPage;
