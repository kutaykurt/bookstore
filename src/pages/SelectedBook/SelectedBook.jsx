import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const SelectedBook = ({ books }) => {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const selectedBook = books.find((book) => book.id === parseInt(bookId));
    if (selectedBook) {
      setBook(selectedBook);
    } else {
      fetchBookData();
    }
  }, [bookId, books]);

  const fetchBookData = async () => {
    try {
      const response = await fetch('buecher.json');
      if (!response.ok) {
        throw new Error('Response not OK');
      }
      const data = await response.json();
      const selectedBook = data.books.find((book) => book.id === parseInt(bookId));
      setBook(selectedBook);
    } catch (error) {
      console.error('Error fetching book:', error);
      setBook(null);
    }
  };

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{book.title}</h2>
      <img src={book.picture} alt="" />
      <p>Author: {book.author}</p>
      <p>Pages: {book.pages}</p>
    </div>
  );
};

export default SelectedBook;