import React, { Suspense, useEffect, useState } from "react";

import Layout from "../components/Layout";
import { usePokemonTeam } from "../context/pokemon-team";
import { Resource, createResource } from "../utils";
import { Pokemon, fetchPokemon } from "../pokemon";
import PokemonGridFallback from "../components/PokemonGridFallback";
import EmptyState from "../components/EmptyState";

const PokemonGrid = React.lazy(() => import("../components/PokemonGrid"));

const pokemonQuery = `
  query getPokemons($id: String!) {
    pokemon(id: $id) {
      id
      number
      name
      image
      types
    }
  }
  `;

const TeamPage: React.FC = () => {
  const [team, _] = usePokemonTeam();
  const [pokemonResources, setPokemonResources] = useState<Resource<
    Pokemon[]
  > | null>(null);

  useEffect(() => {
    const promises = team.map((pokemonId) =>
      fetchPokemon(pokemonQuery, { id: pokemonId })
    );
    setPokemonResources(createResource(Promise.all(promises)));
  }, [team]);

  return (
    <Layout
      title="Your Pokemon Team Showcase"
      description="Here, you can find an organized presentation of all the Pokémon that compose your team."
    >
      {team.length === 0 && (
        <EmptyState
          title="Your team is empty!"
          message={
            <p>
              Try adding some pokemons in the{" "}
              <a
                href="/collection"
                className="no-underline hover:underline text-blue-600"
              >
                Collection
              </a>{" "}
              page.
            </p>
          }
        />
      )}
      {pokemonResources && team.length > 0 && (
        <Suspense fallback={<PokemonGridFallback count={6} />}>
          <PokemonGrid pokemonResources={pokemonResources} />
        </Suspense>
      )}
    </Layout>
  );
};

export default TeamPage;
