import React, { ChangeEvent } from 'react';
import { People, SearchState } from '../models';
interface SearchProps {
  updateCharacters: (characters: People[]) => void;
  onSearch: (query: string) => void;
}
export class Search extends React.Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    this.state = {
      searchValue: '',
      characters: [],
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

    fetch(`https://swapi.dev/api/people/?search=${searchValue}`)
      .then((response: Response) => response.json())
      .then((data: { results: People[] }) => {
        this.setState({ characters: data.results });
        this.props.updateCharacters(data.results);
      })
      .catch((error) => console.error(error));
  };

  render() {
    return (
      <>
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
      </>
    );
  }
}
