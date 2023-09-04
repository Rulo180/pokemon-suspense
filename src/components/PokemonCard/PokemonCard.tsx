import React, { ReactNode } from "react";
import { Link } from "react-router-dom";

import { Pokemon, PokemonType } from "../../pokemon";
import Pill from "../Pill";

interface IPokemonCardProps {
  ctaLabel: string | ReactNode;
  pokemon: Pokemon;
  onCtaClick: (pokemonId: string) => void;
  teamIcon?: ReactNode;
  url: string;
}

const PokemonCard: React.FC<IPokemonCardProps> = ({
  ctaLabel,
  pokemon,
  onCtaClick,
  teamIcon,
  url,
}) => {
  const { id, image, name, number, types } = pokemon;
  const handleCtaClick = (event: React.MouseEvent) => {
    event.preventDefault();
    onCtaClick(id);
  };
  return (
    <article
      key={id}
      className="text-copy text-left position-relative border border-secondary rounded bg-white overflow-hidden shadow-md hover:shadow-lg transition-shadow"
    >
      <Link to={url}>
        <aside className="p-3">
          <figure className="m-0 p-0 overflow-hidden relative p-[50%]">
            <img
              className="absolute top-0 left-0 max-h-full"
              src={image}
              alt={name}
            />
          </figure>
        </aside>
        <div className="h-3/6 px-2 py-3 bg-secondary">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold pb-2">
              {name}
              <sup className="pl-1">{number}</sup>
            </h3>
            {teamIcon}
          </div>
          <div className="flex align-center space-x-1 overflow-x-auto types-scrollbar">
            {types.map((type: PokemonType) => (
              <Pill text={type} />
            ))}
          </div>
          <div className="flex items-center justify-between text-sm pt-2">
            <button className="btn btn-secondary">See info</button>
            <button
              className="btn btn-primary shadow-sm rounded-full p-2"
              onClick={handleCtaClick}
            >
              {ctaLabel}
            </button>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default PokemonCard;
