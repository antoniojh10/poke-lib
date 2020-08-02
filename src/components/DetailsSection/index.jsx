import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  faMars,
  faVenus,
  faGenderless,
  faMarsDouble,
  faVenusDouble,
} from '@fortawesome/free-solid-svg-icons';

// hooks
import useSpecie from '../../hooks/useSpecie';
import useTypes from '../../hooks/useTypes';

// Utils
import capitalize from '../../utils/capitalized';

// Components
import TypeBadge from '../TypeBadge';
import StatBar from './StatBar';

// styles
import '../../assets/sass/components/DetailsSection.scss';

const DetailsSection = ({ basic, types }) => {
  const [description, setDescription] = useState('');
  const [genera, setGenera] = useState('');
  const getInfo = useSpecie(basic?.species?.url || '');
  const getTypesInfo = useTypes(types || []);

  const maxIV = 31;
  const maxEV = 252;

  const formatString = (str) => {
    const regEx = /[^(\x20-\x7E)|(à-ÿ)]/gim; // Matches line feed and other weird thins
    const arrayWithoutWeirdThings = str.split(regEx);
    return arrayWithoutWeirdThings.join(' ');
  };

  const capitalizeMulti = (str) => {
    const strArray = str.split('-');
    const capitalizedStrArray = strArray.map((word) =>
      capitalize(word)
    );
    return capitalizedStrArray.join(' ');
  };

  const handleData = () => {
    if (Object.keys(getInfo).length > 0 && description === '') {
      const enText = getInfo.flavor_text_entries.find(
        (entrie) => entrie.language.name === 'en'
      );
      const enGen = getInfo.genera.find(
        (entrie) => entrie.language.name === 'en'
      );
      setDescription(formatString(enText.flavor_text));
      setGenera(enGen.genus);
    }
  };

  const printAbilities = () => {
    const { abilities } = basic;
    return abilities?.map((abilityBlock, index) => {
      const { ability } = abilityBlock;
      return !abilityBlock.is_hidden ? (
        <span key={ability.name}>
          {`${index + 1}. ${capitalize(ability.name)}`}
          <br />
        </span>
      ) : (
        <span className="minor-fact" key={ability.name}>
          {`${capitalize(ability.name)} (hidden ability)`}
          <br />
        </span>
      );
    });
  };

  const printWeaknesses = () => {
    const weaknessesList = [];
    if (
      Object.keys(getTypesInfo).length === types.length &&
      Object.keys(getTypesInfo).length !== 0
    ) {
      types.map((type) => {
        const {
          damage_relations: { double_damage_from: doubleDamage },
        } = getTypesInfo[type];

        doubleDamage.map((eachType) => {
          if (!weaknessesList.includes(eachType.name)) {
            return weaknessesList.push(eachType.name);
          }
          return null;
        });
        return null;
      });
    }

    if (weaknessesList.length > 0) {
      return weaknessesList.map((type) => (
        <TypeBadge name={type} key={type} />
      ));
    }
    return null;
  };

  const printEVYield = () => {
    const finalArray = [];
    const evYieldArray =
      basic?.stats?.filter((elem) => elem.effort > 0) || [];
    if (evYieldArray.length > 0) {
      evYieldArray.map((evYield) => {
        const finalStatName = capitalizeMulti(evYield.stat.name);
        finalArray.push(`${evYield.effort} ${finalStatName}`);
        return null;
      });

      return finalArray.map((stat) => (
        <span key={stat.split(' ').join('-')}>
          {stat}
          <br />
        </span>
      ));
    }
    return null;
  };

  const printGenderRatio = () => {
    if (Object.keys(getInfo).length > 0) {
      const { gender_rate: femaleOctaves } = getInfo;

      if (femaleOctaves === -1) {
        return (
          <span className="genderless">
            <FontAwesomeIcon icon={faGenderless} />
            {' Genderless'}
          </span>
        );
      }
      if (femaleOctaves === 0) {
        return (
          <span className="male-gender">
            <FontAwesomeIcon icon={faMarsDouble} />
            {' Only males.'}
          </span>
        );
      }
      if (femaleOctaves === 8) {
        return (
          <span className="female-gender">
            <FontAwesomeIcon icon={faVenusDouble} />
            {' Only females.'}
          </span>
        );
      }
      const femalePercentage = (femaleOctaves * 100) / 8;
      const malePercentage = 100 - femalePercentage;

      return (
        <>
          <span className="female-gender">
            <FontAwesomeIcon icon={faVenus} />
            {` ${femalePercentage}%`}
          </span>
          {', '}
          <span className="male-gender">
            <FontAwesomeIcon icon={faMars} />
            {` ${malePercentage}%`}
          </span>
        </>
      );
    }
  };

  const printEggGroups = () => {
    if (Object.keys(getInfo).length > 0) {
      const { egg_groups: eggGroups } = getInfo;
      const eggGroupsNamesArray = eggGroups.map((eggGroup) =>
        capitalize(eggGroup.name)
      );
      return eggGroupsNamesArray.join(', ');
    }
  };

  const printEggCycles = () => {
    if (Object.keys(getInfo).length > 0) {
      const { hatch_counter: eggCyclesCounter } = getInfo;
      const stepsByCycle = 257;
      const maxStepsToHatch = Math.round(
        stepsByCycle * eggCyclesCounter * 1.05
      );
      const minStepsToHatch = Math.round(
        stepsByCycle * eggCyclesCounter * 0.95
      );

      return (
        <span>
          {eggCyclesCounter}{' '}
          <span className="minor-fact">{`(${minStepsToHatch} - ${maxStepsToHatch} steps)`}</span>
        </span>
      );
    }
  };

  const printStat = {
    base: (statName) => {
      const base = basic?.stats?.find(
        (elem) => elem.stat.name === statName
      );
      return base?.base_stat;
    },
    HP: {
      min: () => 2 * printStat.base('hp') + 110,
      max: () => 2 * printStat.base('hp') + maxIV + maxEV / 4 + 110,
    },
    Other: {
      min: (statName) =>
        Math.floor((2 * printStat.base(statName) + 5) * 0.9),
      max: (statName) =>
        Math.floor(
          (2 * printStat.base(statName) + maxIV + maxEV / 4 + 5) * 1.1
        ),
    },
    Total: () =>
      printStat.base('hp') +
      printStat.base('attack') +
      printStat.base('defense') +
      printStat.base('special-attack') +
      printStat.base('special-defense') +
      printStat.base('speed'),
  };

  const printTypeDefenses = () => {
    const allTypes = {
      normal: 1,
      fighting: 1,
      flying: 1,
      poison: 1,
      ground: 1,
      rock: 1,
      bug: 1,
      ghost: 1,
      steel: 1,
      fire: 1,
      water: 1,
      grass: 1,
      electric: 1,
      psychic: 1,
      ice: 1,
      dragon: 1,
      dark: 1,
      fairy: 1,
    };

    if (
      Object.keys(getTypesInfo).length === types.length &&
      Object.keys(getTypesInfo).length !== 0
    ) {
      Object.keys(getTypesInfo).map((type) => {
        const {
          damage_relations: {
            double_damage_from: doubleDamage,
            half_damage_from: halfDamage,
            no_damage_from: inmune,
          },
        } = getTypesInfo[type];

        doubleDamage.map((type) => (allTypes[type.name] *= 2));
        halfDamage.map((type) => (allTypes[type.name] *= 0.5));
        inmune.map((type) => (allTypes[type.name] = 0));
      });

      Object.keys(allTypes).map((type) => {
        if (allTypes[type] === 1) allTypes[type] = ' ';
        if (allTypes[type] === 0.5) allTypes[type] = '½';
        if (allTypes[type] === 0.25) allTypes[type] = '¼';
      });

      return Object.keys(allTypes).map((type) => (
        <div>
          <TypeBadge name={type} />
          <h5>{allTypes[type]}</h5>
        </div>
      ));
    }
    //Object.keys(allTypes).map((type) => console.log(type));
  };

  handleData();

  return (
    <div className="DetailsSection">
      <p>{description}</p>
      <h4 className="title">Pokedex Data</h4>
      <table>
        <tbody>
          <tr>
            <td>Species</td>
            <td>{genera || 'Loading...'}</td>
          </tr>
          <tr>
            <td>Height</td>
            <td>{`${basic.height / 10}m` || 'Loading...'}</td>
          </tr>
          <tr>
            <td>Weight</td>
            <td>{`${basic.weight / 10}kg` || 'Loading...'}</td>
          </tr>
          <tr>
            <td>Abilities</td>
            <td>{printAbilities() || 'Loading...'}</td>
          </tr>
          <tr>
            <td>Weaknesses</td>
            <td className="types">
              {printWeaknesses() || 'Loading...'}
            </td>
          </tr>
        </tbody>
      </table>
      <h4 className="title">Training</h4>
      <table>
        <tbody>
          <tr>
            <td>EV Yield</td>
            <td>{printEVYield()}</td>
          </tr>
          <tr>
            <td>Catch Rate</td>
            <td>{getInfo?.capture_rate}</td>
          </tr>
          <tr>
            <td>Base Friendhip</td>
            <td>{getInfo?.base_happiness}</td>
          </tr>
          <tr>
            <td>Base Exp</td>
            <td>{basic.base_experience}</td>
          </tr>
          <tr>
            <td>Growth Rate</td>
            <td className="types">
              {capitalizeMulti(
                getInfo?.growth_rate?.name || 'Loading...'
              )}
            </td>
          </tr>
        </tbody>
      </table>
      <h4 className="title">Breeding</h4>
      <table>
        <tbody>
          <tr>
            <td>Gender</td>
            <td>{printGenderRatio() || 'Loading...'}</td>
          </tr>
          <tr>
            <td>Egg Groups</td>
            <td>{printEggGroups() || 'Loading...'}</td>
          </tr>
          <tr>
            <td>Egg Cycles</td>
            <td>{printEggCycles() || 'Loading...'}</td>
          </tr>
        </tbody>
      </table>
      <h4 className="title">Base Stats</h4>
      <table className="Stats-section">
        <tbody>
          <tr>
            <td>HP</td>
            <td>{printStat.base('hp') || 'Loading...'}</td>
            <td>
              <StatBar base={printStat.base('hp')} />
            </td>
            <td>{printStat.HP.min() || 'Loading...'}</td>
            <td>{printStat.HP.max() || 'Loading...'}</td>
          </tr>
          <tr>
            <td>Attack</td>
            <td>{printStat.base('attack') || 'Loading...'}</td>
            <td>
              <StatBar base={printStat.base('attack')} />
            </td>
            <td>{printStat.Other.min('attack') || 'Loading...'}</td>
            <td>{printStat.Other.max('attack') || 'Loading...'}</td>
          </tr>
          <tr>
            <td>Defense</td>
            <td>{printStat.base('defense') || 'Loading...'}</td>
            <td>
              <StatBar base={printStat.base('defense')} />
            </td>
            <td>{printStat.Other.min('defense') || 'Loading...'}</td>
            <td>{printStat.Other.max('defense') || 'Loading...'}</td>
          </tr>
          <tr>
            <td>Sp.Atk</td>
            <td>
              {printStat.base('special-attack') || 'Loading...'}
            </td>
            <td>
              <StatBar base={printStat.base('special-attack')} />
            </td>
            <td>
              {printStat.Other.min('special-attack') || 'Loading...'}
            </td>
            <td>
              {printStat.Other.max('special-attack') || 'Loading...'}
            </td>
          </tr>
          <tr>
            <td>Sp.Def</td>
            <td>
              {printStat.base('special-defense') || 'Loading...'}
            </td>
            <td>
              <StatBar base={printStat.base('special-defense')} />
            </td>
            <td>
              {printStat.Other.min('special-defense') || 'Loading...'}
            </td>
            <td>
              {printStat.Other.max('special-defense') || 'Loading...'}
            </td>
          </tr>
          <tr>
            <td>Speed</td>
            <td>{printStat.base('speed') || 'Loading...'}</td>
            <td>
              <StatBar base={printStat.base('speed')} />
            </td>
            <td>{printStat.Other.min('speed') || 'Loading...'}</td>
            <td>{printStat.Other.max('speed') || 'Loading...'}</td>
          </tr>

          <tr>
            <td>Total</td>
            <td className="mayor-fact">
              {printStat.Total() || 'Loading...'}
            </td>
            <td>
              <StatBar />
            </td>
            <td>min</td>
            <td>max</td>
          </tr>
        </tbody>
      </table>
      <p>
        The ranges shown on the right are for a level 100 Pokémon.
        Maximum values are based on a beneficial nature, 252 EVs, 31
        IVs; minimum values are based on a hindering nature, 0 EVs, 0
        IVs.
      </p>
      <h4 className="title">Type Defenses</h4>
      <p>
        The effectiveness of each type on{' '}
        {capitalize(basic?.name || 'Loading...')}.
      </p>
      <div className="types">
        {printTypeDefenses() || 'Loading...'}
      </div>
    </div>
  );
};

export default DetailsSection;
