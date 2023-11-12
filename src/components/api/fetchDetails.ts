import { People } from '../../models';

const fetchCharacterDetails = async (
  selectedCharacter: People,
  setCharacterDetails: (data: People) => void
) => {
  try {
    const response = await fetch(
      `https://swapi.dev/api/people/${selectedCharacter.name}`
    );
    if (response.ok) {
      const data: People = await response.json();
      setCharacterDetails(data);
    } else {
      console.error('Error fetching character details');
    }
  } catch (error) {
    console.error('Error fetching character details', error);
  }
};

export default fetchCharacterDetails;
