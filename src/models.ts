export interface People {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
}

export interface SearchState {
  searchValue: string;
  characters: People[];
  isLoading: boolean;
}

export interface CardProps {
  character: People;
}

export interface State {
  characters: People[];
  showError: boolean;
  isLoading: boolean;
}

export interface SearchProps {
  updateCharacters: (characters: People[]) => void;
}

export interface ErrorBoundaryProps {
  children: React.ReactNode;
}

export interface ErrorBoundaryState {
  hasError: boolean;
}
