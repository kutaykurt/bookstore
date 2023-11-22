import React, { useEffect, useState } from 'react';
import { fetchBooks } from '../../fetching/fetchBooks';
import '../kategorien.scss';

const Romane = () => {
  const [books, setBooks] = useState([]);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [canClick, setCanClick] = useState(true);
  // const [progress, setProgress] = useState(0);

  useEffect(() => {
    async function fetchBooksData() {
      const data = await fetchBooks();
      setBooks(data);
    }
    fetchBooksData();
  }, []);

  const romanBooks = books.filter((book) => book.categories.includes('Roman'));
  const pageSize = 5;
  const totalPages = Math.ceil(romanBooks.length / pageSize);

  /* useEffect(() => {
    const newProgress = (currentPosition / (totalPages - 1)) * 100;
    setProgress(newProgress);
  }, [currentPosition, totalPages]); */

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
    <div className="Romane">
      <h2>Romane</h2>
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
          {romanBooks
            .slice(
              currentPosition * pageSize,
              currentPosition * pageSize + pageSize
            )
            .map((book, index) => (
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
            ))}
        </div>
        <div className="button-container">
          <i
            className={'bi bi-arrow-right-short slide-right-button'}
            onClick={handleNextSlide}
          />
        </div>
      </div>
      {/* <div className="progress-bar">
        <div
          className={`progress ${
            progress === 100 ? 'progress--full' : ''
          }`}
          style={{ width: `${progress}%` }}
        ></div>
      </div> */}
    </div>
  );
};

export default Romane;
