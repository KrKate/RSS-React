import { createSlice, configureStore } from '@reduxjs/toolkit';
import { countriesData } from './countries';

const countriesSlice = createSlice({
  name: 'countries',
  initialState: [],
  reducers: {
    setCountries: (state, action) => {
      return action.payload;
    },
  },
});

const { setCountries } = countriesSlice.actions;

const store = configureStore({
  reducer: {
    countries: countriesSlice.reducer,
  },
});

store.dispatch(setCountries(countriesData));

export { store, setCountries };
