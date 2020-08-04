import React from 'react';
import classNames from 'classnames';

// Hooks
import useOnePokemon from '../hooks/useOnePokemon';

// Components
import Header from '../components/Header';
import Pokemon from '../components/Pokemon';
import DetailsSection from '../components/DetailsSection';

// Utils
import { formatPokemonName } from '../utils/formatName';

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
        <h1 className="back-name">{formatPokemonName(name)}</h1>
        <Pokemon data={info} />
        <DetailsSection basic={info} types={types} />
      </div>
    </>
  );
};

export default PokemonDetails;
