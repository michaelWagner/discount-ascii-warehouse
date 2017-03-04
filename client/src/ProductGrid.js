
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

  formatPrice(price) {
    if (price) {
      // Convert price to Dollar and cents notation in the format of '$1.50'.
      return '$' + (parseInt(price, 10) / 100).toFixed(2);
    } else {
      return 'Price Unavailable';
    }
  }

  getRelativeTime(date) {
    let currentTimeInMsec = (Date.parse(new Date())) / 1000;
    let timeAddedInMsec = Date.parse(date) / 1000;
    console.log(date)
    console.log(currentTimeInMsec)
    console.log(timeAddedInMsec)
    return this.formatDateInRelativeTime(currentTimeInMsec - timeAddedInMsec);

  }
  formatDateInRelativeTime(date) {
    let result = '';
    const timeAddedInMsec = Date.parse(date) / 1000;
    const currentTimeInMsec = (Date.parse(new Date())) / 1000;
    const timeRemainingInMsec = currentTimeInMsec - timeAddedInMsec;
    const unit = {
      'year':   Math.floor( timeRemainingInMsec / 31556926 % 12 ),
      'week':   Math.floor( timeRemainingInMsec / 604800 % 52 ),
      'day':    Math.floor( timeRemainingInMsec / 86400 % 7 ),
      'hour':   Math.floor( timeRemainingInMsec / 3600 % 24 ),
      'minute': Math.floor( timeRemainingInMsec / 60 % 60 ),
      'second': Math.floor( timeRemainingInMsec % 60 )
    };

    if (unit['week'] <= 1) {
      for ( var key in unit ) {
        // Pluralize units for readability.
        if ( unit[ key ] > 1 ) {
          result += unit[ key ] + ' ' + key + 's ';
        }
        if ( unit[ key ] === 1 ) {
          result += unit[ key ] + ' ' + key + ' ';
        }
      }
      result += 'ago.'
    } else {
      result = date;
    }

    return result;
  }

  styleFace(size) {
    return {'fontSize': size + 'px'};
  }

  addProductToCart(product) {
    const newProduct = product;
    console.log('here: ' + product);
  }

  render() {
    const { products } = this.state;

    const productRows = products.map((product, idx) => (
      <tr key={product.id} onClick={this.addProductToCart}>
        <td>{this.formatPrice(product.price)}</td>
        <td>{product.size}</td>
        <td style={this.styleFace(product.size)}>{product.face}</td>
        <td>{this.formatDateInRelativeTime(product.date)}</td>
      </tr>
    ));

    return (
      <div id='product-grid'>
        <table className='ui selectable structured large table'>
          <thead>
            <tr>
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
