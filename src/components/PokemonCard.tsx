import React from "react";

type Pokemon = {
  id: string;
  name: string;
  image: string;
  number: string;
};

interface IPokemonCardProps {
  pokemon: Pokemon;
}

const PokemonCard: React.FC<IPokemonCardProps> = ({ pokemon }) => {
  return (
    <div
      key={pokemon.id}
      className="rounded overflow-hidden px-4 py-2 shadow-md hover:shadow-lg transition-shadow"
    >
      <img src={pokemon.image} alt={pokemon.name} width={100} height={100} />
      <div className="p-4">
        <h3 className="text-center text-slate-300">{pokemon.name}</h3>
      </div>
    </div>
  );
};

export default PokemonCard;
