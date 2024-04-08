import styled from '@emotion/styled';
import InlineList from 'components/inline-list';
import PokemonThumbnail from 'components/pokemon-card/pokemon-thumbnail';
import { styleVars } from 'globalStyles';
import usePokemons from 'hooks/usePokemons';
import { useParams } from 'react-router-dom';
import { getPokemonThumnailUrl } from 'utils/api';
import { getPokemonById, getPokemonType } from 'utils/pokedex';

const Container = styled.div({
  fontSize: '18px',
  marginTop: '2em',
  display: 'flex',
  gap: '2em',
});

const Column = styled.div({
  display: 'flex',
  gap: '.75em',
  flexDirection: 'column',
});

const PokemonID = styled.div({
  fontSize: '3em',
  lineHeight: '1em',
  opacity: 0.3,
});

const RowLine = styled.div({
  display: 'flex',
  gap: '.75em',
  alignItems: 'center',
});

const RowLineHeader = styled.span({
  color: styleVars.gray,
});

const Title = styled.h1({
  lineHeight: '1em',
  fontSize: '5.5em',
  color: styleVars.white,
  textTransform: 'capitalize',
  margin: '0 0 .5em',
});

const FavoriteBtn = styled.button({
  cursor: 'pointer',
  color: styleVars.white,
  backgroundColor: styleVars.blue,
  borderRadius: styleVars.borderRadius,
  padding: '.5em',
  display: 'flex',
  gap: '1em',
  alignItems: 'center',
  justifyContent: 'center',
});

export default function PokemonDetailsPage() {
  const { id } = useParams();
  const { pokemons, toggleStatus } = usePokemons();
  const pokemon = getPokemonById(id!, pokemons);

  if (!pokemon) {
    return <>Pokemon introuvable</>;
  }

  const toggleFavorite = () => toggleStatus(pokemon);

  return (
    <Container
      style={{
        backgroundColor: `linear-gradient(180deg, rgba(255, 255, 255, 0.63) 0%, rgba(0, 0, 0, 0.63) 100%), ${getPokemonType(pokemon).color}`,
      }}
    >
      <Column>
        <PokemonThumbnail
          src={getPokemonThumnailUrl(pokemon)}
          alt={`${pokemon.name}'s front sprite`}
          height={296}
          width={296}
        />
        <FavoriteBtn onClick={toggleFavorite}>
          {' '}
          <PokemonThumbnail
            src={'/pokeball.png'}
            alt='pokeball'
            height={24}
            width={24}
          />{' '}
          {pokemon.favorite
            ? 'Retirer de mon Pokédex'
            : 'Ajouter à mon Pokédex'}
        </FavoriteBtn>
      </Column>
      <Column>
        <PokemonID>#{pokemon.id.toString().padStart(3, '0')}</PokemonID>
        <Title>{pokemon.name}</Title>

        <RowLine>
          <RowLineHeader>Types</RowLineHeader>{' '}
          <InlineList childCss={{ textTransform: 'capitalize' }}>
            {pokemon.types.map(({ type }) => type.name)}
          </InlineList>
        </RowLine>
        <RowLine>
          <RowLineHeader>Taille</RowLineHeader> {pokemon.height / 10}M
        </RowLine>
        <RowLine>
          <RowLineHeader>Poids</RowLineHeader> {pokemon.weight / 10}Kg
        </RowLine>
        <RowLine>
          <RowLineHeader>Abilités</RowLineHeader>{' '}
          <InlineList childCss={{ textTransform: 'capitalize' }}>
            {pokemon.abilities.map(({ ability }) => ability.name)}
          </InlineList>
        </RowLine>
      </Column>
    </Container>
  );
}
