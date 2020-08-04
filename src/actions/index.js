import { SET_POKEMON_LIST, SET_POKEMON_BASIC, ON_SEARCH } from '../types';

export const setPokemonList = (payload) => ({
  type: SET_POKEMON_LIST,
  payload,
});

export const setPokemonBasic = (payload) => ({
  type: SET_POKEMON_BASIC,
  payload,
});

export const onSearch = (payload) => ({
  type: ON_SEARCH,
  payload,
});
