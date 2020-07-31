import React from 'react';
import { Route, HashRouter, Switch } from 'react-router-dom';

// Components
import Home from '../containers/Home';
import PokemonDetails from '../containers/PokemonDetails';

// Styles
import '../assets/sass/Globals.scss';

const App = () => {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route
          exact
          path="/pokemon/:name"
          component={PokemonDetails}
        />
      </Switch>
    </HashRouter>
  );
};

export default App;
