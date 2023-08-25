import React from "react";
import Skeleton from "./PokemonCard/Skeleton";

const PokemonGridFallback = () => {
  return (
    <div className="mt-6 grid gap-6 justify-center grid-cols-[repeat(auto-fit,minmax(9rem,12rem))]">
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
    </div>
  );
};

export default PokemonGridFallback;
