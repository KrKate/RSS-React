import React, { useEffect, useState } from 'react';
import './App.css';
import { Search } from './components/search';
import { People } from './models';
import Loader from './components/loader';
import { Card } from './components/card';
import { ErrorComponent } from './components/error';
import { Aside } from './components/aside';
import { Pagination } from './components/pagination';

const App: React.FC = () => {
  const [characters, setCharacters] = useState<People[]>([]);
  const [showError, setShowError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [asideShow, setAsideShow] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState<People | null>(
    null
  );
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const savedCharacters = localStorage.getItem('characters');
    if (savedCharacters) {
      setCharacters(JSON.parse(savedCharacters));
      setIsLoading(false);
    } else {
      setIsLoading(true);
      fetch(`https://swapi.dev/api/people/?page=${currentPage}`)
        .then((response) => response.json())
        .then((data) => {
          setCharacters(data.results);
          setIsLoading(false);
          setTotalPages(Math.ceil(data.count / 10));
        })
        .catch((error) => console.log(error));
    }
  }, [currentPage]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const updateCharacters = (characters: People[]) => {
    setCharacters(characters);
    setCurrentPage(1);
    localStorage.setItem('characters', JSON.stringify(characters));
  };

  const throwError = () => {
    setCharacters([]);
    setShowError(true);
    throw new Error('Error!!! Everything is broken');
  };

  const closeAside = () => {
    setAsideShow(false);
  };

  const openAside = (characterKey: string) => {
    const selected = characters.find((char) => char.name === characterKey);
    if (selected) {
      setSelectedCharacter(selected);
      setAsideShow(true);
    }
  };

  return (
    <div className="app-container">
      <div className="main-container">
        <div className="error-container">
          <button onClick={throwError}>Click for Error</button>
        </div>
        <Search updateCharacters={updateCharacters} />
        <div className="cards-container">
          {isLoading ? (
            <Loader />
          ) : (
            characters.map((character) => (
              <Card
                character={character}
                openAside={openAside}
                key={character.name}
              />
            ))
          )}
          {showError && <ErrorComponent />}
        </div>
        {!isLoading && (
          <div className="pagination-container">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
      {asideShow && selectedCharacter && (
        <Aside closeAside={closeAside} selectedCharacter={selectedCharacter} />
      )}
    </div>
  );
};

export default App;
