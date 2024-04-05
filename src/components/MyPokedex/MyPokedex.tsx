import { useEffect, useState, useCallback } from "react";
import { getPokemons, makeRequest } from "utils/api";
import PokemonCard from "../PokemonCard/PokemonCard";

const MyPokedex = () => {
  const [myPokemons, setMyPokemons] = useState<Pokemon[]>([]);
  const [updateTrigger, setUpdateTrigger] = useState(false); 

  const fetchMyPokemons = useCallback(async () => {
    const storedPokemonIds = JSON.parse(localStorage.getItem('MyPokedex') || '[]');
    const { results }: { results: BasePokemon[] } = await getPokemons();
    const allPokemons = await Promise.all(
      results.map(async (result) => await makeRequest(result.url))
    );
    const filteredPokemons = allPokemons.filter(pokemon => 
      storedPokemonIds.includes(pokemon.id)
    );
    setMyPokemons(filteredPokemons);
  }, []);
  const updateMyPokedex = () => {
    setUpdateTrigger(prev => !prev);
  };

  useEffect(() => {
    fetchMyPokemons();
  }, [fetchMyPokemons,updateMyPokedex, updateTrigger]);

  useEffect(() => {
    const handleStorageChange = () => {
      setUpdateTrigger(prev => !prev); 
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <ul className="pokemon-list">
      {myPokemons.map((pokemon) => (
        <PokemonCard
          pokemon={pokemon}
          onSelectPokemon={() => {}} 
          key={pokemon.id}
        />
      ))}
    </ul>
  );
};

export default MyPokedex;
