import styled from '@emotion/styled';
import { styleVars } from 'globalStyles';
import { useEffect, useState } from 'react';
import { FaRegStar, FaStar } from 'react-icons/fa';

const PokemonCardStyle = styled.li({
  position: 'relative',
  cursor: 'pointer',
  backgroundColor: styleVars.darkBlue,
  borderRadius: styleVars.borderRadius,
  padding: '1em',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  transition: '0.15s',

  '&:hover': {
    backgroundColor: styleVars.blue,
    transform: 'scale(1.05)',
  },
});

const PokemonThumbnail = styled.img({
  height: 'auto',
  maxWidth: '100%',
});

const PokemonName = styled.p({
  margin: 0,
  color: styleVars.white,
});

const FavoriteBtn = styled.button({
  cursor: 'pointer',
  position: 'absolute',
  top: '0.5em',
  right: '0.5em',
  backgroundColor: 'transparent',
  border: 0,
  padding: 0,
  '& svg': {
    height: '1.5em',
    width: '1.5em',
    color: styleVars.yellow,
  },
});

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
    <PokemonCardStyle onClick={() => onSelectPokemon(pokemon)}>
      <PokemonThumbnail
        src={pokemon.sprites.front_default}
        alt={`${pokemon.name}'s front sprite`}
        height={96}
        width={96}
      />
      <PokemonName>{pokemon.name}</PokemonName>
      <FavoriteBtn onClick={toggleFavorite}>
        {isFavorite ? <FaStar color='yellow' /> : <FaRegStar />}
      </FavoriteBtn>
    </PokemonCardStyle>
  );
}
