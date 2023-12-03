import { createSlice, configureStore } from '@reduxjs/toolkit';
import { countriesData } from './countries';
interface FormState {
  formData: FormData | null;
}

const countriesSlice = createSlice({
  name: 'countries',
  initialState: [],
  reducers: {
    setCountries: (state, action) => {
      return action.payload;
    },
  },
});

const formSlice = createSlice({
  name: 'form',
  initialState: {
    formData: null,
  } as FormState,
  reducers: {
    setFormData: (state, action) => {
      state.formData = action.payload;
    },
  },
});

const { setCountries } = countriesSlice.actions;
const { setFormData } = formSlice.actions;

const rootReducer = {
  countries: countriesSlice.reducer,
  form: formSlice.reducer,
};

const store = configureStore({
  reducer: rootReducer,
});

store.dispatch(setCountries(countriesData));

export { store, setCountries, setFormData };
