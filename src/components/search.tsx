// const handleClick = () => {
//   fetch('https://swapi.dev/api/people/')
//     .then((response) => response.json())
//     .then((data) => console.log(data));
// };

import React, { ChangeEvent } from 'react';

interface SearchProps {}

interface SearchState {
  searchValue: string;
}

export class Search extends React.Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    this.state = {
      searchValue: '',
    };
  }

  componentDidMount() {
    const savedValue = localStorage.getItem('searchValue');
    if (savedValue) {
      this.setState({ searchValue: savedValue });
    }
  }

  handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchValue: event.target.value });
  };

  handleSearch = () => {
    localStorage.setItem('searchValue', this.state.searchValue);
  };

  render() {
    return (
      <div className="search__component">
        <input
          placeholder="Введите имя персонажа"
          type="text"
          className="search__input"
          value={this.state.searchValue}
          onChange={this.handleInputChange}
        ></input>
        <button onClick={this.handleSearch}>Search</button>
      </div>
    );
  }
}
