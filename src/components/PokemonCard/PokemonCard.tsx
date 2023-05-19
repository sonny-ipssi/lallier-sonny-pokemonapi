import "./pokemon-card.scss";

export default function PokemonCard({
  pokemon,
  onSelectPokemon,
}: {
  pokemon: Pokemon;
  onSelectPokemon: (value: Pokemon) => void;
}) {
  return (
    <li className="pokemon-card" onClick={() => onSelectPokemon(pokemon)}>
      <img
        src={pokemon.sprites.front_default}
        alt={`${pokemon.name}'s front sprite`}
      />
      {pokemon.name}
    </li>
  );
}
