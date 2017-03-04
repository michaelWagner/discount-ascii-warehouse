
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
          delete products[i];
        }
      }
      console.log(products)
      this.setState({products: products});
    });
  }

  addProductToCart = (product) => {
    const newProduct = product;
  }

  render() {
    const { products } = this.state;

    const productRows = products.map((product, idx) => (
      <tr key={idx} onClick={this.addProductToCart}>
        <td>{JSON.parse(product).id.toString()}</td>
        <td>{JSON.parse(product).size.toString()}</td>
        <td>{JSON.parse(product).price.toString()}</td>
        <td>{JSON.parse(product).face.toString()}</td>
        <td>{JSON.parse(product).date.toString()}</td>
      </tr>
    ));
    console.log(productRows)

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
