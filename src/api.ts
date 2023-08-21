const formatDate = (date: Date) =>
  `${date.getHours()}:${String(date.getMinutes()).padStart(2, "0")} ${String(
    date.getSeconds()
  ).padStart(2, "0")}.${String(date.getMilliseconds()).padStart(3, "0")}`;

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

export { fetchPokemons };
