import React from 'react';

// Hooks
import useOnePokemon from '../hooks/useOnePokemon';

// Components
import Header from '../components/Header';

// styles
import '../assets/sass/components/PokemonDetails.scss';

const PokemonDetails = (props) => {
  const {
    match: {
      params: { name },
    },
  } = props;

  const { info, types } = useOnePokemon(name);

  return (
    <>
      <Header isPokemon />
      <div className="PokemonDetails">
        <h1>{name}</h1>
      </div>
    </>
  );
};

export default PokemonDetails;
