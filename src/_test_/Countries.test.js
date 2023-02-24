import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import Countries from '../pages/Countries';
import store from '../redux/configureStore';

describe('Countries page', () => {
  test('renders correctly', () => {
    const tree = renderer.create(
      <Provider store={store}>
        <BrowserRouter>
          <Countries />
        </BrowserRouter>
      </Provider>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
