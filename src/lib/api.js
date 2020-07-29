const apiBaseURL = 'https://pokeapi.co/api/v2/';

const api = {
  getAllPokemon: async () => {
    const url = `${apiBaseURL}pokemon/?limit=807`;
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
};

export default api;
