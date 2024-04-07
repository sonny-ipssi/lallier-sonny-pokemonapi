import { LS_POKEDEX_KEY } from 'constants/local-storage';

export const extractFromLS = (key: string) =>
  JSON.parse(localStorage.getItem(key) || '[]');

export const getPokemonsByIds = (ids: string[], pokemons: Pokemons) =>
  ids.map((pokemon) => pokemons.find((p) => p.id === Number(pokemon)));

export const removeUndefinedValues = <T>(arr: Array<T>) =>
  arr.filter((p) => typeof p !== 'undefined') ?? [];

export const getFavoritePokemons = (pokemons: Pokemons) => {
  const favoritePokemonsLS = extractFromLS(LS_POKEDEX_KEY);
  const favoritePokemons = getPokemonsByIds(favoritePokemonsLS, pokemons);
  return removeUndefinedValues(favoritePokemons) as Pokemons;
};
