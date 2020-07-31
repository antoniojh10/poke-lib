import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

// Hooks
import useOnePokemon from '../../hooks/useOnePokemon';

// Components
import Pokemon from './Pokemon';

// styles
import '../../assets/sass/components/Card.scss';

const Card = (props) => {
  const { pokemon } = props;
  const { info, types } = useOnePokemon(pokemon.name);

  const cardClass = classNames('Card', types[0]);

  return (
    <div className={cardClass}>
      <Pokemon data={info} />
    </div>
  );
};

const LazyCard = (props) => {
  const { pokemon } = props;
  const [show, setShow] = useState(false);
  const elementRef = useRef();

  useEffect(() => {
    const onChange = (entries) => {
      const elem = entries[0];
      if (elem.isIntersecting) {
        setShow(true);
        // eslint-disable-next-line no-use-before-define
        observer.disconnect();
      }
    };

    const observer = new IntersectionObserver(onChange, {
      rootMargin: '100px',
    });

    observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, [show]);

  const linkClass = classNames('LazyDiv', { show });

  return (
    <Link
      to={`/pokemon/${pokemon.name}`}
      className={linkClass}
      ref={elementRef}
    >
      {show ? <Card pokemon={pokemon} /> : null}
    </Link>
  );
};

export default LazyCard;
