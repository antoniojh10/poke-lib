const apiBaseURL = 'https://pokeapi.co/api/v2/';
const count = 807;

const api = {
  getAllPokemon: async () => {
    const url = `${apiBaseURL}pokemon/?limit=${count}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      return error.message;
    }
  },
  callPokemon: async (id) => {
    const url = `${apiBaseURL}pokemon/${id}/`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      return error.message;
    }
  },
  getResource: async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      return error.message;
    }
  },
  getTypeInfo: async (type) => {
    const url = `${apiBaseURL}type/${type}/`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      return error.message;
    }
  },
};

export default api;
