import styled from '@emotion/styled';
import { styleVars } from 'globalStyles';
import { Link } from 'react-router-dom';

const Nav = styled.nav({
  zIndex: 99,
  position: 'fixed',
  width: 'inherit', // inherit to fit parent's width
  backgroundColor: styleVars.darkBlue,
  padding: '0.75em 1.5em',
  boxShadow: `0 2px 4px ${styleVars.lightBlack}`,
  borderRadius: styleVars.borderRadius,
});

const NavItems = styled.ul({
  display: 'flex',
  gap: '1.5em',
  alignItems: 'center',
});

const NavItem = styled.li({
  '& a': {
    color: styleVars.white,
    transition: '.15s',
    '&:hover, &:active': {
      color: styleVars.yellow,
    },
  },
});

export default function Navbar() {
  return (
    <Nav>
      <NavItems>
        <NavItem>
          <Link to='/'>Liste des Pokemons</Link>
        </NavItem>
        <NavItem>
          <Link to='/my-pokedex'>Mon Pokedex</Link>
        </NavItem>
      </NavItems>
    </Nav>
  );
}
