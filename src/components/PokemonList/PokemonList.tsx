import PokemonCard from 'components/PokemonCard/PokemonCard';
import usePokemons from 'hooks/usePokemons';
import { useMemo } from 'react';
import './pokemon-list.scss';

interface PokemonListProps {
  searchTerm: string;
  setSelectedPokemon: (value: Pokemon) => void;
}
function PokemonList({
  searchTerm = '',
  setSelectedPokemon,
}: PokemonListProps) {
  const { pokemons, isLoading } = usePokemons();
  const filterPokemons = useMemo<Pokemon[]>(
    () =>
      pokemons.filter(({ name }) =>
        name.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    [pokemons, searchTerm],
  );

  const handleSelectPokemon = (value: Pokemon) => {
    setSelectedPokemon(value);
  };

  return (
    <>
      {isLoading && <p>Chargement des pokémons</p>}
      {!isLoading && pokemons.length !== 0 && (
        <ul className='pokemon-list'>
          {filterPokemons.map((pokemon) => (
            <PokemonCard
              pokemon={pokemon}
              onSelectPokemon={handleSelectPokemon}
              key={pokemon.name.toLowerCase()}
            />
          ))}
        </ul>
      )}
    </>
  );
}

export default PokemonList;
