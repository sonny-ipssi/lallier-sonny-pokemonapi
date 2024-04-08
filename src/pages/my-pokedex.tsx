import styled from '@emotion/styled';
import Modal from 'components/modal/modal';
import PokemonList from 'components/pokemon-list/pokemon-list';
import SearchBar from 'components/search/search-bar';
import { AnimatePresence } from 'framer-motion';
import { styleVars } from 'globalStyles';
import usePokemons from 'hooks/usePokemons';
import { useMemo, useState } from 'react';

const ClearPokemonsBtn = styled.button({
  cursor: 'pointer',
  backgroundColor: styleVars.red,
  color: styleVars.white,
  border: 'none',
  padding: '0.5em 1em',
  margin: '1em 0',
  borderRadius: styleVars.borderRadius,
  transition: '0.15s',

  '&:hover': {
    backgroundColor: styleVars.lightRed,
  },

  '&:active': {
    transform: 'translateY(2px)',
  },

  '&:focus': {
    outline: 'none',
    boxShadow: `0 0 0 2px ${styleVars.darkRed}`,
  },
});

export default function MyPokedexPage() {
  const { pokemons, clearPokemons } = usePokemons();
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const favoritesPokemons = useMemo(
    () => pokemons.filter((p) => p.favorite),
    [pokemons],
  );

  const [filteredPokemons, setFilteredPokemons] =
    useState<Pokemons>(favoritesPokemons);

  return (
    <>
      <h1>Mon Pokédex</h1>
      {favoritesPokemons.length > 0 ? (
        <>
          <SearchBar
            label='Rechercher un Pokemon dans mon Pokedex'
            placeholder='Entrez le nom du Pokemon'
            pokemons={favoritesPokemons}
            onSearch={setFilteredPokemons}
          />
          <ClearPokemonsBtn onClick={clearPokemons}>
            Supprimer tous les Pokémon
          </ClearPokemonsBtn>
          <PokemonList
            pokemons={filteredPokemons}
            setSelectedPokemon={setSelectedPokemon}
          />
        </>
      ) : (
        <p>
          Il n'y a rien à voir par ici.. Ajoute des Pokémon en favoris pour les
          faire apparaître dans ton Pokedex !
        </p>
      )}
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
