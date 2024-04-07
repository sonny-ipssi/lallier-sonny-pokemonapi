import styled from '@emotion/styled';
import PokemonCard from 'components/pokemon-card/pokemon-card';
import usePokemons from 'hooks/usePokemons';
import { useMemo } from 'react';

const PokemonListStyle = styled.ul({
  display: 'flex',
  gap: '1em',
  alignItems: 'center',
  justifyContent: 'center',
  flexWrap: 'wrap',
});

interface PokemonListProps {
  searchTerm: string;
  setSelectedPokemon: (value: Pokemon) => void;
}
function PokemonList({
  searchTerm = '',
  setSelectedPokemon,
}: PokemonListProps) {
  const { pokemons } = usePokemons();
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
    <PokemonListStyle>
      {filterPokemons.map((pokemon) => (
        <PokemonCard
          pokemon={pokemon}
          onSelectPokemon={handleSelectPokemon}
          key={pokemon.name.toLowerCase()}
        />
      ))}
    </PokemonListStyle>
  );
}

export default PokemonList;
