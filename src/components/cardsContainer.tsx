import React from 'react';
import { Card } from './card';
import { People } from '../models';
import SWimage from '../assets/SW.jpg';
import Loader from './loader';

interface CardsContainerProps {
  characters: People[];
  isLoading: boolean;
  showError: boolean;
}

const CardsContainer: React.FC<CardsContainerProps> = ({
  characters,
  isLoading,
  showError,
}) => {
  return (
    <div className="cards-container">
      {isLoading ? (
        <Loader />
      ) : (
        characters.map((character) => (
          <Card key={character.name} character={character} />
        ))
      )}
      {showError && (
        <div className="error-wrapper">
          <h1>Error!!!!</h1>
          <img className="error-img" src={SWimage} alt="error" />
        </div>
      )}
    </div>
  );
};

export default CardsContainer;
