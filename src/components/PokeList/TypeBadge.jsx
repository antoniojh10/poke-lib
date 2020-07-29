import React from 'react';

// Utils
import capitalize from '../../utils/capitalized';

import NormalIcon from '../icons/normal';
import FightingIcon from '../icons/fighting';
import FlyingIcon from '../icons/flying';
import PoisonIcon from '../icons/poison';
import GroundIcon from '../icons/ground';
import BugIcon from '../icons/bug';
import RockIcon from '../icons/rock';
import GhostIcon from '../icons/ghost';
import SteelIcon from '../icons/steel';
import FireIcon from '../icons/fire';
import WaterIcon from '../icons/water';
import GrassIcon from '../icons/grass';
import ElectricIcon from '../icons/electric';
import PsychicIcon from '../icons/psychic';
import IceIcon from '../icons/ice';
import DragonIcon from '../icons/dragon';
import FairyIcon from '../icons/fairy';
import DarkIcon from '../icons/dark';

const TypeBadge = ({ name }) => {
  const icon = () => {
    switch (name) {
      case 'normal':
        return <NormalIcon />;
      case 'fighting':
        return <FightingIcon />;
      case 'flying':
        return <FlyingIcon />;
      case 'poison':
        return <PoisonIcon />;
      case 'ground':
        return <GroundIcon />;
      case 'rock':
        return <RockIcon />;
      case 'bug':
        return <BugIcon />;
      case 'ghost':
        return <GhostIcon />;
      case 'steel':
        return <SteelIcon />;
      case 'fire':
        return <FireIcon />;
      case 'water':
        return <WaterIcon />;
      case 'grass':
        return <GrassIcon />;
      case 'electric':
        return <ElectricIcon />;
      case 'psychic':
        return <PsychicIcon />;
      case 'ice':
        return <IceIcon />;
      case 'dragon':
        return <DragonIcon />;
      case 'dark':
        return <DarkIcon />;
      case 'fairy':
        return <FairyIcon />;
      default:
        return <NormalIcon />;
    }
  };
  return (
    <div className={name}>
      {icon()}
      {capitalize(name)}
    </div>
  );
};

export default TypeBadge;
