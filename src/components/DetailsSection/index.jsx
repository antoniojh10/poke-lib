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

// styles
import '../../assets/sass/components/DetailsSection.scss';

const DetailsSection = ({ basic, types }) => {
  const [description, setDescription] = useState('');
  const [genera, setGenera] = useState('');
  const getInfo = useSpecie(basic?.species?.url || '');
  const getTypesInfo = useTypes(types || []);

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
    </div>
  );
};

export default DetailsSection;
