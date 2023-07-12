import React, { useEffect, useState } from 'react';
import { fetchBooks } from '../../fetching/fetchBooks';
import './fantasy.scss';

const Fantasy = () => {
  const [books, setBooks] = useState([]);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [canClick, setCanClick] = useState(true);

  useEffect(() => {
    async function fetchBooksData() {
      const data = await fetchBooks();
      setBooks(data);
    }
    fetchBooksData();
  }, []);

  const fantasyBooks = books.filter((book) => book.categories.includes('Fantasy'));
  const pageSize = 5;
  const totalPages = Math.ceil(fantasyBooks.length / pageSize);

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
    <div className="fantasy">
      <h2>fantasy</h2>
      <div className="fantasy-main">
        <div className="fantasy-button-container">
          <i
            className={'bi bi-arrow-left-short slide-left-button'}
            onClick={handlePreviousSlide}
          />
        </div>
        <div
          className={`fantasy-body-container ${
            isTransitioning ? 'fade-transition' : ''
          }`}
          onTransitionEnd={handleTransitionEnd}
        >
          {fantasyBooks
            .slice(
              currentPosition * pageSize,
              currentPosition * pageSize + pageSize
            )
            .map((book, index) => (
              <div
                className={`fantasy-book-container ${
                  isTransitioning ? 'fade-transition' : ''
                }`}
                key={book.id}
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <div className="fantasy-picture-box">
                  <img src={book.picture} alt={book.title} />
                </div>
                <div className="fantasy-informations">
                  <ul>
                    <li className="fantasy-book-title bold">{book.title}</li>
                    <li className="fantasy-book-autor">{book.author}</li>
                    <li className="fantasy-book-pages">Seiten: {book.pages}</li>
                    <li className="fantasy-book-type">{book.type}</li>
                    <li className="fantasy-book-price">{book.price}</li>
                    <li className="fantasy-book-categories">
                      {[...book.categories].join(' | ')}
                    </li>
                  </ul>
                </div>
              </div>
            ))}
        </div>
        <div className="fantasy-button-container">
          <i
            className={'bi bi-arrow-right-short slide-right-button'}
            onClick={handleNextSlide}
          />
        </div>
      </div>
    </div>
  );
};

export default Fantasy;
