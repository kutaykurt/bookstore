import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './kategorien.scss';

const Kategorien = ({ category, books }) => {
  const [currentPosition, setCurrentPosition] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [canClick, setCanClick] = useState(true);

  console.log(books);

  const categoryBooks = books.filter((book) => book.categories.includes(category));
  const pageSize = 5;
  const totalPages = Math.ceil(categoryBooks.length / pageSize);

  useEffect(() => {
    setCurrentPosition(0); // Zurücksetzen der Position beim Kategorie-Wechsel
  }, [category]);

  const handlePreviousSlide = () => {
    if (!isTransitioning && canClick) {
      setIsTransitioning(true);
      setCurrentPosition((prevPosition) =>
        prevPosition === 0 ? totalPages - 1 : prevPosition - 1
      );
      setCanClick(false);
      setTimeout(() => {
        setCanClick(true);
      }, 600);
    }
  };

  const handleNextSlide = () => {
    if (!isTransitioning && canClick) {
      setIsTransitioning(true);
      setCurrentPosition((prevPosition) =>
        prevPosition === totalPages - 1 ? 0 : prevPosition + 1
      );
      setCanClick(false);
      setTimeout(() => {
        setCanClick(true);
      }, 600);
    }
  };

  const handleTransitionEnd = () => {
    setIsTransitioning(false);
  };

  return (
    <div className="Kategorien">
      <h2>{category}</h2>
      <div className="main">
        <div className="button-container">
          <i
            className={'bi bi-arrow-left-short slide-left-button'}
            onClick={handlePreviousSlide}
          />
        </div>
        <div
          className={`body-container ${
            isTransitioning ? 'fade-transition' : ''
          }`}
          onTransitionEnd={handleTransitionEnd}
        >
          {categoryBooks
            .slice(
              currentPosition * pageSize,
              currentPosition * pageSize + pageSize
            )
            .map((book, index) => (
              <Link className="link" to={`/selectedbook/${book.id}`} key={book.id}>
                <div
                  className={`book-container ${
                    isTransitioning ? 'fade-transition' : ''
                  }`}
                  key={book.id}
                  style={{ transitionDelay: `${index * 0.1}s` }}
                >
                  <div className="picture-box">
                    <img src={book.picture} alt={book.title} />
                  </div>
                  <div className="informations">
                    <ul>
                      <li className="book-title bold">{book.title}</li>
                      <li className="book-autor">{book.author}</li>
                      <li className="book-pages">Seiten: {book.pages}</li>
                      <li className="book-type">{book.type}</li>
                      <li className="book-price">{book.price}</li>
                      <li className="book-categories">
                        {[...book.categories].join(' | ')}
                      </li>
                    </ul>
                  </div>
                </div>
              </Link>
            ))}
        </div>
        <div className="button-container">
          <i
            className={'bi bi-arrow-right-short slide-right-button'}
            onClick={handleNextSlide}
          />
        </div>
      </div>
    </div>
  );
};

export default Kategorien;