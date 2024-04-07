import { ReactNode, createContext, useEffect, useState } from 'react';
import { fetchPokemons } from 'utils/api';

type PokemonContextType = {
  pokemons: Pokemons;
  toggleStatus: (pokemon: Pokemon) => void;
  isLoading: boolean;
};

const iPokemonContextState: PokemonContextType = {
  pokemons: [],
  toggleStatus: () => {},
  isLoading: true,
};

export const PokemonContext =
  createContext<PokemonContextType>(iPokemonContextState);

export function PokemonContextProvider({ children }: { children: ReactNode }) {
  const [pokemons, setPokemons] = useState<Pokemons>(
    iPokemonContextState.pokemons,
  );
  const [isLoading, setLoading] = useState<boolean>(
    iPokemonContextState.isLoading,
  );

  // const toggleStatus = (task: Task) => {
  //   setPokemons((_todoList) => {
  //     const todoListCopy = [..._todoList];

  //     const todoItemIndex = todoListCopy.findIndex((t) => t.id === task.id);
  //     const todoItem = todoListCopy[todoItemIndex];

  //     if (todoItemIndex !== -1) {
  //       todoListCopy[todoItemIndex] = {
  //         ...todoItem,
  //         completed: !todoItem.completed,
  //       };
  //     }

  //     return todoListCopy;
  //   });
  // };

  useEffect(() => {
    setLoading(true);
    fetchPokemons()
      .then((pokemons) => {
        setLoading(false);
        setPokemons(pokemons);
      })
      .catch(() => alert('An error has occured while fetching pokemons'));
  }, []);

  return (
    <PokemonContext.Provider
      value={{
        pokemons,
        toggleStatus: iPokemonContextState.toggleStatus,
        isLoading,
      }}
    >
      {isLoading && <p>Chargement des pokémons</p>}
      {!isLoading && children}
    </PokemonContext.Provider>
  );
}
