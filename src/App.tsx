import './App.css';
import { Search } from './components/search';
//https://swapi.dev/api/people/

function App() {
  return (
    <>
      <div className="search-container">
        <Search />
      </div>
      <div className="cards-container"></div>
    </>
  );
}

export default App;
