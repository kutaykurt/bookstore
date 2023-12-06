import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/header/Header';
import Homepage from './pages/homepage/Homepage';
import { useEffect, useState } from 'react';
import SearchResults from './components/searchresults/SearchResults';
import { fetchBooks } from './components/fetching/fetchBooks';
import SelectedBook from './pages/SelectedBook/SelectedBook';

function App() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    async function fetchBooksData() {
      const data = await fetchBooks();
      setBooks(data);
    }
    fetchBooksData();
  }, []);

  const addToCart = (book) => {
    setBooks([...books, book])
  }

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);

    const filtered = books.filter((book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredBooks(filtered);
  };
  
  return (
    <div className="App">
      <div className='header-upper-background' />
      <Header onSearch={handleSearch}/>
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
              <Homepage />
            )
          }
        />
        <Route
  path="/selectedbook/:bookId"
  element={<SelectedBook books={books} />}
/>

      </Routes>
      
    </div>
  );
}

export default App;