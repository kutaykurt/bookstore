import React from 'react';
import Neuheiten from '../../components/kategorien/neuheiten/Neuheiten';
import Romane from '../../components/kategorien/Romane/Romane';
import './homepage.scss';
import Drama from '../../components/kategorien/Drama/Drama';
import Fantasy from '../../components/kategorien/Fantasy/Fantasy';
import Romantik from '../../components/kategorien/Romantik/Romantik';
import AddsFirst from '../../components/addsLine/AddsFirst';
import Kategorien from '../../components/kategorien/Kategorien';

const Homepage = ({ books }) => {
  return (
    <div className="Homepage">
      {/* <Neuheiten books={books} />
      <div className="linethrough" />
      <Romane books={books} />
      <Drama books={books} />
      <div>
        <AddsFirst />
      </div>
      <Fantasy books={books} />
      <Romantik books={books} /> */}
      <Neuheiten />
      <Kategorien category="Roman" books={books} />
      <Kategorien category="Drama" books={books} />
      <Kategorien category="Fantasy" books={books} />
      <Kategorien category="Romantik" books={books} />
    </div>
  );
};

export default Homepage;
