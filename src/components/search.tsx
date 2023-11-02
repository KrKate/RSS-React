import React, { useState, useEffect, ChangeEvent, KeyboardEvent } from 'react';
import { People, SearchProps } from '../models';
import Loader from './loader';

export const Search: React.FC<SearchProps> = ({ updateCharacters }) => {
  const [searchValue, setSearchValue] = useState('');
  const [, setCharacters] = useState<People[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const savedValue = localStorage.getItem('searchValue');
    if (savedValue) {
      setSearchValue(savedValue);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('searchValue', searchValue);
  }, [searchValue]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleSearch = () => {
    localStorage.setItem('searchValue', searchValue);
    setIsLoading(true);

    fetch(`https://swapi.dev/api/people/?search=${searchValue}`)
      .then((response: Response) => response.json())
      .then((data: { results: People[] }) => {
        setCharacters(data.results);
        updateCharacters(data.results);
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <>
      <div className="search__component">
        <input
          placeholder="Enter character name"
          type="text"
          className="search__input"
          value={searchValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
        ></input>
        <button onClick={handleSearch}>Search</button>
        {isLoading && <Loader />}
      </div>
    </>
  );
};
