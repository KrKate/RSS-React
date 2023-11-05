import { useNavigate, useLocation } from 'react-router-dom';
import { CardProps } from '../models';

export const Card: React.FC<
  CardProps & { openAside: () => void; closeAside: () => void }
> = ({ character, openAside }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    navigate(`${location.search}/card/${character.name}`);
    openAside();
  };

  return (
    <div className="character__card" onClick={handleClick}>
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
