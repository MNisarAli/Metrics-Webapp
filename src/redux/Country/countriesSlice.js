import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const FETCH_COUNTRY_DATA = 'FETCH_COUNTRY_DATA';
const COUNTRY_API_URL = 'https://restcountries.com/v3.1/region/';
const COUNTRY_MAP_URL = 'https://raw.githubusercontent.com/djaiss/mapsicon/master/all/';

const initialState = {
  countries: [],
  status: 'idle',
  error: null,
};

// Transform the raw data fetched from the API into the desired format.
const countryInformation = (data) => data.filter((country) => country.independent).map(
  (country) => ({
    path: `/${country.name.common}`,
    name: country.name.common,
    official: country.name.official,
    id: country.cca3,
    capital: country.capital,
    region: country.region,
    subregion: country.subregion,
    continent: country.continents[0],
    population: country.population,
    lat: country.latlng[0],
    lng: country.latlng[1],
    area: country.area,
    flagSymbol: country.flag,
    flag: country.flags.png,
    map: `${COUNTRY_MAP_URL}${country.cca2.toLowerCase()}/vector.svg`,
    currencies: Object.entries(country.currencies).map(([code, { name, symbol }]) => ({
      code, name, symbol,
    })),
    languages: Object.entries(country.languages).map(([code, name]) => ({
      code, name,
    })),
  }),
).sort((a, b) => a.name.localeCompare(b.name));

// Async thunk to fetch countries by region and filter by name.
export const getCountries = createAsyncThunk(
  FETCH_COUNTRY_DATA,
  async ({ region, name }) => {
    const response = await axios.get(`${COUNTRY_API_URL}${region}`);
    const filteredCountries = response.data.filter(
      (country) => country.continents[0] === name,
    );

    return countryInformation(filteredCountries);
  },
);

const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {},
  // Add extra reducers for the getCountries thunk.
  extraReducers: (builder) => {
    builder
      .addCase(getCountries.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(getCountries.fulfilled, (state, action) => ({
        ...state,
        status: 'succeeded',
        countries: action.payload,
      }));
  },
});

export default countriesSlice.reducer;
