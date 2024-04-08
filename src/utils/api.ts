import { BASE_URL } from 'constants/endpoints';
import { getFavoritePokemons, isFavoritePokemon } from './pokedex';

export const makeRequest = (url: string, method?: RequestInit['method']) =>
  fetch(url, { method }).then((res) => res.json());

export const getPokemons = (limit: number = 151) =>
  makeRequest(`${BASE_URL}?limit=${limit}`);

export async function fetchPokemons() {
  const { results }: { results: BasePokemon[] } = await getPokemons();
  const pokemons = await Promise.all(
    results.map(async (result) => await makeRequest(result.url)),
  );
  const favoritesPokemons = getFavoritePokemons(pokemons);
  return pokemons.map((p) => ({
    ...p,
    favorite: isFavoritePokemon(p, favoritesPokemons),
  })) as Pokemons;
}

export const getPokemonThumnailUrl = (pokemon: Pokemon) =>
  `https://raw.githubusercontent.com/monikode/pokedex/master/assets/pokemon/${pokemon.id}.png`;
