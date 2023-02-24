import { combineReducers, configureStore } from '@reduxjs/toolkit';
import continentsSlice from './Continent/continentsSlice';
import countriesSlice from './Country/countriesSlice';
import titleReducer from './Title/titleReducer';

const reducer = combineReducers({
  continents: continentsSlice,
  countries: countriesSlice,
  title: titleReducer,
});

const store = configureStore({
  reducer,
});

export default store;
