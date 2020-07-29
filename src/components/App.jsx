import React from 'react';

// Components
import Header from './Header';
import Home from '../containers/Home';

// Styles
import '../assets/sass/App.scss';

const App = () => {
  return (
    <>
      <Header />
      <Home />
    </>
  );
};

export default App;
