import { combineReducers, configureStore } from '@reduxjs/toolkit';
import continentsSlice from './Continent/continentsSlice';
import countriesSlice from './Country/countriesSlice';
import titleReducer from './Title/titleReducer';
import { reducer as airPollutionReducer } from './Pollution/pollution';

const reducer = combineReducers({
  continents: continentsSlice,
  countries: countriesSlice,
  title: titleReducer,
  airPollution: airPollutionReducer,
});

const store = configureStore({
  reducer,
});

export default store;
