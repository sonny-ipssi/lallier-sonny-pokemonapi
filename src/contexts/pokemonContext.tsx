import { LS_POKEDEX_KEY } from 'constants/local-storage';
import { ReactNode, createContext, useEffect, useState } from 'react';
import { fetchPokemons } from 'utils/api';
import {
  getFavoritePokemons,
  isFavoritePokemon,
  removeLSFromKey,
  storeFavoritePokemons,
} from 'utils/pokedex';

type PokemonContextType = {
  pokemons: Pokemons;
  isLoading: boolean;
  toggleStatus: (pokemon: Pokemon) => void;
  clearPokemons: () => void;
};

const iPokemonContextState: PokemonContextType = {
  pokemons: [],
  isLoading: true,
  toggleStatus: () => {},
  clearPokemons: () => {},
};

export const PokemonContext =
  createContext<PokemonContextType>(iPokemonContextState);

export function PokemonContextProvider({ children }: { children: ReactNode }) {
  const [pokemons, setPokemons] = useState<Pokemons>(
    iPokemonContextState.pokemons,
  );
  const [isLoading, setLoading] = useState<boolean>(
    iPokemonContextState.isLoading,
  );

  const toggleStatus = (pokemon: Pokemon) => {
    setPokemons((_pokemons) => {
      const pokemonsCopy = [..._pokemons];

      const pokemonIndex = pokemonsCopy.findIndex((t) => t.id === pokemon.id);
      const pokemonItem = pokemonsCopy[pokemonIndex];

      if (pokemonIndex !== -1) {
        pokemonsCopy[pokemonIndex] = {
          ...pokemonItem,
          favorite: !pokemonItem.favorite,
        };
      }

      const favoritePokemons = getFavoritePokemons(pokemons);
      const newFavoritesPokemons = [...favoritePokemons];
      if (!isFavoritePokemon(pokemon, favoritePokemons)) {
        newFavoritesPokemons.push(pokemon);
      } else {
        const pokemonIndex = newFavoritesPokemons.findIndex(
          (p) => p.id === pokemon.id,
        );
        newFavoritesPokemons.splice(pokemonIndex, 1);
      }

      storeFavoritePokemons(newFavoritesPokemons);
      return pokemonsCopy;
    });
  };

  const clearPokemons = () => {
    removeLSFromKey(LS_POKEDEX_KEY);
    setPokemons([]);
  };

  useEffect(() => {
    setLoading(true);
    fetchPokemons()
      .then((pokemons) => {
        setLoading(false);
        setPokemons(pokemons);
      })
      .catch(() => alert('An error has occured while fetching pokemons'));
  }, []);

  return (
    <PokemonContext.Provider
      value={{
        pokemons,
        isLoading,
        toggleStatus,
        clearPokemons,
      }}
    >
      {isLoading && <p>Chargement des pokémons</p>}
      {!isLoading && children}
    </PokemonContext.Provider>
  );
}
