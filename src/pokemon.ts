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

type Pokemon = {
  id: string;
  name: string;
  image: string;
  number: string;
  type: PokemonType[];
  attacks: {
    special: Attack[];
  };
};

const parsePokemons = (pokemons: Array<Pokemon>) => {
  return pokemons.map((pokemon) => {
    let pokemonTypes: PokemonType[] = [];
    pokemon.attacks.special.forEach(({ type }) => {
      if (!pokemonTypes.includes(type)) {
        pokemonTypes.push(type);
      }
    });
    return { ...pokemon, type: pokemonTypes };
  });
};

const fetchPokemons = async (first = 10, delay = "1500") => {
  const pokemonQuery = `
    query getPokemons($first: Int!) {
        pokemons(first: $first) {
            id
            number
            name
            image
            attacks {
            special {
                name
                type
                damage
            }
            }
        }
        }
  `;

  return window
    .fetch("https://graphql-pokemon2.vercel.app/", {
      // learn more about this API here: https://graphql-pokemon2.vercel.app/
      method: "POST",
      headers: {
        "content-type": "application/json;charset=UTF-8",
        delay: delay,
      },
      body: JSON.stringify({
        query: pokemonQuery,
        variables: { first },
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

export { fetchPokemons, parsePokemons };
export type { Pokemon, PokemonType };
