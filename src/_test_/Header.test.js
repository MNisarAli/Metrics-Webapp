import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import store from '../Redux/configureStore';
import '@testing-library/jest-dom';
import Header from '../components/Header';
import { updateTitle } from '../Redux/Title/titleReducer';

describe('updateTitle', () => {
  it('should return the expected action object', () => {
    const newTitle = 'World Population';
    const expectedAction = {
      type: 'UPDATE_TITLE',
      title: newTitle,
    };

    expect(updateTitle(newTitle)).toEqual(expectedAction);
  });
});

describe('Header component', () => {
  test('renders correctly', () => {
    const tree = renderer.create(
      <Provider store={store}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </Provider>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
