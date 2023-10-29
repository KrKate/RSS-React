import './App.css';
import React, { Component } from 'react';
import { Card } from './components/card';
import { Search } from './components/search';
import { People } from './models';

interface AppState {
  characters: People[];
}

class App extends Component<object, AppState> {
  constructor(props: object) {
    super(props);
    this.state = {
      characters: [],
    };
  }

  updateCharacters = (characters: People[]) => {
    this.setState({ characters });
  };

  render() {
    return (
      <>
        <div className="search-container">
          <Search updateCharacters={this.updateCharacters} />
        </div>
        <div className="cards-container">
          {this.state.characters.map((character) => (
            <Card character={character} key={character.name} />
          ))}
        </div>
      </>
    );
  }
}

export default App;
