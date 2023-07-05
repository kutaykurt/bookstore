import './App.css';
import Header from './components/header/Header';
import Homepage from './pages/homepage/Homepage';

function App() {
  return (
    <div className="App">
      <div className='header-upper-background' />
      <Header />
      <div className='main'>
        <Homepage />
      </div>
    </div>
  );
}

export default App;
