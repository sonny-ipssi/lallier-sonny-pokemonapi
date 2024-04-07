import { Global } from '@emotion/react';
import styled from '@emotion/styled';
import { PokemonContextProvider } from 'contexts/pokemonContext';
import { ReactNode } from 'react';
import { cssReset, htmlBodyStyle } from '../../globalStyles';

const Container = styled.div({
  position: 'relative',
  width: '1200px',
  display: 'flex',
  gap: '3em',
  alignItems: 'center',
  flexDirection: 'column',

  '@media (max-width: 1200px)': {
    width: '100%',
  },
});

const PageContainer = ({ children }: { children: ReactNode }) => (
  <Container>
    <Global styles={cssReset} />
    <Global styles={htmlBodyStyle} />
    <PokemonContextProvider>{children}</PokemonContextProvider>
  </Container>
);

export default PageContainer;
