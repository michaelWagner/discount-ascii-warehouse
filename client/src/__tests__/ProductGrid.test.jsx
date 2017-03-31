import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import Product from '../components/Product';
import ProductGrid from '../components/ProductGrid';

describe(ProductGrid, () => {

  const mockHasProductGridLoaded = jest.fn(true);
  const component = shallow(
    <ProductGrid hasProductGridLoaded={mockHasProductGridLoaded}/>
  );

  it('renders without crashing', () => {
      const component = renderer.create(
        <ProductGrid hasProductGridLoaded={mockHasProductGridLoaded}/>
      );
  });

  it('has not loaded all products yet', () => {
    expect(component.state('allProductsLoaded')).toBeFalsy();
  });
});
