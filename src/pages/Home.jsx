import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

// Actions
import { onSearch } from '../actions';

// Components
import Header from '../components/Header';
import PokeList from '../components/PokeList';
import Menu from '../components/Menu';

// styles
import '../assets/sass/components/Home.scss';

const Home = () => {
  const dispatch = useDispatch();
  const allPokemon = useSelector((state) => state.allPokemon);
  const search = useSelector((state) => state.search);
  const sortBy = useSelector((state) => state.sortBy);

  const setSearch = useCallback(
    (searchInput) => {
      return dispatch(onSearch(searchInput));
    },
    [dispatch]
  );

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <>
      <Header />
      <h1>Pokedex</h1>
      <p>Search Pokémon by name or using the National Pokédex number.</p>
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
        sortBy={sortBy}
      />
      <Menu />
    </>
  );
};

export default Home;
