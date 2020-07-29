import React, { useState, useEffect } from 'react';
import api from '../lib/api';

// Components
import PokeList from '../components/PokeList';

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
      <input type="text" value={search} onChange={handleChange} />
      <PokeList
        search={search.toLowerCase()}
        allPokemon={allPokemon}
      />
    </>
  );
};

export default Home;
