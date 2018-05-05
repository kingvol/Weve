// __tests__/Center.js
import React from 'react';
import renderer from 'react-test-renderer';
import Center from '../src/components/common/Center';

it('renders correctly', () => {
  const tree = renderer.create(<Center />);
  expect(tree).toMatchSnapshot();
});
