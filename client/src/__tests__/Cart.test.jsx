import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import Product from '../components/Product';
import Cart from '../components/Cart';

describe(Cart, () => {

  const products = [<Product />,<Product />];

  const totalPrice = products.reduce((total, product) => {
    return total + product.price;
  }, 0);
  const cartVisible = true;
  const mockFormatPriceFromCentsToDollars = jest.fn((price) => "$6.29");
  const mockToggleProductInCart = jest.fn();
  const component = shallow(
    <Cart products={products}
          totalPrice={totalPrice}
          toggleProductInCart={mockToggleProductInCart}
          formatPriceFromCentsToDollars={mockFormatPriceFromCentsToDollars}
          cartVisible={cartVisible}/>
  );

  it('renders and matches our snapshot', () => {
    const component = renderer.create(
      <Cart products={products}
            totalPrice={totalPrice}
            toggleProductInCart={mockToggleProductInCart}
            formatPriceFromCentsToDollars={mockFormatPriceFromCentsToDollars}
            cartVisible={cartVisible}/>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('contains the supplied Products', () => {
    expect(component.text()).toContain('<Product />');
  });

  it('displays the supplied total price', () => {
    expect(component.text()).toContain('Total price: $6.29');
  });

  it('formats the Carts price', () => {
    expect(mockFormatPriceFromCentsToDollars).toBeCalled();
  });
});
