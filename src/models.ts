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
}

export interface CardProps {
  character: People;
}
