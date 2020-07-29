import React, { useState, useEffect } from 'react';
import classNames from 'classnames';

import api from '../../lib/api';

// Components
import Pokemon from './Pokemon';

const Card = ({ pokemon }) => {
  const [info, setInfo] = useState({});
  const [types, setTypes] = useState([]);

  useEffect(() => {
    async function fetchPokemon() {
      const response = await api.callPokemon(pokemon.name);
      setInfo({ ...response });

      const typesList = Object.keys(response.types).map((index) => {
        return response.types[index].type.name;
      });
      setTypes(typesList);
    }
    fetchPokemon();
    return () => {
      setInfo({});
    };
  }, [pokemon]);

  const cardClass = classNames('Card', types[0]);

  return (
    <div className={cardClass}>
      <Pokemon data={info} />
    </div>
  );
};

export default Card;
