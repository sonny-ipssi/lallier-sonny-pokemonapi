import styled from '@emotion/styled';
import Modal from 'components/modal/modal';
import PokemonList from 'components/PokemonList/PokemonList';
import SearchBar from 'components/search/search-bar';
import { AnimatePresence } from 'framer-motion';
import usePokemons from 'hooks/usePokemons';
import { useState } from 'react';

const HeaderTitle = styled.h1({
  marginBottom: 0,
});

export default function HomePage() {
  const { pokemons } = usePokemons();
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemons>(pokemons);

  return (
    <>
      <HeaderTitle>Pokédex</HeaderTitle>
      <SearchBar
        label='Rechercher un Pokemon'
        placeholder='Entrez le nom du Pokemon'
        onSearch={setFilteredPokemons}
        pokemons={pokemons}
      />
      <PokemonList
        pokemons={filteredPokemons}
        setSelectedPokemon={setSelectedPokemon}
      />
      <AnimatePresence>
        {selectedPokemon && (
          <Modal
            close={() => setSelectedPokemon(null)}
            bodyClass='modal-pokemon-details'
            containerClass='modal-pokemon-container'
          >
            <img src={selectedPokemon.sprites.front_default} />
            <PokemonDetails pokemon={selectedPokemon} />
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
}

function PokemonDetails({ pokemon }: { pokemon: Pokemon }) {
  const { name, id, height, types } = pokemon;
  return (
    <ul>
      <li className='pokemon-id'>ID: {id}</li>
      <li className='pokemon-name'>{name}</li>
      <li className='pokemon-height'>Taille: {height}</li>
      <li className='pokemon-type'>{types[0].type.name || 'unknown'}</li>
    </ul>
  );
}
