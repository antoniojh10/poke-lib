import { useState, useEffect } from 'react';

import api from '../lib/api';

const useSpecie = (url) => {
  const [specie, setSpecie] = useState({});
  useEffect(() => {
    async function getSpecie() {
      api.getResource(url).then((response) => setSpecie(response));
    }
    if (url !== '') {
      getSpecie();
    }
  }, [url]);

  return specie;
};

export default useSpecie;
