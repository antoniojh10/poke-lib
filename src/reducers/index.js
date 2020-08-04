import { SET_POKEMON_LIST, SET_POKEMON_BASIC, ON_SEARCH } from '../types';

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

    default:
      return state;
  }
};

export default reducer;
