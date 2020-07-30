import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import api from '../../lib/api';

// Actions
import { setPokemonBasic } from '../../actions';

// Components
import Pokemon from './Pokemon';

const Card = (props) => {
  const { pokemon } = props;
  const [info, setInfo] = useState({});
  const [types, setTypes] = useState([]);

  const handleTypes = (poke) => {
    const typesList = Object.keys(poke.types).map((index) => {
      return poke.types[index].type.name;
    });
    setTypes(typesList);
  };

  useEffect(() => {
    async function fetchPokemon() {
      const response = await api.callPokemon(pokemon.name);
      setInfo({ ...response });
      props.setPokemonBasic({ ...response });

      handleTypes(response);
    }

    const found = props.pokemons.find(
      (elem) => elem.name === pokemon.name
    );

    if (found) {
      console.log('ya lo tenemos');
      setInfo({ ...found });
      handleTypes(found);
    } else {
      fetchPokemon();
    }

    return () => {
      setInfo({});
    };
  }, [pokemon]);

  const cardClass = classNames('Card', types[0]);

  return (
    <div className={cardClass}>
      <Pokemon data={info} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  pokemons: state.pokemons,
});

const mapDispatchToProps = {
  setPokemonBasic,
};

export default connect(mapStateToProps, mapDispatchToProps)(Card);
