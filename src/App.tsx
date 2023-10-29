import React from 'react';
import './App.css';
import { Search } from './components/search';
import { Card } from './components/card';
import { People, State } from './models';

class App extends React.Component<object, State> {
  state: State = {
    characters: [],
    showError: false,
  };

  componentDidMount() {
    const savedCharacters = localStorage.getItem('characters');
    if (savedCharacters) {
      this.setState({ characters: JSON.parse(savedCharacters) });
    }
  }

  render() {
    return (
      <div>
        <div className="error-container">
          <button onClick={this.throwError}>Click for Error</button>
        </div>
        <div className="search-container">
          <Search updateCharacters={this.updateCharacters} />
        </div>
        <div className="cards-container">
          {this.state.characters.map((character) => (
            <Card key={character.name} character={character} />
          ))}
          {this.state.showError && (
            <div className="error-wrapper">
              <h1>Error!!!!</h1>
              <img className="error-img" src="./src/assets/SW.jpg" />
            </div>
          )}
        </div>
      </div>
    );
  }

  updateCharacters = (characters: People[]) => {
    this.setState({ characters });
    localStorage.setItem('characters', JSON.stringify(characters));
  };

  throwError = () => {
    this.setState({
      characters: [],
      showError: true,
    });
    throw new Error('Error!!! Everything is broken');
  };
}

export default App;
