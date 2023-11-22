import React, { useEffect, useState } from 'react';
import { fetchBooks } from '../../fetching/fetchBooks';
import './neuheiten.scss';
import { Link } from 'react-router-dom';

const Neuheiten = () => {
  const [books, setBooks] = useState([]);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [canClick, setCanClick] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    async function fetchBooksData() {
      const data = await fetchBooks();
      setBooks(data);
    }
    fetchBooksData();
  }, []);

  const pageSize = 2;
  const totalPages = Math.ceil(books.length / pageSize);

  useEffect(() => {
    const newProgress = (currentPosition / (totalPages - 1)) * 100;
    setProgress(newProgress);
  }, [currentPosition, totalPages]);

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

  
  useEffect(() => {
    const interval = setInterval(() => {
      handleNextSlide();
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, [currentPosition, canClick]);
  
  const handleTransitionEnd = () => {
    setIsTransitioning(false);
  };
  
  return (
    <div className="Neuheiten">
      <h2>Neuheiten</h2>
      <div className="neuheiten-main">
        <div className="neuheiten-button-container">
          <i
            className={'bi bi-arrow-left-short slide-left-button'}
            onClick={handlePreviousSlide}
          />
        </div>
        <div
          className={`neuheiten-body-container ${
            isTransitioning ? 'fade-transition' : ''
          }`}
          onTransitionEnd={handleTransitionEnd}
        >
          {books
            .slice(
              currentPosition * pageSize,
              currentPosition * pageSize + pageSize
            )
            .map((book, index) => (
              <Link className="link" to={`/selectedbook/${book.id}`} key={book.id}>
              <div
                className={`neuheiten-book-container ${
                  isTransitioning ? 'fade-transition' : ''
                }`}
                key={book.id}
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <div className="neuheiten-picture-box">
                  <img src={book.picture} alt={book.title} />
                </div>
                <div className="neuheiten-informations">
                  <ul>
                    <li className="neuheiten-book-title bold">{book.title}</li>
                    <li className="neuheiten-book-autor">{book.author}</li>
                    <li className="neuheiten-book-pages">Seiten: {book.pages}</li>
                    <li className="neuheiten-book-type">{book.type}</li>
                    <li className="neuheiten-book-price">{book.price}</li>
                    <li className="neuheiten-book-categories">
                      {[...book.categories].join(' | ')}
                    </li>
                  </ul>
                </div>
              </div>
            </Link>
            ))}
        </div>
        <div className="neuheiten-button-container">
          <i
            className={'bi bi-arrow-right-short slide-right-button'}
            onClick={handleNextSlide}
          />
        </div>
      </div>
      <div className="neuheiten-progress-bar">
        <div
          className={`neuheiten-progress ${
            progress === 100 ? 'neuheiten-progress--full' : ''
          }`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default Neuheiten;