import React from 'react';
import LazyLoad from 'react-lazyload';

// Components
import TypeBadge from './TypeBadge';
import Loader from '../Loader';

// Utils
import capitalize from '../../utils/capitalized';

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
      <div>
        <p>{`#${formatId(id)}`}</p>
        <h1>{capitalize(name)}</h1>
        <div className="types">
          {types.map(({ type: { name: tName } }) => (
            <TypeBadge name={tName} key={`${name}${tName}`} />
          ))}
        </div>
      </div>
      <div>
        <LazyLoad placeholder={<Loader />} height={200} offset={200}>
          <img
            src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${formatId(
              id
            )}.png`}
            alt={name}
          />
        </LazyLoad>
      </div>
    </div>
  ) : (
    <Loader />
  );
};

export default Pokemon;
