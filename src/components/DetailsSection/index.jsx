import React, { useState } from 'react';

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
        <span className="hidden-ability" key={ability.name}>
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

  handleData();

  return (
    <div className="DetailsSection">
      <p>{description}</p>
      <h4 className="title">Pokedex Data</h4>
      <table>
        <tbody>
          <tr>
            <td>Species</td>
            <td>{genera}</td>
          </tr>
          <tr>
            <td>Height</td>
            <td>{`${basic.height / 10}m`}</td>
          </tr>
          <tr>
            <td>Weight</td>
            <td>{`${basic.weight / 100}kg`}</td>
          </tr>
          <tr>
            <td>Abilities</td>
            <td>{printAbilities()}</td>
          </tr>
          <tr>
            <td>Weaknesses</td>
            <td className="types">{printWeaknesses()}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DetailsSection;
