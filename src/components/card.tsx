import { Link } from 'react-router-dom';
import { CardProps } from '../models';

export const Card: React.FC<
  CardProps & { openAside: (character: string) => void }
> = ({ character, openAside }) => {
  const handleClick = () => {
    openAside(character.name);
  };
  if (!Object.keys(character).length) {
    return null;
  }
  return (
    <Link key={character.name} to={`details/${character.name}`}>
      <div className="character__card" onClick={handleClick}>
        <h2>{character.name}</h2>
        <ul>
          <li>Birth year: {character.birth_year}</li>
          <li>Gender: {character.gender}</li>
        </ul>
      </div>
    </Link>
  );
};
