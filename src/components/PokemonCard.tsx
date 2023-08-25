import React from "react";

import { Pokemon, PokemonType } from "../pokemon";

interface IPokemonCardProps {
  pokemon: Pokemon;
  onAddClick: () => void;
  url: string;
}

const PokemonCard: React.FC<IPokemonCardProps> = ({
  pokemon,
  onAddClick,
  url,
}) => {
  const { image, name, number, type } = pokemon;
  return (
    <article
      key={pokemon.id}
      className="text-copy position-relative border border-secondary rounded bg-white overflow-hidden shadow-md hover:shadow-lg transition-shadow"
    >
      <aside className="p-3">
        <a href={url}>
          <figure className="m-0 p-0 overflow-hidden relative p-[50%]">
            <img
              className="absolute top-0 left-0 max-h-full"
              src={image}
              alt={name}
            />
          </figure>
        </a>
      </aside>
      <div className="h-3/6 px-2 py-3 bg-secondary">
        <a href={url}>
          <h3 className="font-semibold pb-2">
            {name}
            <sup className="pl-1">{number}</sup>
          </h3>
        </a>
        <div className="flex align-center mx-[-0.25rem] overflow-x-auto types-scrollbar">
          {type.map((type: PokemonType) => (
            <span
              key={`${name}-${type}`}
              className="border border-slate-400 rounded-full px-2 py-1 text-xs mx-1 mb-1"
            >
              {type}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between text-sm pt-2">
          <button className="btn btn-secondary">Ver info</button>
          <button
            className="btn btn-primary shadow-sm text-white"
            onClick={onAddClick}
          >
            Agregar
          </button>
        </div>
      </div>
    </article>
  );
};

export default PokemonCard;
