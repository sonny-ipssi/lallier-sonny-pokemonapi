import styled from '@emotion/styled';
import Modal from 'components/modal/modal';
import PokemonList from 'components/PokemonList/PokemonList';
import { AnimatePresence } from 'framer-motion';
import { ChangeEvent, useState } from 'react';

const HeaderTitle = styled.h1({
  marginBottom: 0,
});

export default function HomePage() {
  const [search, setSearch] = useState<string>('');
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value);
  return (
    <>
      <HeaderTitle>Pokédex</HeaderTitle>
      <div className='field'>
        <label htmlFor='search'>Rechercher un Pokemon</label>
        <input
          onChange={handleChange}
          placeholder='Pikasiette'
          name='search'
          id='search'
          value={search}
          autoFocus
        />
      </div>
      <PokemonList
        searchTerm={search}
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
