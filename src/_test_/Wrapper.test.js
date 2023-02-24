import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import store from '../Redux/configureStore';
import '@testing-library/jest-dom';
import Wrapper from '../components/Wrapper';

describe('Wrapper component', () => {
  test('renders correctly', () => {
    const tree = renderer.create(
      <Provider store={store}>
        <BrowserRouter>
          <Wrapper />
        </BrowserRouter>
      </Provider>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders the Wrapper component with non-default props', () => {
    const { getByAltText, getByText } = render(
      <Wrapper wrapper={{ name: 'Test Wrapper', population: '1,000,000', map: 'test-map.png' }} />,
    );
    const wrapperMap = getByAltText('Test Wrapper');
    const wrapperName = getByText('Test Wrapper');
    expect(wrapperMap).toBeInTheDocument();
    expect(wrapperName).toBeInTheDocument();
  });
});
