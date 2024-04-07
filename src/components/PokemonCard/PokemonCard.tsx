import { useEffect, useState } from 'react';
import { FaRegStar, FaStar } from 'react-icons/fa';
import './pokemon-card.scss';

export default function PokemonCard({
  pokemon,
  onSelectPokemon,
}: {
  pokemon: Pokemon;
  onSelectPokemon: (value: Pokemon) => void;
}) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('MyPokedex') || '[]');
    setIsFavorite(favorites.includes(pokemon.id));
  }, [pokemon]);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation(); // Pour éviter que l'event de clic se propage au parent (li)
    const favorites = JSON.parse(localStorage.getItem('MyPokedex') || '[]');

    if (favorites.includes(pokemon.id)) {
      // Retirer des favoris
      const newFavorites = favorites.filter((id: number) => id !== pokemon.id);
      localStorage.setItem('MyPokedex', JSON.stringify(newFavorites));
      setIsFavorite(false);
    } else {
      // Ajouter aux favoris
      const newFavorites = [...favorites, pokemon.id];
      localStorage.setItem('MyPokedex', JSON.stringify(newFavorites));
      setIsFavorite(true);
    }
  };

  return (
    <li
      className='pokemon-card'
      onClick={() => onSelectPokemon(pokemon)}
    >
      <img
        src={pokemon.sprites.front_default}
        alt={`${pokemon.name}'s front sprite`}
        height={96}
        width={96}
      />
      <div>{pokemon.name}</div>
      <button
        className='favorite-btn'
        onClick={toggleFavorite}
      >
        {isFavorite ? <FaStar color='yellow' /> : <FaRegStar />}
      </button>
    </li>
  );
}
