import React from "react";
import { MdArrowForwardIos } from "react-icons/md";

import { Resource } from "../../utils";
import { Pokemon } from "../../pokemon";
import Pill from "../Pill";
import PokemonEvolutionCard from "../PokemonEvolutionCard";

interface PokemonInfoProps {
  pokemonResource: { data: Resource<Pokemon>; image: Resource<string> };
}

const PokemonInfo: React.FC<PokemonInfoProps> = ({ pokemonResource }) => {
  const pokemon = pokemonResource.data.read();
  const image = pokemonResource.image.read();
  const {
    attacks,
    classification,
    evolutions,
    height,
    name,
    number,
    resistant,
    types,
    weaknesses,
    weight,
  } = pokemon as Pokemon;

  return (
    <React.Fragment>
      <div className="text-center pb-6">
        <h1 className="text-3xl">
          {name} <span className="text-slate-400">#{number}</span>
        </h1>
      </div>
      <div className="flex flex-col md:flex-row gap-5 py-5 md:p-5">
        <div className="grow">
          <figure>
            <img className="mx-auto" alt={name} src={image} />
          </figure>
        </div>
        <div className="grow flex flex-col gap-3 md:gap-5">
          <div className="grid grid-cols-2 gap-4 p-4 rounded-lg bg-primary text-black">
            <div>
              <h3 className="text-white text-md pb-1">Height</h3>
              <p className="text-lg">{`${height.minimum}-${height.maximum}`}</p>
            </div>
            <div>
              <h3 className="text-white text-md pb-1">Category</h3>
              <p className="text-lg">{classification}</p>
            </div>
            <div>
              <h3 className="text-white text-md pb-1">Weight</h3>
              <p className="text-lg">{`${weight.minimum}-${weight.maximum}`}</p>
            </div>
            <div>
              <h3 className="text-white text-md pb-1">Abilities</h3>
              <div className="flex flex-col gap-2">
                {attacks.special.map(({ damage, name }) => {
                  return (
                    <div key={name}>
                      {name}: {damage}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <h3 className="text-lg">Type</h3>
          <div className="flex gap-2">
            {types.map((type) => (
              <Pill key={`${name}-${type}`} text={type} />
            ))}
          </div>
          <h3 className="text-lg">Resistance</h3>
          <div className="flex gap-2">
            {resistant.map((type) => (
              <Pill key={`${name}-${type}`} text={type} />
            ))}
          </div>
          <h3 className="text-lg">Weaknesses</h3>
          <div className="flex gap-2">
            {weaknesses.map((type) => (
              <Pill key={`${name}-${type}`} text={type} />
            ))}
          </div>
        </div>
      </div>
      {evolutions && (
        <div className="bg-slate-300 p-5 rounded-lg">
          <h2 className="text-lg pb-4">Evolutions</h2>
          <div className="flex items-center justify-center">
            <PokemonEvolutionCard
              image={image}
              name={name}
              number={number}
              url={`/collection/${name.toLowerCase()}`}
            />
            {evolutions.map(({ id, image, name, number }) => (
              <React.Fragment key={id}>
                <MdArrowForwardIos size="3rem" />
                <PokemonEvolutionCard
                  image={image}
                  name={name}
                  number={number}
                  url={`/collection/${name.toLowerCase()}`}
                />
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default PokemonInfo;
