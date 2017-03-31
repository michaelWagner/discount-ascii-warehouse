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

  it('renders and matches our snapshot', () => {
    const component = renderer.create(
      <ProductGrid hasProductGridLoaded={mockHasProductGridLoaded}/>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('has not loaded all products yet', () => {
    expect(component.state('allProductsLoaded')).toBeFalsy();
  });
});
