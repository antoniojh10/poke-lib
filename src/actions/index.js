import { SET_POKEMON_LIST, SET_POKEMON_BASIC } from '../types';

export const setPokemonList = (payload) => ({
  type: SET_POKEMON_LIST,
  payload,
});

export const setPokemonBasic = (payload) => ({
  type: SET_POKEMON_BASIC,
  payload,
});
