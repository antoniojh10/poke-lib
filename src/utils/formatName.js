import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faMars, faVenus } from '@fortawesome/free-solid-svg-icons';
import capitalize from './capitalized';

export const formatName = (str) => {
  let strArray = str.split('-');
  strArray = strArray.map((word) => capitalize(word));
  return strArray.join(' ');
};

export const formatPokemonName = (str) => {
  let strArray = str.split('-');
  if (str.includes('-f') && !str.includes('u-f')) {
    console.log(str);
  }

  strArray = strArray.map((word) => capitalize(word));
  return strArray.join(' ');
};
