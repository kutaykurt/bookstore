import React, { useState, useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import "./App.scss";
import Header from "./components/header/Header";
import Homepage from "./pages/homepage/Homepage";
import SearchResults from "./components/searchresults/SearchResults";
import SelectedBook from "./pages/SelectedBook/SelectedBook";
import { fetchBooks } from "./components/fetching/fetchBooks";

function App() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);
  const navigate = useNavigate(); // useNavigate Hook hinzugefügt
  const location = useLocation();

  useEffect(() => {
    async function fetchBooksData() {
      const data = await fetchBooks();
      setBooks(data);
    }
    fetchBooksData();
  }, []);

  useEffect(() => {
    // Reset search term when location changes to the Home page
    if (location.pathname === "/") {
      setSearchTerm("");
    }
  }, [location.pathname]);

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);

    const filtered = books.filter((book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredBooks(filtered);

    // Navigiere zur Suchergebnisseite, wenn Suchergebnisse vorhanden sind
    if (filtered.length > 0) {
      navigate("/search");
    }
  };

  return (
    <div className="App">
      <div className="header-upper-background" />
      <Header onSearch={handleSearch} />
      <Routes>
        <Route
          path="/"
          element={
            searchTerm ? (
              filteredBooks.length > 0 ? (
                <SearchResults searchBooks={filteredBooks} />
              ) : (
                <div className="no-match-text">Leider kein Buch gefunden</div>
              )
            ) : (
              <Homepage books={books} />
            )
          }
        />
        <Route
          path="/selectedbook/:bookId"
          element={<SelectedBook books={books} />}
        />
        <Route
          path="/search"
          element={<SearchResults searchBooks={filteredBooks} />}
        />
      </Routes>
    </div>
  );
}

export default App;
