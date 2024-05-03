import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./header.scss";

const Header = ({ onSearch }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
    navigate(`/search?query=${searchTerm}`);
  };

  useEffect(() => {
    return () => {
      setSearchTerm(""); // Reset search term when component unmounts
    };
  }, []);

  return (
    <div className="Header">
      <div>
        <Link to="/" className="link">
          <h1>
            <span className="title-first-part">Book</span>
            <span className="title-second-part">Shop</span>
          </h1>
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
            <li className="sale">SALE</li>
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
          <div className="search-button">
            <button type="submit" className="bi-search" />
          </div>
        </form>
      </div>
      <div className="right-list">
        <div className="header-right-container-item">
          <i className="bi bi-geo-alt" />
          <span>Ort</span>
        </div>
        <div className="header-right-container-item">
          <i className="bi bi-person" />
          <span>Profil</span>
        </div>
        <div className="header-right-container-item">
          <i className="bi bi-heart" />
          <span>Merkzettel</span>
        </div>
        <div className="header-right-container-item">
          <Link to="/cart" className="cart-link">
            <i className="bi bi-bag" />
            <span className="cart-text">Warenkorb</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
