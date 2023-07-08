import React, { useState, useEffect } from 'react';
import { fetchBooks } from '../fetching/fetchBooks';
import './neuheiten.scss';

const Neuheiten = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    async function fetchBooksData() {
      const data = await fetchBooks();
      setBooks(data);
    }
    fetchBooksData();
  }, []);

  const neuheiten = books.filter((book) => {
    const year = new Date(book.publicationDate).getFullYear();
    return year >= 2023;
  });

  const getRandomFormat = (formats) => {
    const randomIndex = Math.floor(Math.random() * formats.length);
    return formats[randomIndex];
  };

  return (
    <div className="Highlights">
      <h2>Neuheiten</h2>
      {neuheiten.map((neuheitenBuch) => {
        const randomFormat = getRandomFormat(neuheitenBuch.formats);

        return (
          <div className="book-container">
            <div className="picture-box">
              <img src={neuheitenBuch.picture} />
            </div>
            <div className="informations">
              <ul>
                <li>Name: {neuheitenBuch.title}</li>
                <li>Autor: {neuheitenBuch.author}</li>
                <li>Seiten: {neuheitenBuch.pages}</li>
                <li>Format: {randomFormat.type}</li>
                <li>Preis: {randomFormat.price}</li>
                <li>{[...neuheitenBuch.categories].join(' | ')}</li>
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Neuheiten;
