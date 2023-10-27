// const handleClick = () => {
//   fetch('https://swapi.dev/api/people/')
//     .then((response) => response.json())
//     .then((data) => console.log(data));
// };

import { useState } from 'react';

export function Search() {
  const [searchInput, setSearchInput] = useState('');

  const handleSearch = () => {
    const searchHistory = localStorage.getItem('searchHistory');
    if (searchHistory) {
      const historyArray = JSON.parse(searchHistory);
      historyArray.push(searchInput);
      localStorage.setItem('searchHistory', JSON.stringify(historyArray));
    } else {
      localStorage.setItem('searchHistory', JSON.stringify([searchInput]));
    }
    const savedData = localStorage.getItem('searchHistory');
    console.log(savedData);
    setSearchInput('');
  };

  return (
    <div className="search__component">
      <input
        placeholder="Найдите то, что ищете"
        type="text"
        className="search__input"
        value={searchInput}
        onChange={(event) => setSearchInput(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            handleSearch();
          }
        }}
      ></input>
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}
