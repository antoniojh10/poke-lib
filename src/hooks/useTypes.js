import { useState, useEffect } from 'react';
import api from '../lib/api';

const useTypes = (typesArray) => {
  const [typeLib, setTypeLib] = useState({});
  useEffect(() => {
    async function getType(type) {
      api
        .getTypeInfo(type)
        .then((response) =>
          setTypeLib({ ...typeLib, [type]: response })
        );
    }

    if (typesArray.length > 0) {
      typesArray.map((typeElem) => {
        if (!typeLib[typeElem]) {
          getType(typeElem);
        }
        return null;
      });
    }
  }, [typesArray, typeLib]);
  return typeLib;
};

export default useTypes;
