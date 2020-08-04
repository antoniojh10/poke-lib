import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, HashRouter, Switch } from 'react-router-dom';

import { setPokemonList } from '../actions';
import api from '../lib/api';

// Components
import Home from '../pages/Home';
import PokemonDetails from '../pages/PokemonDetails';

// Styles
import '../assets/sass/Globals.scss';

const App = () => {
  const allPokemon = useSelector((state) => state.allPokemon);
  const dispatch = useDispatch();

  const storingAllPoke = useCallback(
    (info) => {
      return dispatch(setPokemonList([...info]));
    },
    [dispatch]
  );

  useEffect(() => {
    async function fetchAllPokemon() {
      const response = await api.getAllPokemon();
      storingAllPoke([...response.results]);
    }

    if (allPokemon.length === 0) {
      fetchAllPokemon();
    }
  }, []);

  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/pokemon/:name" component={PokemonDetails} />
      </Switch>
    </HashRouter>
  );
};

export default App;
