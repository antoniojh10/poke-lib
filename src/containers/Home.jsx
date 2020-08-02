import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

// Components
import Header from '../components/Header';
import PokeList from '../components/PokeList';

// styles
import '../assets/sass/components/Home.scss';

const Home = () => {
  const allPokemon = useSelector((state) => state.allPokemon);
  const [search, setSearch] = useState('');

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <>
      <Header />
      <h1>Pokedex</h1>
      <p>
        Search Pokémon by name or using the National Pokédex number.
      </p>
      <div className="Search">
        <input
          type="text"
          value={search}
          onChange={handleChange}
          placeholder="What pokemon are you looking for?"
        />
        <FontAwesomeIcon icon={faSearch} />
      </div>

      <PokeList
        search={search.toLowerCase()}
        allPokemon={allPokemon}
      />
    </>
  );
};

export default Home;
