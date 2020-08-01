import React, { useState, useEffect } from 'react';

// Components
import LazyCard from '../Card';

// styles
import '../../assets/sass/components/PokeList.scss';

const PokeList = ({ search, allPokemon }) => {
  const [pokeList, setPokeList] = useState([]);

  useEffect(() => {
    const listOfPokemonSeacrched = allPokemon.filter(
      ({ name }, index) => {
        const pokemonId = (index + 1).toString();
        return name.includes(search) || pokemonId.includes(search);
      }
    );
    setPokeList(listOfPokemonSeacrched);
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
