import React from "react";
import Skeleton from "./PokemonCard/Skeleton";

interface PokemonGridFallbackProps {
  count: number;
}

const PokemonGridFallback: React.FC<PokemonGridFallbackProps> = ({
  count,
}) => {
  return (
    <div className="mt-6 grid gap-6 justify-center md:justify-start grid-cols-[repeat(auto-fit,minmax(9rem,12rem))]">
      {Array.from({ length: count }, (_, index) => (
        <Skeleton key={index} />
      ))}
    </div>
  );
};

export default PokemonGridFallback;
