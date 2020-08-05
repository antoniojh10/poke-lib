import {
  SET_POKEMON_LIST,
  SET_POKEMON_BASIC,
  ON_SEARCH,
  TOGGLE_MENU_SORT,
  SET_SORT,
} from '../types';

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

export const toggleMenuSort = (payload) => ({
  type: TOGGLE_MENU_SORT,
  payload,
});

export const setSort = (payload) => ({
  type: SET_SORT,
  payload,
});
