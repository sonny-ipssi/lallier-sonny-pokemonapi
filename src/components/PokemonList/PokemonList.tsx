import { useEffect, useMemo, useState } from "react";
import { getPokemons, makeRequest } from "utils/api";

interface BasePokemon {
  name: string;
  url: string;
}

interface Species {
  name: string;
  url: string;
}

interface Sprites {
  back_default: string;
  back_female: string;
  back_shiny: string;
  back_shiny_female: string;
  front_default: string;
  front_female: string;
  front_shiny: string;
  front_shiny_female: string;
}

interface Pokemon {
  abilities: any[];
  base_experience: number;
  forms: any[];
  game_indices: any[];
  height: number;
  held_items: any[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: any[];
  name: string;
  order: number;
  past_types: any[];
  species: Species;
  sprites: Sprites;
  other: any;
  versions: any;
}
function PokemonList({ searchTerm = "" }: { searchTerm: string }) {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const filterPokemons = useMemo<Pokemon[]>(
    () =>
      pokemons.filter(({ name }) =>
        name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [pokemons, searchTerm]
  );

  useEffect(() => {
    async function start() {
      const { results }: { results: BasePokemon[] } = await getPokemons();
      const pokemons = await Promise.all(
        results.map(async (result) => await makeRequest(result.url))
      );
      setPokemons(pokemons);
    }
    start();
  }, []);

  return (
    <ul>
      {filterPokemons.map((pokemon) => (
        <PokemonCard pokemon={pokemon} key={pokemon.name.toLowerCase()} />
      ))}
    </ul>
  );
}

export default PokemonList;

function PokemonCard({ pokemon }: { pokemon: Pokemon }) {
  return (
    <li>
      <img
        src={pokemon.sprites.front_default}
        alt={`${pokemon.name}'s front sprite`}
      />
      {pokemon.name}
    </li>
  );
}
