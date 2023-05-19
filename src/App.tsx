import { ChangeEvent, useState } from "react";

import Modal from "components/Modal/Modal";
import PokemonList from "./components/PokemonList/PokemonList";

import "styles/app.scss";

const App = () => {
  const [search, setSearch] = useState<string>("");
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value);

  return (
    <div className="app">
      <div className="field">
        <label htmlFor="search">Rechercher un pokément</label>
        <input
          onChange={handleChange}
          placeholder="Pikasiette"
          name="search"
          id="search"
        />
      </div>
      <PokemonList
        searchTerm={search}
        selectedPokemon={selectedPokemon}
        setSelectedPokemon={setSelectedPokemon}
      />
      {selectedPokemon && (
        <Modal
          close={() => setSelectedPokemon(null)}
          bodyClass="modal-pokemon-details"
          containerClass="modal-pokemon-container"
        >
          <img src={selectedPokemon.sprites.front_default} />
          <PokemonDetails pokemon={selectedPokemon} />
        </Modal>
      )}
    </div>
  );
};

export default App;

function PokemonDetails({ pokemon }: { pokemon: Pokemon }) {
  const { name, id, height, types } = pokemon;

  return (
    <ul>
      <li className="pokemon-id">ID: {id}</li>
      <li className="pokemon-name">{name}</li>
      <li className="pokemon-height">Taille: {height}</li>
      <li className="pokemon-type">{types[0].type.name || "unknown"}</li>
    </ul>
  );
}
