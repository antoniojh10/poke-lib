import React from 'react';
import classNames from 'classnames';
import capitalize from '../../utils/capitalized';
import { formatName, formatPokemonName } from '../../utils/formatName';
import '../../assets/sass/components/EvoContainer.scss';

const EvoContainer = ({ evolutionInfo }) => {
  const {
    number1,
    from: base,
    name: baseUnique,
    how,
    trigger,
    number2,
    to: evolved,
  } = evolutionInfo;

  const formatId = (id) => {
    if (id < 10) {
      return `00${id}`;
    }
    if (id < 100) {
      return `0${id}`;
    }
    return `${id}`;
  };

  const printHasNoEvolution = () => {
    return (
      <div className="mini-pokemon">
        <img
          src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${formatId(
            number1
          )}.png`}
          alt={baseUnique}
        />
        <p>#{formatId(number1)}</p>
        <h5>{formatPokemonName(baseUnique)}</h5>
      </div>
    );
  };

  const printMethod = () => {
    if (trigger === 'level-up' && how.min_level && how.time_of_day) {
      return (
        <h4>
          Level {how.min_level}
          <br />
          (only in the {how.time_of_day})
        </h4>
      );
    }
    if (trigger === 'level-up' && how.held_item && how.time_of_day) {
      return (
        <h4>
          Level up holding {formatName(how.held_item)}
          <br />
          (only in the {how.time_of_day})
        </h4>
      );
    }
    if (trigger === 'level-up' && how.gender && how.min_level) {
      const gender = how.gender === 2 ? 'males' : 'females';
      return (
        <h4>
          Level {how.min_level}
          <br />
          (only {gender})
        </h4>
      );
    }
    if (trigger === 'level-up' && how.min_level) {
      return <h4>Level {how.min_level}</h4>;
    }
    if (trigger === 'level-up' && how.min_happiness) {
      return <h4>Level up with high Friendship</h4>;
    }
    if (trigger === 'level-up' && how.known_move) {
      return (
        <h4>
          Level up knwoing
          <br />
          {formatName(how.known_move)}
        </h4>
      );
    }
    if (trigger === 'level-up' && how.known_move_type && how.min_affection) {
      return (
        <h4>
          Level up with
          <br />
          with high Friendship
          <br />
          and a {formatName(how.known_move_type)} type move
        </h4>
      );
    }
    if (trigger === 'level-up' && how.location) {
      return (
        <h4>
          Level up in
          <br />
          {formatName(how.location)}
        </h4>
      );
    }
    if (trigger === 'trade' && how.trade_species) {
      return (
        <h4>
          Trade for a<br />
          {capitalize(how.trade_species)}
        </h4>
      );
    }
    if (trigger === 'use-item' && how.gender && how.item) {
      const gender = how.gender === 2 ? 'males' : 'females';
      return (
        <h4>
          Using
          <br />
          {formatName(how.item)}
          <br />
          (only {gender})
        </h4>
      );
    }
    if (trigger === 'use-item' && how.item) {
      return (
        <h4>
          Using
          <br />
          {formatName(how.item)}
        </h4>
      );
    }
    if (trigger === 'trade' && Object.keys(how).length === 0) {
      return <h4>Trade</h4>;
    }
    if (trigger === 'trade' && how.held_item) {
      return (
        <h4>
          Trade holding
          <br />
          {formatName(how.held_item)}
        </h4>
      );
    }
    if (trigger === 'trade' && how.trade_species) {
      return (
        <h4>
          Trade for a<br />
          {capitalize(how.trade_species)}
        </h4>
      );
    }
    return 'Flecha';
  };

  const printEvolutionCouple = () => {
    return (
      <>
        <div className="mini-pokemon">
          <img
            src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${formatId(
              number1
            )}.png`}
            alt={base}
          />
          <p>#{formatId(number1)}</p>
          <h5>{formatPokemonName(base)}</h5>
        </div>
        <div>{printMethod()}</div>
        <div className="mini-pokemon">
          <img
            src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${formatId(
              number2
            )}.png`}
            alt={evolved}
          />
          <p>#{formatId(number2)}</p>
          <h5>{formatPokemonName(evolved)}</h5>
        </div>
      </>
    );
  };

  const evolutionClass = classNames(
    'EvoContainer',
    trigger === false ? 'isUnique' : null
  );

  return (
    <div className={evolutionClass}>
      {trigger !== false ? printEvolutionCouple() : printHasNoEvolution()}
    </div>
  );
};

export default EvoContainer;
