import { BASE_URL } from 'constants/endpoints';

export function makeRequest(url: string, method?: RequestInit['method']) {
  return fetch(url, { method }).then((res) => res.json());
}

export function getPokemons(limit: number = 151) {
  return makeRequest(`${BASE_URL}?limit=${limit}`);
}

export async function fetchPokemons() {
  const { results }: { results: BasePokemon[] } = await getPokemons();
  const pokemons = await Promise.all(
    results.map(async (result) => await makeRequest(result.url)),
  );
  return pokemons as Pokemons;
}
