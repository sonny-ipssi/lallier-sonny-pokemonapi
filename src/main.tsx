import { PokemonContextProvider } from 'contexts/pokemonContext';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.scss';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <PokemonContextProvider>
    <App />
  </PokemonContextProvider>,
);
