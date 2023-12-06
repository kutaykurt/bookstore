import React from 'react';
import { Link } from 'react-router-dom';

const SearchResults = ({ searchBooks }) => {
  return (
    <div className='search-results'>
      {searchBooks.map((book) => (
        <Link className='link' to={`/selectedbook/${book.id}`} key={book.id}>
          <div className='book-container'>
            <img src={book.picture} alt={book.title} />
            <div className='book-details'>
              <h3>{book.title}</h3>
              <p>{book.author}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default SearchResults;