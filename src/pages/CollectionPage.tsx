import React, { useEffect, useReducer } from "react";

import { fetchPokemons } from "../api";
import PokemonCard from "../components/PokemonCard";

type Action =
  | { type: "fetching" }
  | { type: "success"; data: [] }
  | { type: "error"; error: string };

interface State {
  data: [] | null;
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
    fetchPokemons().then(
      (data) => {
        dispatch({ type: "success", data: data });
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
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        {data.map((pokemon) => (
          <PokemonCard pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
};

export default CollectionPage;
