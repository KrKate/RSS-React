import { CardProps } from '../models';

export const Card: React.FC<CardProps> = ({ character }) => {
  return (
    <div className="character__card">
      <h2>{character.name}</h2>
      <ul>
        <li>Height: {character.height}</li>
        <li>Mass: {character.mass}</li>
        <li>Hair color: {character.hair_color}</li>
        <li>Skin color: {character.skin_color}</li>
        <li>Eye color: {character.eye_color}</li>
        <li>Birth year: {character.birth_year}</li>
        <li>Gender: {character.gender}</li>
      </ul>
    </div>
  );
};
