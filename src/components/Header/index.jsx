import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Components
import {
  faArrowLeft,
  faSlidersH,
  faSortAmountDown,
} from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  return (
    <div className="Header">
      <div className="return">
        <button type="button">
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
      </div>
      <div className="organize">
        <button type="button">
          <FontAwesomeIcon icon={faSortAmountDown} />
        </button>
        <button type="button">
          <FontAwesomeIcon icon={faSlidersH} />
        </button>
      </div>
    </div>
  );
};

export default Header;
