import { People } from '../models';

export const CharacterInfo: React.FC<{
  character: People;
  asideShow: boolean;
  selectedCharacter: People;
  key: string;
}> = (props) => {
  const { selectedCharacter } = props;
  return (
    <>
      <h2>{selectedCharacter.name}</h2>
      <ul>
        <li>Height: {selectedCharacter.height}</li>
        <li>Mass: {selectedCharacter.mass}</li>
        <li>Hair color: {selectedCharacter.hair_color}</li>
        <li>Skin color: {selectedCharacter.skin_color}</li>
        <li>Eye color: {selectedCharacter.eye_color}</li>
        <li>Birth year: {selectedCharacter.birth_year}</li>
        <li>Gender: {selectedCharacter.gender}</li>
      </ul>
    </>
  );
};
