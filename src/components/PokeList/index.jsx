import React, { useState, useEffect } from 'react';

// Components
import Card from './Card';

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
        return <Card pokemon={poke} key={id} />;
      })}
    </div>
  );
};

export default PokeList;
