import styled from '@emotion/styled';
import PokemonList from 'components/pokemon-list/pokemon-list';
import SearchBar from 'components/search/search-bar';
import usePokemons from 'hooks/usePokemons';
import { useState } from 'react';

const HeaderTitle = styled.h1({
  marginBottom: 0,
});

export default function HomePage() {
  const { pokemons } = usePokemons();
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemons>(pokemons);

  return (
    <>
      <HeaderTitle>Pokédex</HeaderTitle>
      <SearchBar
        label='Rechercher un Pokemon'
        placeholder='Pikasiette'
        onSearch={setFilteredPokemons}
        pokemons={pokemons}
      />
      <PokemonList pokemons={filteredPokemons} />
    </>
  );
}
