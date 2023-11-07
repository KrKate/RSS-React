import React from 'react';
import './App.css';
import { Search } from './components/search';
import { People, State } from './models';
import CardsContainer from './components/cardsContainer';
import { getPeople } from './api/getPeople';
import Aside from './components/aside';

class App extends React.Component<object, State> {
  state: State = {
    characters: [],
    showError: false,
    isLoading: true,
  };

  componentDidMount() {
    const savedCharacters = localStorage.getItem('characters');
    if (savedCharacters) {
      this.setState({
        characters: JSON.parse(savedCharacters),
        isLoading: false,
      });
    } else {
      this.setState({ isLoading: true });
      getPeople((characters: People[]) => {
        this.setState({ characters, isLoading: false });
      });
    }
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

  render() {
    return (
      <div className="app-container">
        <div className="main-container">
          <div className="error-container">
            <button onClick={this.throwError}>Click for Error</button>
          </div>
          <Search updateCharacters={this.updateCharacters} />
          <CardsContainer
            characters={this.state.characters}
            isLoading={this.state.isLoading}
            showError={this.state.showError}
          />
        </div>
        <Aside />
      </div>
    );
  }
}

export default App;
