import React, { useState, useEffect } from 'react';
import LazyLoad from 'react-lazyload';

// Components
import Card from './Card';
import Loader from '../Loader';

const PokeList = ({ search, allPokemon }) => {
  const [pokeList, setPokeList] = useState([]);

  useEffect(() => {
    setPokeList(
      allPokemon.filter(({ name }) => {
        return name.includes(search);
      })
    );
  }, [search, allPokemon]);

  return (
    <div className="PokeList">
      {pokeList?.map((poke, id) => {
        return (
          <LazyLoad key={id} placeholder={<Loader />} offset={200}>
            <Card pokemon={poke} key={id} />
          </LazyLoad>
        );
      })}
    </div>
  );
};

export default PokeList;
