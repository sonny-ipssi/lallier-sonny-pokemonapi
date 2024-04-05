import { useEffect, useMemo, useState } from "react";
import { getPokemons, makeRequest } from "utils/api";

import PokemonCard from "../PokemonCard/PokemonCard";

import "./pokemon-list.scss";

interface PokemonListProps {
  searchTerm: string;
  selectedPokemon: Pokemon;
  setSelectedPokemon: (value: Pokemon) => void;
}
function PokemonList({
  searchTerm = "",
  selectedPokemon,
  setSelectedPokemon,
}: PokemonListProps) {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const filterPokemons = useMemo<Pokemon[]>(
    () =>
      pokemons.filter(({ name }) =>
        name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [pokemons, searchTerm]
  );

  useEffect(() => {
    async function start() {
      const { results }: { results: BasePokemon[] } = await getPokemons();
      console.log(results);
      const pokemons = await Promise.all(
        results.map(async (result) => await makeRequest(result.url))
      );
      setPokemons(pokemons);
    }
    start();
  }, []);

  const handleSelectPokemon = (value: Pokemon) => {
    setSelectedPokemon(value);
  };

  return (
    <ul className="pokemon-list">
      {filterPokemons.map((pokemon) => (
        <PokemonCard
          pokemon={pokemon}
          onSelectPokemon={handleSelectPokemon}
          key={pokemon.name.toLowerCase()}
        />
      ))}
    </ul>
  );
}

export default PokemonList;
