import { SWAPI } from '../constants';
import { People } from '../models';

export const getPeople = (setCharacters: (characters: People[]) => void) => {
  fetch(SWAPI.url)
    .then((response) => response.json())
    .then((data) => {
      setCharacters(data.results);
      localStorage.setItem('characters', JSON.stringify(data.results));
    })
    .catch((error) => console.log(error));
};
