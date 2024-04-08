import styled from '@emotion/styled';
import PokemonCard from 'components/pokemon-card/pokemon-card';

const PokemonListStyle = styled.ul({
  display: 'flex',
  gap: '1em',
  alignItems: 'center',
  justifyContent: 'center',
  flexWrap: 'wrap',
});

interface PokemonListProps {
  pokemons: Pokemons;
  setSelectedPokemon: (value: Pokemon) => void;
}
function PokemonList({ pokemons, setSelectedPokemon }: PokemonListProps) {
  const handleSelectPokemon = (value: Pokemon) => {
    setSelectedPokemon(value);
  };

  return (
    <PokemonListStyle>
      {pokemons.map((pokemon) => (
        <PokemonCard
          pokemon={pokemon}
          onSelectPokemon={handleSelectPokemon}
          key={pokemon.id}
        />
      ))}
    </PokemonListStyle>
  );
}

export default PokemonList;
