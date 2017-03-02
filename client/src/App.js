import React, { Component } from 'react';
import ProductGrid from './ProductGrid';
import Product from './Product';

class App extends Component {
  state = {
    products: [],
    cart: []
  }

  removeProductItem = (itemIndex) => {
    const filteredProducts = this.state.products.filter(
      (item, idx) => itemIndex !== idx,
    );
    this.setState({ products: filteredProducts });
  }

  addProductToCart = (product) => {
    const newCart = this.state.cart.concat(product);
    this.setState({ cart: newCart });
  }

  viewProduct = (product) => {
    // const newProducts = this.state.products.concat(product);
    // this.setState({ products: newProducts });
  }

  render() {
    const { products, cart } = this.state;

    return (
      <div className='App'>
        <div className='ui text container'>
        <ProductGrid />
        </div>
      </div>
    );
  }
}

export default App;
