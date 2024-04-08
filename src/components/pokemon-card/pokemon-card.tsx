import styled from '@emotion/styled';
import { styleVars } from 'globalStyles';
import usePokemons from 'hooks/usePokemons';
import { useState } from 'react';
import { FaRegStar, FaStar } from 'react-icons/fa';
import '../../styles/pokeball-animation.css';
import PokemonThumbnail from './pokemon-thumbnail';

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
  '& img': {
    height: '1.5em',
    width: '1.5em',
  },
});

const PokemonId = styled.p({
  position: 'absolute',
  top: '0.5em',
  left: '0.5em',
  color: styleVars.lightGray,
  fontSize: '0.8em',
});

const POKEBALL_ANIMATION_DELAY = 7_000;

export default function PokemonCard({
  pokemon,
  onSelectPokemon,
}: {
  pokemon: Pokemon;
  onSelectPokemon: (value: Pokemon) => void;
}) {
  const { toggleStatus } = usePokemons();
  const [caught, setCaught] = useState(false);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleStatus(pokemon);
    if (!pokemon.favorite) {
      setCaught(true);
      setTimeout(() => setCaught(false), POKEBALL_ANIMATION_DELAY);
    }
  };

  return (
    <PokemonCardStyle onClick={() => onSelectPokemon(pokemon)}>
      {caught ? (
        <div className='pokeball'></div>
      ) : (
        <PokemonThumbnail
          src={pokemon.sprites.front_default}
          alt={`${pokemon.name}'s front sprite`}
          height={96}
          width={96}
        />
      )}
      <PokemonName>
        {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
      </PokemonName>
      <PokemonId>#{pokemon.id.toString().padStart(3, '0')}</PokemonId>
      <FavoriteBtn onClick={toggleFavorite}>
        <img
          src='/pokeball.png'
          alt='Pokeball'
          style={{
            width: '24px',
            height: '24px',
            filter: pokemon.favorite ? 'none' : 'brightness(60%) saturate(60%)',
          }}
        />
      </FavoriteBtn>
    </PokemonCardStyle>
  );
}
