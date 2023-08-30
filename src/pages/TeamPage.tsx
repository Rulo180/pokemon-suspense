import React, { Suspense, useEffect, useState } from "react";

import Layout from "../components/Layout";
import { usePokemonTeam } from "../context/pokemon-team";
import { Resource, createResource } from "../utils";
import { Pokemon, fetchPokemon } from "../pokemon";
import PokemonGridFallback from "../components/PokemonGridFallback";

const PokemonGrid = React.lazy(() => import("../components/PokemonGrid"));

const TeamPage: React.FC = (): JSX.Element => {
  const [team, _] = usePokemonTeam();
  const [pokemonResources, setPokemonResources] = useState<Resource<
    Pokemon[]
  > | null>(null);

  useEffect(() => {
    const promises = team.map((pokemonId) => fetchPokemon(pokemonId));
    setPokemonResources(createResource(Promise.all(promises)));
  }, [team]);

  return (
    <Layout
      title="Your Pokemon Team Showcase"
      description="Here, you can find an organized presentation of all the Pokémon that compose your team. "
    >
      {pokemonResources && (
          <Suspense fallback={<PokemonGridFallback count={6} />}>
            <PokemonGrid pokemonResources={pokemonResources} />
          </Suspense>
      )}
    </Layout>
  );
};

export default TeamPage;
