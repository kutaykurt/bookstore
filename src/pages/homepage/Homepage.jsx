import React from 'react'
import Neuheiten from '../../components/kategorien/neuheiten/Neuheiten';
import Romane from '../../components/kategorien/Romane/Romane';
import './homepage.scss';

const Homepage = () => {
  return (
    <div className='Homepage'>
        <Neuheiten />
        <div className='linethrough' />
        <Romane />
    </div>
  )
}

export default Homepage