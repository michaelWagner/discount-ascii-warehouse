import React from 'react';
import ProductGrid from './ProductGrid';

class Product extends React.Component {
  constructor(props) {
    super(props);
  }

  formatDateInRelativeTime(date) {
    let result = '';
    const timeAddedInMsec = Date.parse(date) / 1000;
    const currentTimeInMsec = (Date.parse(new Date())) / 1000;
    const timeRemainingInMsec = currentTimeInMsec - timeAddedInMsec;
    const unit = {
      'week':   Math.floor( timeRemainingInMsec / 604800 % 52 ),
      'day':    Math.floor( timeRemainingInMsec / 86400 % 7 ),
      'hour':   Math.floor( timeRemainingInMsec / 3600 % 24 ),
      'minute': Math.floor( timeRemainingInMsec / 60 % 60 ),
      'second': Math.floor( timeRemainingInMsec % 60 )
    };

    if (unit['week'] < 1) {
      for ( var key in unit ) {
        // Pluralize units for readability.
        if ( unit[key] > 1 ) {
          result += unit[key] + ' ' + key + 's ';
        }
        if ( unit[key] === 1 ) {
          result += unit[key] + ' ' + key + ' ';
        }
      }
      result += 'ago.'
    } else {
      result = date;
    }

    return result;
  }

  handleClick(event) {
    event.preventDefault();
    this.props.addProductToCart(this.props.product);
  }

  formatPrice(price) {
    if (price) {
      // Convert price to Dollar and cents notation in the format of '$1.50'.
      return '$' + (parseInt(price, 10) / 100).toFixed(2);
    } else {
      return 'Price Unavailable';
    }
  }

  styleFace(size) {
    return {'fontSize': size + 'px'};
  }

  render() {
    return (
      <tr key={this.props.product.id} onClick={this.handleClick.bind(this)}>
        <td>{this.props.product.id}</td>
        <td>{this.formatPrice(this.props.product.price)}</td>
        <td>{this.props.product.size}</td>
        <td style={this.styleFace(this.props.product.size)}>{this.props.product.face}</td>
        <td>{this.formatDateInRelativeTime(this.props.product.date)}</td>
      </tr>
    );
  }
}
export default Product;
