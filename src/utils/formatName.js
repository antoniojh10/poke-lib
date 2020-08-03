import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faMars, faVenus } from '@fortawesome/free-solid-svg-icons';
import capitalize from './capitalized';

export const formatName = (str) => {
  let strArray = str.split('-');
  strArray = strArray.map((word) => capitalize(word));
  return strArray.join(' ');
};

export const cleanName = (str) => {
  const strArray = str.split('-');
  if (
    strArray[0] === 'deoxys' ||
    strArray[0] === 'giratina' ||
    strArray[0] === 'wormadam' ||
    strArray[0] === 'shaymin' ||
    strArray[0] === 'basculin' ||
    strArray[0] === 'darmanitan' ||
    strArray[0] === 'tornadus' ||
    strArray[0] === 'thundurus' ||
    strArray[0] === 'landorus' ||
    strArray[0] === 'keldeo' ||
    strArray[0] === 'meloetta' ||
    strArray[0] === 'meowstic' ||
    strArray[0] === 'aegislash' ||
    strArray[0] === 'pumpkaboo' ||
    strArray[0] === 'gourgeist' ||
    strArray[0] === 'oricorio' ||
    strArray[0] === 'lycanroc' ||
    strArray[0] === 'wishiwashi' ||
    strArray[0] === 'minior' ||
    strArray[0] === 'mimikyu'
  ) {
    return strArray[0];
  }
  return strArray.join('-');
};

export const formatPokemonName = (str) => {
  let strArray = cleanName(str);
  if (str.includes('-f') && !str.includes('u-f')) {
    return (
      <>
        Nidoran <FontAwesomeIcon icon={faVenus} />
      </>
    );
  }
  if (str.includes('n-m')) {
    return (
      <>
        Nidoran <FontAwesomeIcon icon={faMars} />
      </>
    );
  }

  strArray = strArray.split('-').map((word) => capitalize(word));
  return strArray.join(' ');
};
