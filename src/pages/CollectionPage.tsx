import React, { useEffect, useReducer } from "react";

import { fetchPokemons, Pokemon, parsePokemons } from "../pokemon";
import PokemonCard from "../components/PokemonCard";

type Action =
  | { type: "fetching" }
  | { type: "success"; data: any }
  | { type: "error"; error: string };

interface State {
  data: Array<Pokemon> | null;
  error: string | null;
  status: "idle" | "pending" | "resolved" | "rejected";
}

const initialState: State = {
  data: null,
  error: null,
  status: "idle",
};
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "fetching": {
      return {
        ...state,
        status: "pending",
      };
    }
    case "success": {
      return {
        ...state,
        data: action.data,
        status: "resolved",
      };
    }
    case "error": {
      return {
        ...state,
        error: action.error,
        status: "rejected",
      };
    }
  }
};

const CollectionPage: React.FC = (): JSX.Element => {
  const [{ data, status, error }, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: "fetching" });
    fetchPokemons(50).then(
      (data) => {
        dispatch({ type: "success", data: parsePokemons(data) });
      },
      (error) => {
        dispatch({ type: "error", error });
      }
    );
  }, []);

  if (status === "pending") {
    return <div>Loading...</div>;
  } else if (status === "rejected") {
    return (
      <div>
        There was an error: <pre style={{ whiteSpace: "normal" }}>{error}</pre>
      </div>
    );
  } else if (!data) {
    return <div>Empty state</div>;
  }

  return (
    <div className="p-6 bg-slate-600 bg-white">
      <h1 className="mb-6 text-center text-copy">My Pokemon Collection</h1>
      <div className="mt-6 grid gap-6 justify-center grid-cols-[repeat(auto-fit,minmax(9rem,12rem))]">
        {data.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
            onAddClick={() => console.log("Added to the team")}
            url={`/collection/${pokemon.name}`}
          />
        ))}
      </div>
    </div>
  );
};

export default CollectionPage;
