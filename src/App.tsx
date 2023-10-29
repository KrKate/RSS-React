import React from 'react';
import './App.css';
import { Search } from './components/search';
import { Card } from './components/card';
import { People } from './models';

interface State {
  characters: People[];
}
class App extends React.Component<object, State> {
  state: State = {
    characters: [],
  };

  render() {
    return (
      <div>
        <div className="search-container">
          <Search updateCharacters={this.updateCharacters} />
        </div>
        <div className="cards-container">
          {this.state.characters.map((character) => (
            <Card key={character.name} character={character} />
          ))}
        </div>
      </div>
    );
  }

  updateCharacters = (characters: People[]) => {
    this.setState({ characters });
  };
}

export default App;
