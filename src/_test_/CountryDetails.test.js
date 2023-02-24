import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import CountryDetails from '../pages/CountryDetails';
import store from '../Redux/configureStore';

describe('CountryDetails component', () => {
  test('renders correctly', () => {
    const tree = renderer.create(
      <Provider store={store}>
        <BrowserRouter>
          <CountryDetails />
        </BrowserRouter>
      </Provider>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
