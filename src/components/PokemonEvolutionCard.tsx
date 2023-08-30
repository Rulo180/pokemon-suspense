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
        <div className="border-2 border-slate-800 rounded-full overflow-hidden">
          <figure className="aspect-square flex items-center bg-white">
            <img src={image} alt={name} width={150} height={150} />
          </figure>
        </div>
        <h3 className="text-md">
          {name} <span className="text-slate-200">#{number}</span>
        </h3>
      </article>
    </a>
  );
};

export default PokemonEvolutionCard;
