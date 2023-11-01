import React, { ChangeEvent } from 'react';
import { People, SearchProps, SearchState } from '../models';
import Loader from './loader';

export class Search extends React.Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    this.state = {
      searchValue: '',
      characters: [],
      isLoading: false,
    };
  }

  componentDidMount() {
    const savedValue = localStorage.getItem('searchValue');
    if (savedValue) {
      this.setState({ searchValue: savedValue });
    }
  }

  componentDidUpdate() {
    localStorage.setItem('searchValue', this.state.searchValue);
  }

  handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchValue: event.target.value });
  };

  handleSearch = () => {
    const { searchValue } = this.state;
    localStorage.setItem('searchValue', searchValue);
    this.setState({ isLoading: true });

    fetch(`https://swapi.dev/api/people/?search=${searchValue}`)
      .then((response: Response) => response.json())
      .then((data: { results: People[] }) => {
        this.setState({ characters: data.results });
        this.props.updateCharacters(data.results);
      })
      .catch((error) => console.error(error))
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      this.handleSearch();
    }
  };

  render() {
    return (
      <>
        <div className="search__component">
          <input
            placeholder="Enter character name"
            type="text"
            className="search__input"
            value={this.state.searchValue}
            onChange={this.handleInputChange}
            onKeyDown={this.handleKeyPress}
          ></input>
          <button onClick={this.handleSearch}>Search</button>
          {this.state.isLoading && <Loader />}
        </div>
      </>
    );
  }
}
