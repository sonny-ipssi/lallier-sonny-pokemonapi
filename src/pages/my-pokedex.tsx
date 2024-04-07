import styled from '@emotion/styled';
import Modal from 'components/modal/modal';
import PokemonCard from 'components/pokemon-card/pokemon-card';
import { styleVars } from 'globalStyles';
import usePokemons from 'hooks/usePokemons';
import { ChangeEvent, useEffect, useState } from 'react';

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
  const { pokemons } = usePokemons();
  const [myPokemons, setMyPokemons] = useState<Pokemon[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

  const getMyPokemons = () => {
    const storedPokemonIds = JSON.parse(
      localStorage.getItem('MyPokedex') || '[]',
    );
    const filteredPokemons = pokemons.filter(
      (pokemon) =>
        storedPokemonIds.includes(pokemon.id) &&
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setMyPokemons(filteredPokemons);
  };

  useEffect(() => {
    getMyPokemons();
  }, [pokemons]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  const clearMyPokedex = () => {
    localStorage.removeItem('MyPokedex');
    setMyPokemons([]);
  };

  const handleSelectPokemon = (pokemon: Pokemon) => {
    setSelectedPokemon(pokemon);
  };

  return (
    <>
      <h1>Mon Pokédex</h1>
      {myPokemons.length > 0 ||
      (myPokemons.length == 0 && searchTerm.length > 0) ? (
        <>
          <div className='field'>
            <label htmlFor='search'>
              Rechercher un Pokemon dans mon Pokedex
            </label>
            <input
              onChange={handleChange}
              placeholder='Entrez le nom du Pokemon'
              value={searchTerm}
              name='search'
              id='search'
            />
          </div>
          <ClearPokemonsBtn onClick={clearMyPokedex}>
            Supprimer tous les Pokémon
          </ClearPokemonsBtn>
          <ul className='pokemon-list'>
            {myPokemons.map((pokemon) => (
              <PokemonCard
                pokemon={pokemon}
                onSelectPokemon={handleSelectPokemon}
                key={pokemon.id}
              />
            ))}
          </ul>
        </>
      ) : (
        <p>
          Il n'y a rien à voir par ici.. Ajoute des Pokémon en favoris pour les
          faire apparaître dans ton Pokedex !
        </p>
      )}
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
