import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';

import { setSort } from '../../actions';

import '../../assets/sass/components/Menu.scss';

const Menu = () => {
  const dispatch = useDispatch();
  const active = useSelector((state) => state.menuSort);
  const sortType = useSelector((state) => state.sortBy);
  const menuClass = classNames('Menu', { active });

  const handleIndex = () => {
    sortType === 'classic'
      ? dispatch(setSort('random'))
      : dispatch(setSort('classic'));
  };

  const handleIndexReverse = () => {
    sortType === 'reverse'
      ? dispatch(setSort('random'))
      : dispatch(setSort('reverse'));
  };

  const handleAZ = () => {
    sortType === 'a-z' ? dispatch(setSort('random')) : dispatch(setSort('a-z'));
  };

  const handleZA = () => {
    sortType === 'z-a' ? dispatch(setSort('random')) : dispatch(setSort('z-a'));
  };

  const buttonIndexClass = classNames({
    active: sortType === 'classic',
  });
  const buttonIndexReverseClass = classNames({
    active: sortType === 'reverse',
  });
  const buttonIndexAZClass = classNames({
    active: sortType === 'a-z',
  });
  const buttonIndexZAClass = classNames({
    active: sortType === 'z-a',
  });
  return (
    <div className={menuClass}>
      <h1>Sort</h1>
      <p>Sort Pokemons alphabetically or by National Pokédex number</p>
      <button onClick={handleIndex} className={buttonIndexClass} type="button">
        Smallest number first
      </button>
      <button
        onClick={handleIndexReverse}
        className={buttonIndexReverseClass}
        type="button"
      >
        Highest number first
      </button>
      <button onClick={handleAZ} className={buttonIndexAZClass} type="button">
        A-Z
      </button>
      <button onClick={handleZA} className={buttonIndexZAClass} type="button">
        Z-A
      </button>
    </div>
  );
};

export default Menu;
