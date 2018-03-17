// __tests__/Center.js
import React from 'react';
import renderer from 'react-test-renderer';
import Center from '../src/Components/Common/Center';

// import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(<Center />);
  expect(tree).toMatchSnapshot();
});
