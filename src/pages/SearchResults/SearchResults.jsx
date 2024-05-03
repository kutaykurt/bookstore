import React from "react";
import { Link } from "react-router-dom";

const SearchResults = ({ searchBooks }) => {
  return (
    <div className="search-results">
      {searchBooks.length > 0 ? (
        <>
          <h2>Suchergebnisse</h2>
          {searchBooks.map((book) => (
            <Link to={`/selectedbook/${book.id}`} key={book.id}>
              <div className="book-item">
                <img src={book.picture} alt={book.title} />
                <div className="book-details">
                  <h3>{book.title}</h3>
                  <p>{book.author}</p>
                </div>
              </div>
            </Link>
          ))}
        </>
      ) : (
        <div className="no-match-text">Leider kein Buch gefunden</div>
      )}
    </div>
  );
};

export default SearchResults;
