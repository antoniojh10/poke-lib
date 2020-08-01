import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import api from '../lib/api';

// Actions
import { setPokemonList } from '../actions';

// Components
import Header from '../components/Header';
import PokeList from '../components/PokeList';

// styles
import '../assets/sass/components/Home.scss';

const Home = (props) => {
  const { allPokemon } = props;
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function fetchAllPokemon() {
      const response = await api.getAllPokemon();
      props.setPokemonList([...response.results]);
    }

    fetchAllPokemon();
  }, []);

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <>
      <Header />
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

const mapStateToProps = (state) => ({
  allPokemon: state.allPokemon,
});

const mapDispatchToProps = {
  setPokemonList,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
