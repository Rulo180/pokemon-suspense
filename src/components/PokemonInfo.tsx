import React from "react";
import { MdArrowForwardIos } from "react-icons/md";

import { Resource } from "../utils";
import { Pokemon } from "../pokemon";
import Pill from "./Pill";
import PokemonEvolutionCard from "./PokemonEvolutionCard";

interface PokemonInfoProps {
  pokemonResource: Resource<Pokemon>;
}

const PokemonInfo: React.FC<PokemonInfoProps> = ({ pokemonResource }) => {
  const pokemon = pokemonResource?.read();
  const {
    attacks,
    classification,
    evolutions,
    height,
    image,
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
      <div className="flex gap-5 p-5">
        <div className="grow">
          <figure>
            <img alt={name} src={image} />
          </figure>
        </div>
        <div className="grow flex flex-col gap-5">
          <div className="p-4 rounded-lg bg-primary text-black">
            <div className="grid grid-cols-2 ">
              {/* row #1 */}
              <h3 className="text-white text-md pb-3">Height</h3>
              <h3 className="text-white text-md pb-3">Category</h3>
              {/* row #2 */}
              <p className="pb-4 text-lg">
                {`${height.minimum}-${height.maximum}`}
              </p>
              <p className="pb-4 text-lg">{classification}</p>
              {/* row #3 */}
              <h3 className="text-white text-md pb-3">Weight</h3>
              <h3 className="text-white text-md pb-3">Abilities</h3>
              {/* row #4 */}
              <p className="pb-4 text-lg">{`${weight.minimum}-${weight.maximum}`}</p>
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
        <div className="bg-slate-400 p-5 rounded-lg text-white">
          <h2 className="text-lg pb-4">Evolutions</h2>
          <div className="flex items-center justify-center">
            <PokemonEvolutionCard image={image} name={name} number={number} url={`/collection/${name.toLowerCase()}`} />
            {evolutions.map(({ id, image, name, number }) => (
              <React.Fragment>
                <MdArrowForwardIos size="3rem" />
                <PokemonEvolutionCard
                  key={id}
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
