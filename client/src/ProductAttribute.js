import React from 'react';
import Product from './Product';

class ProductAttribute extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <td>{this.props.productAttribute}</td>;
  }
}
export default ProductAttribute;
