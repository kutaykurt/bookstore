import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SelectedBook from './pages/SelectedBook/SelectedBook';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { fetchBooks } from './components/fetching/fetchBooks';

async function renderApp() {
  const books = await fetchBooks();

  const router = createBrowserRouter([
    {
      path: '*',
      element: <App />,
    },
    {
      path: '/selectedbook/:bookId',
      element: <SelectedBook books={books} />,
    }
  ]);

  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

renderApp();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
