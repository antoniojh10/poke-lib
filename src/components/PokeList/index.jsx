import React, { useState, useEffect } from 'react';

// Components
import LazyCard from '../Card';

// styles
import '../../assets/sass/components/PokeList.scss';

const PokeList = ({ search, allPokemon, sortBy }) => {
  const [pokeList, setPokeList] = useState([]);

  useEffect(() => {
    const allSortedPokemon = [].concat(allPokemon);
    if (sortBy === 'random') {
      allSortedPokemon.sort(() => (Math.random() * 10 < 5 ? 1 : -1));
    }
    if (sortBy === 'a-z' || sortBy === 'z-a') {
      allSortedPokemon.sort((a, b) => {
        if (a.name > b.name) {
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        }
        return 0;
      });
    }
    if (sortBy === 'reverse' || sortBy === 'z-a') {
      allSortedPokemon.reverse();
    }
    const listOfPokemonSearched = allSortedPokemon.filter(({ name }, index) => {
      const pokemonId = (index + 1).toString();
      return name.includes(search) || pokemonId.includes(search);
    });
    setPokeList(listOfPokemonSearched);
    return () => setPokeList([]);
  }, [search, allPokemon, sortBy]);

  return (
    <div className="PokeList">
      {pokeList?.map((poke, id) => {
        return <LazyCard pokemon={poke} key={id} />;
      })}
    </div>
  );
};

export default PokeList;
