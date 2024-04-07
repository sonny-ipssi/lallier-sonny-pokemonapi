import { useState, useEffect, useCallback, ChangeEvent } from 'react';
import { getPokemons, makeRequest } from 'utils/api';
import PokemonCard from '../PokemonCard/PokemonCard';
import Modal from '../Modal/Modal';
import './MyPokedex.scss';

const MyPokedex = () => {
  const [myPokemons, setMyPokemons] = useState<Pokemon[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

  const fetchMyPokemons = useCallback(async () => {
    const storedPokemonIds = JSON.parse(
      localStorage.getItem('MyPokedex') || '[]',
    );
    const { results }: { results: BasePokemon[] } = await getPokemons();
    const allPokemons = await Promise.all(
      results.map(async (result) => await makeRequest(result.url)),
    );
    const filteredPokemons = allPokemons.filter(
      (pokemon) =>
        storedPokemonIds.includes(pokemon.id) &&
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setMyPokemons(filteredPokemons);
  }, [searchTerm]);

  useEffect(() => {
    fetchMyPokemons();
  }, [fetchMyPokemons]);

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
    <div>
      <h1>Mon Pokedex</h1>
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
          <button
            onClick={clearMyPokedex}
            className='clear-pokedex'
          >
            Supprimer tous les Pokémon
          </button>
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
    </div>
  );
};

export default MyPokedex;
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
