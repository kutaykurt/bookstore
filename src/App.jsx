import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/header/Header';
import Homepage from './pages/homepage/Homepage';
import { useEffect, useState } from 'react';

import { fetchBooks } from './components/fetching/fetchBooks';
import SelectedBook from './pages/SelectedBook/SelectedBook';

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    async function fetchBooksData() {
      const data = await fetchBooks();
      setBooks(data);
    }
    fetchBooksData();
  }, []);

  console.log(books);

  return (
    <div className="App">
      <div className='header-upper-background' />
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/selectedbook/:bookId" element={<SelectedBook books={books} />} />
      </Routes>
      
    </div>
  );
}

export default App;
