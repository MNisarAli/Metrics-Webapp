import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Action type for fetching air pollution data
const FETCH_AIR_POLLUTION_DATA = 'airPollution/fetch';

// API URL and key for fetching air pollution data
const API_URL = 'https://api.openweathermap.org/data/2.5/air_pollution?';
const API_KEY = '9e828e2624199c7cbb9d9cde2d3b483c';

// Define the initial state for the slice
const initialState = {
  pollutionData: {},
  status: 'idle',
  error: null,
};

// Define the AsyncThunk function to fetch the air pollution data from the API
export const fetchAirPollution = createAsyncThunk(
  FETCH_AIR_POLLUTION_DATA,
  async ({ lat, lng }) => {
    const response = await axios.get(`${API_URL}lat=${lat}&lon=${lng}&appid=${API_KEY}`);
    return response.data;
  },
);

// Create the slice using createSlice from Redux Toolkit
const airPollutionSlice = createSlice({
  name: 'airPollution',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle the pending state while the API request is in progress
      .addCase(fetchAirPollution.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      // Handle the fulfilled state when the API request is successful
      .addCase(fetchAirPollution.fulfilled, (state, { payload }) => ({
        ...state,
        status: 'succeeded',
        pollutionData: payload,
      }))
      // Handle the rejected state when the API request fails
      .addCase(fetchAirPollution.rejected, (state, { error }) => ({
        ...state,
        status: 'failed',
        error: error.message,
      }));
  },
});

// Export the reducer and the AsyncThunk function
export const { reducer } = airPollutionSlice;
