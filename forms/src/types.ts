export type FormData = {
  name: string;
  age: number;
  email: string;
  password1: string;
  password2: string;
  gender: string;
  terms?: boolean;
  image?: FileList;
  country?: string;
};

export type country = {
  name: string;
  code: string;
};
