type PokemonType =
  | "Bug"
  | "Dragon"
  | "Dark"
  | "Electric"
  | "Fairy"
  | "Fire"
  | "Fighting"
  | "Flying"
  | "Grass"
  | "Ground"
  | "Ice"
  | "Normal"
  | "Poison"
  | "Psychic"
  | "Rock"
  | "Steel"
  | "Water";

type Attack = {
  damage: number;
  name: string;
  type: PokemonType;
};

type PokemonDimension = {
  minimum: string;
  maximum: string;
};

type Pokemon = {
  id: string;
  name: string;
  classification: string;
  image: string;
  number: string;
  types: PokemonType[];
  weight: PokemonDimension;
  height: PokemonDimension;
  resistant: PokemonType[];
  weaknesses: PokemonType[];
  attacks: {
    special: Attack[];
  };
  evolutions: Pokemon[];
};

const API_URL = "https://graphql-pokemon2.vercel.app/";
// learn more about this API here: https://graphql-pokemon2.vercel.app/

const fetchPokemons = async (
  query: string,
  variables = { first: 10 },
  delay = "1500"
) => {
  return window
    .fetch(API_URL, {
      method: "POST",
      headers: {
        "content-type": "application/json;charset=UTF-8",
        delay: delay,
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    })
    .then(async (response) => {
      const { data } = await response.json();
      if (response.ok) {
        const pokemons = data?.pokemons;
        if (pokemons) {
          return pokemons;
        } else {
          return Promise.reject(
            new Error(`There was an error. Try again later.`)
          );
        }
      } else {
        // handle the graphql errors
        const error = {
          message: data?.errors?.map((e: Error) => e.message).join("\n"),
        };
        return Promise.reject(error);
      }
    });
};

const fetchPokemon = async (
  query: string,
  variables: Record<string, any>,
  delay = "1500"
) => {
  return window
    .fetch(API_URL, {
      method: "POST",
      headers: {
        "content-type": "application/json;charset=UTF-8",
        delay: delay,
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    })
    .then(async (response) => {
      const { data } = await response.json();
      if (response.ok) {
        const pokemon = data?.pokemon;
        if (pokemon) {
          return pokemon;
        } else {
          return Promise.reject(
            new Error(`There was an error. Try again later.`)
          );
        }
      } else {
        // handle the graphql errors
        const error = {
          message: data?.errors?.map((e: Error) => e.message).join("\n"),
        };
        return Promise.reject(error);
      }
    });
};

function getImageUrlForPokemon(pokemonName: string) {
  return `https://img.pokemondb.net/artwork/${pokemonName.toLowerCase()}.jpg`;
}

export { fetchPokemon, fetchPokemons, getImageUrlForPokemon };
export type { Pokemon, PokemonType };
