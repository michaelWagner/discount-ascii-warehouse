import React from 'react';
import Client from './Client';
import Product from './Product';
import Advertisement from './Advertisement';

class ProductGrid extends React.Component {
  constructor() {
    super();
    this.state = { products: [], cart: [] };
  }

  componentDidMount() {
    this.loadProducts('limit=50');
  }

  addProductToCart(product, cart) {
    console.log(this.state.cart)
    const newCart = this.state.cart.concat(product);
    this.setState({cart: newCart})
  }

  removeProductFromCart(itemId) {
    const newCart = this.state.cart.filter(
      (item, idx) => item.id !== this.state.cart[idx].id,
    );
    this.setState({ cart: newCart });
  }

  viewProduct(product) {
  }

  loadProducts(query) {
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

  render() {
    const { products, cart } = this.state;

    const productRows = products.map((product, idx) => (
      ((idx % 20 === 0 && idx !== 0)
        ? <Advertisement key={idx}/>
      : <Product key={idx} product={product} cart={cart} addProductToCart={this.addProductToCart.bind(this)} />
      )
    ));

    return (
      <div id='product-grid'>
        <table className='ui selectable structured large table'>
          <thead>
            <tr className="product-attribute-header">
              <th>ID</th>
              <th>Price</th>
              <th>Size</th>
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
