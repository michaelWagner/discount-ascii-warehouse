import React, { Component } from 'react';
import SelectedProducts from './SelectedProducts';
import ProductSearch from './ProductSearch';

class App extends Component {
  state = {
    selectedProducts: [],
  }

  removeProductItem = (itemIndex) => {
    const filteredProducts = this.state.selectedProducts.filter(
      (item, idx) => itemIndex !== idx,
    );
    this.setState({ selectedProducts: filteredProducts });
  }

  addProduct = (product) => {
    const newProducts = this.state.selectedProducts.concat(product);
    this.setState({ selectedProducts: newProducts });
  }

  render() {
    const { selectedProducts } = this.state;

    return (
      <div className='App'>
        <div className='ui text container'>
          <SelectedProducts
            products={selectedProducts}
            onProductClick={this.removeProductItem}
          />
        <ProductSearch
            onProductClick={this.addProduct}
          />
        </div>
      </div>
    );
  }
}

export default App;
