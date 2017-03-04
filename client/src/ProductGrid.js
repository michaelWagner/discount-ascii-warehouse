
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
      for (var i = 0; i < products.length; i++) {
        if (products[i] === null || products[i] === undefined || products[i] === '') {
          // Remove trailing newlines or empty nodes.
          delete products[i];
        } else {
          products[i] = JSON.parse(products[i]);
        }
      }
      this.setState({products: products});
    });
  }

  addProductToCart = (product) => {
    const newProduct = product;
    console.log('here: ' + product);

  }

  render() {
    const { products } = this.state;

    const productRows = products.map((product, idx) => (
      <tr key={idx} onClick={this.addProductToCart}>
        <td>{product.id.toString()}</td>
        <td>{product.size.toString()}</td>
        <td>{product.price.toString()}</td>
        <td>{product.face.toString()}</td>
        <td>{product.date.toString()}</td>
      </tr>
    ));

    return (
      <div id='product-grid'>
        <table className='ui selectable structured large table'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Size</th>
              <th>Price</th>
              <th>Face</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>{productRows}</tbody>
        </table>
      </div>
    );
  }
}

export default ProductGrid;
