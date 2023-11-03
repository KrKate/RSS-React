import React, { useEffect, useState } from 'react';
import './App.css';
import { Search } from './components/search';
import { People } from './models';
import SWimage from './assets/SW.jpg';
import Loader from './components/loader';
import { Card } from './components/card';

const App: React.FC = () => {
  const [characters, setCharacters] = useState<People[]>([]);
  const [showError, setShowError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedCharacters = localStorage.getItem('characters');
    if (savedCharacters) {
      setCharacters(JSON.parse(savedCharacters));
      setIsLoading(false);
    } else {
      setIsLoading(true);
      Promise.all([
        fetch('https://swapi.dev/api/people/?page=1').then((response) =>
          response.json()
        ),
        fetch('https://swapi.dev/api/people/?page=2').then((response) =>
          response.json()
        ),
        fetch('https://swapi.dev/api/people/?page=3').then((response) =>
          response.json()
        ),
      ])
        .then(([data1, data2, data3]) => {
          const allCharacters = [
            ...data1.results,
            ...data2.results,
            ...data3.results,
          ];
          setCharacters(allCharacters);
          setIsLoading(false);
          localStorage.setItem('characters', JSON.stringify(allCharacters));
        })
        .catch((error) => console.log(error));
    }
  }, []);

  const updateCharacters = (characters: People[]) => {
    setCharacters(characters);
    localStorage.setItem('characters', JSON.stringify(characters));
  };

  const throwError = () => {
    setCharacters([]);
    setShowError(true);
    throw new Error('Error!!! Everything is broken');
  };

  return (
    <div>
      <div className="error-container">
        <button onClick={throwError}>Click for Error</button>
      </div>
      <div className="search-container">
        <Search updateCharacters={updateCharacters} />
      </div>
      <div className="cards-container">
        {isLoading ? (
          <Loader />
        ) : (
          characters.map((character) => (
            <Card key={character.name} character={character} />
          ))
        )}
        {showError && (
          <div className="error-wrapper">
            <h1>Error!!!!</h1>
            <img className="error-img" src={SWimage} />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
