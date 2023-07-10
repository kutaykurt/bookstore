import React, { useState, useEffect } from 'react';
import { fetchBooks } from '../../fetching/fetchBooks';
import './neuheiten.scss';

const Neuheiten = () => {
  const [books, setBooks] = useState([]);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [canClick, setCanClick] = useState(true);
  const [progress, setProgress] = useState(0);
  const [randomFormats, setRandomFormats] = useState([]);

  useEffect(() => {
    async function fetchBooksData() {
      const data = await fetchBooks();
      setBooks(data);
    }
    fetchBooksData();
  }, []);

  useEffect(() => {
    const newProgress = (currentPosition / (books.length - 2)) * 100;
    setProgress(newProgress);
  }, [currentPosition, books]);

  useEffect(() => {
    const getRandomFormats = (books) => {
      const formats = books.map((book) => {
        const randomIndex = Math.floor(Math.random() * book.formats.length);
        return book.formats[randomIndex];
      });
      setRandomFormats(formats);
    };

    getRandomFormats(books);
  }, [books]);

  const handleNextSlide = () => {
    if (!isTransitioning && canClick) {
      setIsTransitioning(true);
      setCurrentPosition((prevPosition) =>
        prevPosition + 2 >= books.length ? 0 : prevPosition + 2
      );
      setCanClick(false);
      setTimeout(() => {
        setCanClick(true);
      }, 300);
    }
  };

  const handlePreviousSlide = () => {
    if (!isTransitioning && canClick) {
      setIsTransitioning(true);
      setCurrentPosition((prevPosition) =>
        prevPosition - 2 < 0 ? books.length - 2 : prevPosition - 2
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

  const calculateProgress = () => {
    const totalBooks = books.length;
    const progress = (currentPosition / totalBooks) * 100;
    return progress;
  };

  return (
    <div className="Neuheiten">
      <h2>Neuheiten</h2>
      <div
        className={`neuheiten-body-container ${
          isTransitioning ? 'fade-transition' : ''
        }`}
        onTransitionEnd={handleTransitionEnd}
      >
        {books
          .slice(currentPosition, currentPosition + 2)
          .map((book, index) => {
            const randomFormat = randomFormats[index];

            if (!randomFormat) {
              return null; // Ignoriere das Buch, wenn das zufällige Format nicht definiert ist
            }

            return (
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
                    <li className="bold">{book.title}</li>
                    <li>{book.author}</li>
                    <li>Seiten: {book.pages}</li>
                    <li>{randomFormat.type}</li>
                    <li>{randomFormat.price}</li>
                    <li>{[...book.categories].join(' | ')}</li>
                  </ul>
                </div>
              </div>
            );
          })}
      </div>
      <div className="neuheiten-progress-bar">
        <div
          className={`neuheiten-progress ${
            progress === 100 ? 'neuheiten-progress--full' : ''
          }`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <div className="neuheiten-button-container">
        <button onClick={handlePreviousSlide}>Zurück</button>
        <button onClick={handleNextSlide}>Weiter</button>
      </div>
    </div>
  );
};

export default Neuheiten;
