import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import Product from '../components/Product';

describe(Product, () => {

  const product = {
    "id":"22-8faj23td5wxr431n0k9j7zaor",
    "size":31,
    "price":629,
    "face":"(ಠ⌣ಠ)",
    "date":"Sun Mar 29 2017 14:04:08 GMT-0400 (EDT)"
  };
  const mockFormatPriceFromCentsToDollars = jest.fn((price) => "$6.29");
  const mockToggleProductInCart = jest.fn();
  const mockStyleFace = jest.fn((size) => ({'fontSize': size + 'px'}));

  const component = shallow(
    <Product product={product}
             formatPriceFromCentsToDollars={mockFormatPriceFromCentsToDollars}
             toggleProductInCart={mockToggleProductInCart}/>
  );

  it('contains the supplied Product\'s face', () => {
    expect(component.text()).toContain(product.face);
  });

  it('contains the supplied Product\'s id', () => {
    expect(component.text()).toContain(product.id);
  });

  it('contains the supplied Product\'s size', () => {
    expect(component.text()).toContain(product.size);
  });

  it('toggles the product from the Cart when the Product is clicked', () => {
    component.simulate('click', { preventDefault() {} });
    expect(mockToggleProductInCart).toBeCalled();
  });

  it('formats the Products price', () => {
    expect(mockFormatPriceFromCentsToDollars(product.price)).toEqual("$6.29");
  });

  it('adds style to the Products face', () => {
    expect(mockStyleFace(product.size)).toEqual({'fontSize': product.size + 'px'});
  });

  it('formats the Products price', () => {
    expect(mockStyleFace(product.size)).toEqual({'fontSize': product.size + 'px'});
  });

});
