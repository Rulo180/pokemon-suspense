import React from "react";
import {
  MdAdd,
  MdOutlineErrorOutline,
  MdPlaylistAddCheck,
  MdPlaylistRemove,
  MdRemove,
  MdShield,
} from "react-icons/md";

import { Pokemon } from "../pokemon";
import { Resource } from "../utils";
import { usePokemonTeam } from "../context/pokemon-team";
import { MAX_TEAM_SIZE } from "../constants";
import { useToast } from "../context/toast";
import Toast from "./Toast";
import { useModal } from "../context/modal";

const PokemonCard = React.lazy(
  () => import("../components/PokemonCard/PokemonCard")
);

interface PokemonGridProps {
  pokemonResources: Resource<Pokemon[]>;
}

const PokemonGrid: React.FC<PokemonGridProps> = ({ pokemonResources }) => {
  const { openModal, closeModal } = useModal();
  const [team, setTeam] = usePokemonTeam();
  const { open } = useToast();
  const pokemons = pokemonResources.read();

  const handleDelete = (pokemonId: string) => {
    const filteredPokemons = team.filter((id) => id !== pokemonId);
    setTeam(filteredPokemons);
    closeModal();
    open(
      <Toast
        icon={<MdPlaylistRemove size="2rem" />}
        title="Pokemon removed"
        message="This pokemon is no longer part of your team"
      />
    );
  };

  const handleAddClick = (pokemonId: string) => {
    if (team.includes(pokemonId)) {
      openModal(
        <>
          <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
          <p className="text-gray-600 mb-6">
            Are you sure you want to delete this pokemon from your team?
          </p>
          <div className="flex justify-end">
            <button
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded mr-2"
              onClick={closeModal}
              aria-label="Cancel"
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-red-500 text-white rounded"
              onClick={() => handleDelete(pokemonId)}
              aria-label="Remove"
            >
              Remove
            </button>
          </div>
        </>
      );
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

  return (
    <div className="mt-6 grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-6 justify-center md:justify-start">
      {pokemons.map((pokemon) => {
        const isOnTeam = team.includes(pokemon.id);
        return (
          <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
            ctaLabel={
              isOnTeam ? <MdRemove size={"1rem"} /> : <MdAdd size={"1rem"} />
            }
            onCtaClick={handleAddClick}
            teamIcon={isOnTeam ? <MdShield size="1.5rem" /> : null}
            url={`/collection/${pokemon.name.toLowerCase()}`}
          />
        );
      })}
    </div>
  );
};

export default PokemonGrid;
