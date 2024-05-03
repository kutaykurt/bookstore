import React from 'react';
import Neuheiten from '../../components/kategorien/neuheiten/Neuheiten';
import Kategorien from '../../components/kategorien/Kategorien';
import './homepage.scss';

const Homepage = ({ books }) => {
  return (
    <div className="Homepage">
      <Neuheiten />
      <Kategorien category="Roman" books={books} />
      <Kategorien category="Drama" books={books} />
      <Kategorien category="Fantasy" books={books} />
      <Kategorien category="Romantik" books={books} />
    </div>
  );
};

export default Homepage;
