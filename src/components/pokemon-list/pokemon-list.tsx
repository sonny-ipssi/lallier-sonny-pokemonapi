import styled from '@emotion/styled';
import PokemonCard from 'components/pokemon-card/pokemon-card';

const PokemonListStyle = styled.ul({
  display: 'flex',
  gap: '1em',
  alignItems: 'center',
  justifyContent: 'center',
  flexWrap: 'wrap',
});

const PokemonList = ({ pokemons }: { pokemons: Pokemons }) => (
  <PokemonListStyle>
    {pokemons.map((pokemon) => (
      <PokemonCard
        pokemon={pokemon}
        key={pokemon.id}
      />
    ))}
  </PokemonListStyle>
);

export default PokemonList;
