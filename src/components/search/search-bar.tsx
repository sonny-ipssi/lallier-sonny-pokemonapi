import styled from '@emotion/styled';
import { styleVars } from 'globalStyles';
import { useEffect, useState } from 'react';

const Field = styled.div({
  width: '350px',
  display: 'flex',
  flexDirection: 'column',
});

const Input = styled.input({
  backgroundColor: styleVars.darkBlue,
  padding: '0.75em 1.25em',
  borderRadius: styleVars.borderRadius,
  color: styleVars.lightGray,
  '&::placeholder': {
    color: styleVars.lightBlue,
  },
});

interface SearchBarProps {
  label: string;
  placeholder: string;
  pokemons: Pokemons;
  onSearch: (pokemons: Pokemons) => void;
}

function SearchBar({ label, placeholder, pokemons, onSearch }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const filteredPokemons = pokemons.filter(({ name }) =>
      name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    onSearch(filteredPokemons);
  }, [searchTerm, pokemons]);

  return (
    <Field>
      <label htmlFor='search'>{label}</label>
      <Input
        onChange={({ target }) => setSearchTerm(target.value)}
        placeholder={placeholder}
        name='search'
        id='search'
        value={searchTerm}
        autoFocus
      />
    </Field>
  );
}

export default SearchBar;
