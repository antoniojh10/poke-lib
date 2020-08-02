import React from 'react';

// Components
import TypeBadge from '../TypeBadge';

// Utils
import { formatPokemonName } from '../../utils/formatName';

// styles
import '../../assets/sass/components/Pokemon.scss';

const Pokemon = ({ data }) => {
  const { id, name, types } = data;

  const formatId = (id) => {
    if (id < 10) {
      return `00${id}`;
    }
    if (id < 100) {
      return `0${id}`;
    }
    return `${id}`;
  };

  return Object.keys(data).length !== 0 ? (
    <div className="Pokemon">
      <div className="simple-data">
        <p>{`#${formatId(id)}`}</p>
        <h1>{formatPokemonName(name)}</h1>
        <div className="types">
          {types.map(({ type: { name: tName } }) => (
            <TypeBadge name={tName} key={`${name}${tName}`} />
          ))}
        </div>
      </div>
      <div>
        <img
          src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${formatId(
            id
          )}.png`}
          loading="lazy"
          alt={name}
        />
      </div>
    </div>
  ) : null;
};

export default Pokemon;
