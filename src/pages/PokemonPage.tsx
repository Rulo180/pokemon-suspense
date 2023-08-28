import React from "react";
import { useParams } from "react-router-dom";

const PokemonPage: React.FC = (): JSX.Element => {
  const { pokemonName } = useParams();
  return <div>PokemonPage: {pokemonName}</div>;
};

export default PokemonPage;
