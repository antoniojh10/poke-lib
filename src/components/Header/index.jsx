import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';

// Components
import {
  faArrowLeft,
  faSlidersH,
  faSortAmountDown,
} from '@fortawesome/free-solid-svg-icons';

// styles
import '../../assets/sass/components/Header.scss';

const Header = (props) => {
  const { isPokemon } = props;
  const headerClass = classNames('Header', { isPokemon });
  return (
    <div className={headerClass}>
      <div className="return">
        <Link to="/">
          <FontAwesomeIcon icon={faArrowLeft} />
        </Link>
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
