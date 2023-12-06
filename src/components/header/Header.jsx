import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './header.scss';


const Header = ({ onSearch }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
    setSearchTerm(''); // Das Suchwort wird nach dem Klicken auf den Suchbutton geleert
  };
 
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="Header">
      <div>
        <Link to="/" className="link">
          <h1>Bookshop</h1>
        </Link>
      </div>
      <div className="mid-list">
        <ul>
          <Link className="link" onClick={toggleMenu}>
            <li>Bücher</li>
          </Link>
          {menuOpen && (
            <ul>
              <li></li>
            </ul>
          )}
          <Link className="link">
            <li className='sale'>SALE</li>
          </Link>
          <Link className="link">
            <li>eBooks</li>
          </Link>
          <Link className="link">
            <li>Spielwaren</li>
          </Link>
          <Link className="link">
            <li>Schreibwaren</li>
          </Link>
        </ul>
      </div>
      <div>
        <form onSubmit={handleSearch}>
          <input
            className="input"
            type="text"
            placeholder="Titel, Autor, ISBN ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className='search-button'>
            <button type='submit' class="bi-search" />
          </div>
        </form>
      </div>
      <div className="right-list">
        <div>
          <i class="bi bi-geo-alt" />
          <span>Ort</span>
        </div>
        <div>
          <i class="bi bi-person" />
          <span>Profil</span>
        </div>
        <div>
          <i class="bi bi-heart" />
          <span>Merkzettel</span>
        </div>
        <div>
          <i class="bi bi-bag" />
          <Link to="/cart"><span>Warenkorb</span></Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
