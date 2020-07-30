import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setPokemonBasic } from '../actions';
import api from '../lib/api';

const useOnePokemon = (pokemonName) => {
  const dispatch = useDispatch();
  const list = useSelector((state) => state.pokemons);
  const [info, setInfo] = useState({});
  const [types, setTypes] = useState([]);

  const storingPoke = useCallback(
    (info) => {
      return dispatch(setPokemonBasic({ ...info }));
    },
    [dispatch]
  );

  const handleTypes = (poke) => {
    const typesList = Object.keys(poke.types).map((index) => {
      return poke.types[index].type.name;
    });
    setTypes(typesList);
  };

  useEffect(() => {
    async function fetchPokemon() {
      const response = await api.callPokemon(pokemonName);
      setInfo({ ...response });
      storingPoke({ ...response });

      handleTypes(response);
    }

    const found = list.find((elem) => elem.name === pokemonName);

    if (found) {
      setInfo({ ...found });
      handleTypes(found);
    } else {
      fetchPokemon();
    }
  }, [pokemonName]);

  return { info, types };
};

export default useOnePokemon;
