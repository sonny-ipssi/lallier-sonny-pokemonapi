import PageContainer from 'components/layout/page-container';
import Navbar from 'components/navbar/navbar';
import HomePage from 'pages/home';
import MyPokedexPage from 'pages/my-pokedex';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

const App = () => (
  <Router>
    <Navbar />
    <div className='app'>
      <PageContainer>
        <Routes>
          <Route
            path='/'
            element={<HomePage />}
          />
          <Route
            path='/my-pokedex'
            element={<MyPokedexPage />}
          />
        </Routes>
      </PageContainer>
    </div>
  </Router>
);

export default App;
