import React from 'react';
import Neuheiten from '../../components/kategorien/neuheiten/Neuheiten';
import Romane from '../../components/kategorien/Romane/Romane';
import './homepage.scss';
import Drama from '../../components/kategorien/Drama/Drama';
import Fantasy from '../../components/kategorien/Fantasy/Fantasy';
import Romantik from '../../components/kategorien/Romantik/Romantik';
import AddsFirst from '../../components/addsLine/AddsFirst';

const Homepage = () => {
  return (
    <div className="Homepage">
      <Neuheiten />
      <div className="linethrough" />
      <Romane />
      <Drama />
      <div>
        <AddsFirst />
      </div>
      <Fantasy />
      <Romantik />
    </div>
  );
};

export default Homepage;
