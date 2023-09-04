import React from "react";

interface PokemonEvolutionCardProps {
  image: string;
  name: string;
  number: string;
  url: string;
}

const PokemonEvolutionCard: React.FC<PokemonEvolutionCardProps> = ({
  image,
  name,
  number,
  url,
}): JSX.Element => {
  return (
    <a href={url}>
      <article className="flex flex-col items-center gap-2">
        <figure className="aspect-square flex items-center bg-white overflow-hidden border-2 border-slate-800 rounded-full">
          <img src={image} alt={name} width={150} height={150} />
        </figure>
        <h3 className="text-md">
          {name} <span className="text-slate-500">#{number}</span>
        </h3>
      </article>
    </a>
  );
};

export default PokemonEvolutionCard;
