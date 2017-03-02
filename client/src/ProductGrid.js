
import React from 'react';
import Client from './Client';
import Product from './Product';

class ProductGrid extends React.Component {
  constructor() {
    super();
    this.state = { products: [] };
  }

  componentDidMount(query) {
    Client.loadProducts(query, (products) => {
      this.setState({products: products});
    });
  }

  render() {
    const { products } = this.state;

    const productRows = products.map((product, idx) => (
      <Product products={this.state.products} />
    ));

    return (
      <div id='product-grid'>
        <table className='ui selectable structured large table'>
          <thead>

          </thead>
          <tbody>{productRows}</tbody>
        </table>
      </div>
    );
  }
}

export default ProductGrid;
