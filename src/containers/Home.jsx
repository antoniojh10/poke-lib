import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import api from '../lib/api';

// Components
import PokeList from '../components/PokeList';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
  const [allPokemon, setAllPokemon] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function fetchAllPokemon() {
      const response = await api.getAllPokemon();
      setAllPokemon([...response.results]);
    }
    fetchAllPokemon();
  }, []);

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <>
      <h1>Pokedex</h1>
      <p>Search for Pokemon by name.</p>
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
