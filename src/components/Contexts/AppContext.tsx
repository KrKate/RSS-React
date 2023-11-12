import { createContext, useContext } from 'react';
import { People } from '../../models';

interface ContextProps {
  characters: People[];
  updateCharacters: (characters: People[]) => void;
}

export const AppContext = createContext<ContextProps>({
  characters: [],
  updateCharacters: () => {},
});

export const useAppContext = () => {
  return useContext(AppContext);
};
