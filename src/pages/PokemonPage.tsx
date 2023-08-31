import React, { Suspense, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Pokemon, fetchPokemon } from "../pokemon";
import { createResource, Resource } from "../utils";
import PokemonInfo from "../components/PokemonInfo/PokemonInfo";
import Skeleton from "../components/PokemonInfo/Skeleton";

const pokemonPageQuery = `
  query getPokemon($name: String!) {
    pokemon(name: $name) {
      id
      number
      name
      weight {
        minimum
        maximum
      }
      height {
        minimum
        maximum
      }
      classification
      image
      types
      resistant
      weaknesses
      attacks {
        fast {
          name
          type
          damage
        }
        special {
          name
          type
          damage
        }
      }
      evolutions {
        name
        image
        number
      }
    }
  }
`;

const PokemonPage: React.FC = (): JSX.Element => {
  const [pokemonResource, setPokemonResource] =
    useState<Resource<Pokemon> | null>(null);
  const { pokemonName } = useParams();

  useEffect(() => {
    if (!pokemonName) {
      setPokemonResource(null);
    } else {
      setPokemonResource(
        createResource(
          fetchPokemon(pokemonPageQuery, { name: pokemonName })
        ) as Resource<Pokemon>
      );
    }
  }, [pokemonName]);

  return (
    <div className="text-copy p-6">
      {pokemonResource && (
        <Suspense fallback={<Skeleton />}>
          <PokemonInfo pokemonResource={pokemonResource} />
        </Suspense>
      )}
    </div>
  );
};

export default PokemonPage;
