import {
  SET_POKEMON_LIST,
  SET_POKEMON_BASIC,
  ON_SEARCH,
  TOGGLE_MENU_SORT,
  SET_SORT,
} from '../types';

const reducer = (state, action) => {
  switch (action.type) {
    case SET_POKEMON_LIST:
      return { ...state, allPokemon: [...action.payload] };

    case SET_POKEMON_BASIC:
      return {
        ...state,
        pokemons: [...state.pokemons, action.payload],
      };

    case ON_SEARCH:
      return {
        ...state,
        search: action.payload,
      };

    case TOGGLE_MENU_SORT:
      return {
        ...state,
        menuSort: action.payload,
      };

    case SET_SORT:
      return {
        ...state,
        sortBy: action.payload,
        menuSort: false,
      };

    default:
      return state;
  }
};

export default reducer;
