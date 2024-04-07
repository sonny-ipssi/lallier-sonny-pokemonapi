import { BASE_URL } from 'constants/endpoints';

export function makeRequest(url: string, method?: RequestInit['method']) {
  return fetch(url, { method }).then((res) => res.json());
}

export function getPokemons(limit: number = 151) {
  return makeRequest(`${BASE_URL}?limit=${limit}`);
}
