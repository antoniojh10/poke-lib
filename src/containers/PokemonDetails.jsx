import React from 'react';
import classNames from 'classnames';

// Hooks
import useOnePokemon from '../hooks/useOnePokemon';

// Components
import Header from '../components/Header';
import Pokemon from '../components/PokeList/Pokemon';

// styles
import '../assets/sass/components/PokemonDetails.scss';

const PokemonDetails = (props) => {
  const {
    match: {
      params: { name },
    },
  } = props;

  const { info, types } = useOnePokemon(name);
  const detailsClass = classNames('PokemonDetails', types[0]);

  return (
    <>
      <Header isPokemon />
      <div className={detailsClass}>
        <h1 className="back-name">{name}</h1>
        <Pokemon data={info} />
      </div>
    </>
  );
};

export default PokemonDetails;
