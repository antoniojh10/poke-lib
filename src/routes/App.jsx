import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Components
import Header from '../components/Header';
import Home from '../containers/Home';
import PokemonDetails from '../containers/PokemonDetails';

// Styles
import '../assets/sass/Globals.scss';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route
          exact
          path="/pokemon/:name"
          component={PokemonDetails}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
