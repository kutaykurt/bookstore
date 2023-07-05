import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Selecteditem from './pages/SelectedItem/Selecteditem';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import'bootstrap-icons/font/bootstrap-icons.css';

const router = createBrowserRouter ([
  {
    path: "*",
    element: <App />
  },
  {
    path: "/Bücher",
    element: <Selecteditem />
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={(router)} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
