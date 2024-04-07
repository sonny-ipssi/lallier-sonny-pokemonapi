import { PokemonContext } from 'contexts/pokemonContext';
import { useContext } from 'react';

const usePokemons = () => useContext(PokemonContext);
export default usePokemons;
