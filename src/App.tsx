import React, { useEffect, useState } from 'react';
import './App.css';
import { Search } from './components/search';
import { People } from './models';
import Loader from './components/loader';
import { Card } from './components/card';
import Pagination from './components/pagination';
import { Select } from './components/select';
import { ErrorComponent } from './components/error';
import { Aside } from './components/aside';

const App: React.FC = () => {
  const [characters, setCharacters] = useState<People[]>([]);
  const [showError, setShowError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage, setCardsPerPage] = useState(10);
  const [asideShow, setAsideShow] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState<People | null>(
    null
  );

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
    setCurrentPage(1);
    localStorage.setItem('characters', JSON.stringify(characters));
  };

  const handleCardsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedCardsPerPage = parseInt(event.target.value);
    setCurrentPage(1);
    setCardsPerPage(selectedCardsPerPage);
  };

  const throwError = () => {
    setCharacters([]);
    setShowError(true);
    throw new Error('Error!!! Everything is broken');
  };

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = characters.slice(indexOfFirstCard, indexOfLastCard);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

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
            currentCards.map((character) => (
              <Card
                character={character}
                openAside={openAside}
                key={character.name}
              />
            ))
          )}
          {showError && <ErrorComponent />}
        </div>
        <div className="pagination-container">
          <Pagination
            cardsPerPage={cardsPerPage}
            totalCards={characters.length}
            paginate={paginate}
          />
          <Select value={cardsPerPage} onChange={handleCardsPerPageChange} />
        </div>
      </div>
      {asideShow && selectedCharacter && (
        <Aside closeAside={closeAside} selectedCharacter={selectedCharacter} />
      )}
    </div>
  );
};

export default App;
