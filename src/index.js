import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, compose } from 'redux';
import Favicon from 'react-favicon';
import icon from '../public/favicon.ico';

import reducer from './reducers';

import App from './routes/App';

const initialState = {
  allPokemon: [],
  pokemons: [],
  search: '',
  sortBy: 'random',
};

/*
sort: 'random', 'a-z', 'z-a', reverse, classic
*/

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancers());

ReactDOM.render(
  <Provider store={store}>
    <Favicon url={icon} />
    <App />
  </Provider>,

  document.getElementById('app')
);
