import React from 'react';

class Product extends React.Component {

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
      result += 'ago.';
    } else {
      result = date;
    }

    return result;
  }

  handleClick(event) {
    event.preventDefault();
    this.props.toggleProductInCart(this.props.product);
  }

  styleFace(size) {
    return {'fontSize': size + 'px'};
  }

  render() {
    return (
      <tr key={this.props.product.id} onClick={this.handleClick.bind(this)}>
        <td style={this.styleFace(this.props.product.size)}>{this.props.product.face}</td>
        <td>{this.formatDateInRelativeTime(this.props.product.date)}</td>
        <td>{this.props.product.id}</td>
        <td>{this.props.formatPriceFromCentsToDollars(this.props.product.price)}</td>
        <td>{this.props.product.size}</td>
        <td className="add-to-cart-btn">{this.props.parentComponent === "Cart" ? "x" : "+" }</td>
      </tr>
    );
  }
}
export default Product;
