import React, { useState } from "react";
import {
  MdAdd,
  MdOutlineErrorOutline,
  MdPlaylistAddCheck,
  MdPlaylistRemove,
  MdRemove,
} from "react-icons/md";

import { Pokemon } from "../pokemon";
import { Resource } from "../utils";
import { usePokemonTeam } from "../context/pokemon-team";
import { MAX_TEAM_SIZE } from "../constants";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import { useToast } from "../context/toast";
import Toast from "./Toast";

const PokemonCard = React.lazy(
  () => import("../components/PokemonCard/PokemonCard")
);

interface PokemonGridProps {
  pokemonResources: Resource<Pokemon[]>;
}

const PokemonGrid: React.FC<PokemonGridProps> = ({ pokemonResources }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pokemonToBeRemoved, setPokemonToBeRemoved] = useState("");
  const [team, setTeam] = usePokemonTeam();
  const { open } = useToast();
  const pokemons = pokemonResources.read();

  const handleAddClick = (pokemonId: string) => {
    if (team.includes(pokemonId)) {
      setIsModalOpen(true);
      setPokemonToBeRemoved(pokemonId);
    } else {
      if (team.length < MAX_TEAM_SIZE) {
        setTeam([...team, pokemonId]);
        open(
          <Toast
            icon={<MdPlaylistAddCheck size="2rem" />}
            title="Pokemon added"
            message="This pokemon now is part of your team!"
          />
        );
      } else {
        open(
          <Toast
            icon={<MdOutlineErrorOutline size="2rem" />}
            message="Cannot add more than 6 pokemons to your team."
            title="Your team is full"
            type="error"
          />
        );
      }
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    const filteredPokemons = team.filter((id) => id !== pokemonToBeRemoved);
    setTeam(filteredPokemons);
    setIsModalOpen(false);
    open(
      <Toast
        icon={<MdPlaylistRemove size="2rem" />}
        title="Pokemon removed"
        message="This pokemon is no longer part of your team"
      />
    );
  };

  return (
    <div className="mt-6 grid gap-6 grid-cols-[repeat(auto-fit,minmax(9rem,12rem))] justify-center md:justify-start">
      {pokemons.map((pokemon) => {
        const isOnTeam = team.includes(pokemon.id);
        return (
          <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
            onCtaClick={handleAddClick}
            ctaLabel={
              isOnTeam ? <MdRemove size={"1rem"} /> : <MdAdd size={"1rem"} />
            }
            url={`/collection/${pokemon.name.toLowerCase()}`}
          />
        );
      })}
      <DeleteConfirmationModal
        isOpen={isModalOpen}
        onCancel={handleCancel}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default PokemonGrid;
