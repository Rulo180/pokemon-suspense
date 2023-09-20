import React, { Suspense, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Pokemon, fetchPokemon, getImageUrlForPokemon } from "../pokemon";
import { createResource, preloadImage, Resource } from "../utils";
import PokemonInfo from "../components/PokemonInfo/PokemonInfo";
import Skeleton from "../components/PokemonInfo/Skeleton";
import { MdChevronLeft } from "react-icons/md";

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

function getPokemonResource(pokemonName: string): {
  data: Resource<Pokemon>;
  image: Resource<string>;
} {
  const data = createResource(
    fetchPokemon(pokemonPageQuery, { name: pokemonName })
  ) as Resource<Pokemon>;
  const image = createResource(
    preloadImage(getImageUrlForPokemon(pokemonName))
  );

  return { data, image };
}

const PokemonPage: React.FC = () => {
  const [pokemonResource, setPokemonResource] = useState<{
    data: Resource<Pokemon>;
    image: Resource<string>;
  } | null>(null);
  const { pokemonName } = useParams();

  useEffect(() => {
    if (!pokemonName) {
      setPokemonResource(null);
    } else {
      setPokemonResource(getPokemonResource(pokemonName));
    }
  }, [pokemonName]);

  return (
    <div className="text-copy p-3 md:p-6">
      <Link to="/collection" className="link inline-block">
        <div className="flex items-center">
          <MdChevronLeft />
          Back
        </div>
      </Link>
      {pokemonResource && (
        <Suspense fallback={<Skeleton />}>
          <PokemonInfo pokemonResource={pokemonResource} />
        </Suspense>
      )}
    </div>
  );
};

export default PokemonPage;
