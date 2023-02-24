import configureMockStore from 'redux-mock-store';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

const getContinents = createAsyncThunk('population/continent/FETCH_DATA', async () => {
  const response = await fetch('https://restcountries.com/v3.1/all');
  const data = await response.json();
  const len = data.length;
  return len;
});

const getCountries = createAsyncThunk('population/country/FETCH_DATA', async (obj) => {
  const { region } = obj;
  const response = await fetch(`${'https://restcountries.com/v3.1/region/'}${region}`);

  const data = await response.json();
  let isAPIFetched = false;
  if (data.length > 0) {
    isAPIFetched = true;
  }
  return isAPIFetched;
});

const initialState = {
  countries: 0,
  isAPIFetched: false,
};

const dataSlice = createSlice({
  name: 'population',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getContinents.fulfilled, (state, action) => ({
        ...state,
        countries: action.payload,
      }))
      .addCase(getCountries.fulfilled, (state, action) => ({
        ...state,
        countries: action.payload,
      }));
  },
});

const mockStore = configureMockStore([thunk]);

describe('test redux async actions', () => {
  it('creates FETCH_DATA_SUCCESS when fetching data has been done', () => {
    const store = mockStore({ data: dataSlice.reducer });

    const expectedActions = [
      {
        type: getContinents.pending.type,
        meta: {
          requestId: expect.any(String),
          requestStatus: 'pending',
          arg: undefined,
        },
        payload: undefined,
      },
      {
        type: getContinents.fulfilled.type,
        meta: {
          requestId: expect.any(String),
          requestStatus: 'fulfilled',
          arg: undefined,
        },
        payload: 250,
      },
    ];
    return store.dispatch(getContinents()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates FETCH_DATA_SUCCESS when fetching data has been done', () => {
    const store = mockStore({ data: dataSlice.reducer });

    const expectedActions = [
      {
        type: getCountries.pending.type,
        meta: {
          requestId: expect.any(String),
          requestStatus: 'pending',
          arg: { region: 'Asia', name: 'Asia' },
        },
        payload: undefined,
      },
      {
        type: getCountries.fulfilled.type,
        meta: {
          requestId: expect.any(String),
          requestStatus: 'fulfilled',
          arg: { region: 'Asia', name: 'Asia' },
        },
        payload: true,
      },
    ];
    return store.dispatch(getCountries({ region: 'Asia', name: 'Asia' })).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
