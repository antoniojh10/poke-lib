import React, { useState, useEffect } from 'react';

// Components
import LazyCard from '../Card';

// styles
import '../../assets/sass/components/PokeList.scss';

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
        return <LazyCard pokemon={poke} key={id} />;
      })}
    </div>
  );
};

export default PokeList;
