import React from 'react';
import { People } from '../models';

interface CharacterDetailsProps {
  character: People;
}

export const CharacterInfo: React.FC<CharacterDetailsProps> = ({
  character,
}) => {
  if (!character) {
    return <div className="dark-loader">Loading...</div>;
  }
  return (
    <div>
      <h2>{character.name}</h2>
      <p>Height: {character.height}</p>
      <p>Mass: {character.mass}</p>
      <p>Hair Color: {character.hair_color}</p>
      <p>Skin Color: {character.skin_color}</p>
      <p>Eye Color: {character.eye_color}</p>
      <p>Birth Year: {character.birth_year}</p>
      <p>Gender: {character.gender}</p>
    </div>
  );
};
