import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { cleanName } from '../utils/formatName';

import api from '../lib/api';

const useEvolution = (url) => {
  const [evolutionMap, setEvolutionMap] = useState({});
  const [simpleMap, setSimpleMap] = useState([]);
  const pokemonList = useSelector((state) => state.allPokemon);

  const simplifyEvolution = (arrayResponse, nameBase) => {
    if (arrayResponse.length === 0) {
      console.log(nameBase);
      let number1;
      pokemonList.map((pokemon, index) => {
        if (cleanName(pokemon.name) === nameBase) {
          number1 = index + 1;
        }
      });

      const objectEvo = {
        number1,
        name: nameBase,
        trigger: false,
      };

      setSimpleMap((simpleMap) => [...simpleMap, objectEvo]);
    }
    arrayResponse.map((evol) => {
      let form = {},
        trigger = '',
        number1,
        number2;
      const {
        species: { name: nameEvo },
        evolves_to: nextArray,
        evolution_details: formEvo,
      } = evol;

      pokemonList.map((pokemon, index) => {
        if (cleanName(pokemon.name) === nameBase) {
          number1 = index + 1;
        }
        if (cleanName(pokemon.name) === nameEvo) {
          number2 = index + 1;
        }
      });

      if (!number2) {
        if (nameEvo === 'wormadam') {
          number2 = 413;
        }
      }

      const methods = Object.entries(formEvo[0]).filter(
        (entry) => entry[1] !== null && entry[1] !== false && entry[1] !== ''
      );

      methods.map((met) => {
        if (met[0] !== 'trigger') {
          if (typeof met[1] === 'object') {
            form = { ...form, [met[0]]: met[1].name };
          } else {
            form = { ...form, [met[0]]: met[1] };
          }
        } else {
          trigger = met[1].name;
        }
      });

      const objectEvo = {
        number1,
        from: nameBase,
        how: form,
        trigger,
        number2,
        to: nameEvo,
      };
      setSimpleMap((simpleMap) => [...simpleMap, objectEvo]);
      if (nextArray.length > 0) {
        simplifyEvolution(nextArray, nameEvo);
      }
    });
  };

  useEffect(() => {
    async function getEvolutionChainData() {
      api.getResource(url).then((response) => setEvolutionMap(response));
    }
    if (url !== '' && Object.keys(evolutionMap).length === 0) {
      getEvolutionChainData();
    }
    if (Object.keys(evolutionMap).length > 0) {
      const {
        chain: {
          species: { name: nameBase },
          evolves_to: nextArray,
        },
      } = evolutionMap;
      simplifyEvolution(nextArray, nameBase);
    }
  }, [url, evolutionMap]);

  return simpleMap;
};

export default useEvolution;
